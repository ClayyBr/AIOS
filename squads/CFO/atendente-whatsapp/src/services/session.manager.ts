import { Session, SessionState, MessageHistoryEntry } from '../types/session.types';
import { env } from '../config/env';
import { CONSTANTS } from '../config/constants';
import { logger } from '../utils/logger';

/**
 * SessionManager — Manages in-memory conversation sessions indexed by phone number.
 * Each phone number has one session containing message history, cart, and order state.
 */
class SessionManager {
    private sessions: Map<string, Session> = new Map();
    private cleanupInterval: ReturnType<typeof setInterval> | null = null;

    constructor() {
        this.startCleanupInterval();
    }

    /**
     * Gets an existing session or creates a new one for the given phone number.
     */
    getOrCreateSession(phoneNumber: string, contactName?: string | null): Session {
        const existing = this.sessions.get(phoneNumber);

        if (existing) {
            existing.lastActivity = new Date();
            if (contactName && !existing.contactName) {
                existing.contactName = contactName;
            }
            return existing;
        }

        const session: Session = {
            phoneNumber,
            contactName: contactName || null,
            messageHistory: [],
            cart: [],
            deliveryAddress: null,
            paymentMethod: null,
            paymentDetails: null,
            state: SessionState.IDLE,
            lastActivity: new Date(),
            isHandoff: false,
            createdAt: new Date(),
        };

        this.sessions.set(phoneNumber, session);

        logger.info(
            { phone: phoneNumber.slice(-4), totalSessions: this.sessions.size },
            '🆕 New session created',
        );

        return session;
    }

    /**
     * Gets an existing session without creating a new one.
     */
    getSession(phoneNumber: string): Session | undefined {
        return this.sessions.get(phoneNumber);
    }

    /**
     * Adds a message to the session history (keeps max MAX_HISTORY_LENGTH).
     */
    addMessage(phoneNumber: string, role: 'user' | 'model', content: string): void {
        const session = this.sessions.get(phoneNumber);
        if (!session) return;

        session.messageHistory.push({ role, content });

        // Trim history to keep only the last N messages
        if (session.messageHistory.length > CONSTANTS.MAX_HISTORY_LENGTH) {
            session.messageHistory = session.messageHistory.slice(-CONSTANTS.MAX_HISTORY_LENGTH);
        }

        session.lastActivity = new Date();
    }

    /**
     * Gets the message history for Gemini context.
     */
    getMessageHistory(phoneNumber: string): MessageHistoryEntry[] {
        const session = this.sessions.get(phoneNumber);
        return session?.messageHistory || [];
    }

    /**
     * Updates specific fields on a session.
     */
    updateSession(phoneNumber: string, updates: Partial<Session>): void {
        const session = this.sessions.get(phoneNumber);
        if (!session) return;

        Object.assign(session, updates, { lastActivity: new Date() });
    }

    /**
     * Sets the handoff flag for a phone number.
     */
    setHandoff(phoneNumber: string, active: boolean): void {
        const session = this.sessions.get(phoneNumber);
        if (!session) return;

        session.isHandoff = active;
        session.state = active ? SessionState.HANDOFF : SessionState.IDLE;
        session.lastActivity = new Date();

        logger.info(
            { phone: phoneNumber.slice(-4), handoff: active },
            active ? '🤝 Handoff activated' : '🤖 Bot reactivated',
        );
    }

    /**
     * Checks if a phone number is in handoff mode.
     */
    isHandoff(phoneNumber: string): boolean {
        const session = this.sessions.get(phoneNumber);
        return session?.isHandoff || false;
    }

    /**
     * Resets a session to initial state (keeps history).
     */
    resetSession(phoneNumber: string): void {
        const session = this.sessions.get(phoneNumber);
        if (!session) return;

        session.cart = [];
        session.deliveryAddress = null;
        session.paymentMethod = null;
        session.paymentDetails = null;
        session.state = SessionState.IDLE;
        session.isHandoff = false;
        session.lastActivity = new Date();
    }

    /**
     * Removes a session entirely.
     */
    deleteSession(phoneNumber: string): void {
        this.sessions.delete(phoneNumber);
    }

    /**
     * Clears all sessions that have been inactive longer than the timeout.
     */
    clearExpiredSessions(): number {
        const timeoutMs = (env.SESSION_TIMEOUT_MINUTES || 30) * 60 * 1000;
        const now = Date.now();
        let cleared = 0;

        for (const [phone, session] of this.sessions) {
            const elapsed = now - session.lastActivity.getTime();
            if (elapsed > timeoutMs) {
                this.sessions.delete(phone);
                cleared++;
            }
        }

        if (cleared > 0) {
            logger.info(
                { cleared, remaining: this.sessions.size },
                '🧹 Expired sessions cleared',
            );
        }

        return cleared;
    }

    /**
     * Returns the total number of active sessions.
     */
    getActiveSessionCount(): number {
        return this.sessions.size;
    }

    /**
     * Starts the periodic cleanup interval.
     */
    private startCleanupInterval(): void {
        this.cleanupInterval = setInterval(() => {
            this.clearExpiredSessions();
        }, CONSTANTS.CLEANUP_INTERVAL_MS);

        // Prevent the interval from keeping the process alive
        if (this.cleanupInterval.unref) {
            this.cleanupInterval.unref();
        }
    }

    /**
     * Stops the cleanup interval (for testing).
     */
    stopCleanup(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
        }
    }
}

// Singleton instance
export const sessionManager = new SessionManager();
export { SessionManager };
