import { Session, MessageHistoryEntry } from '../types/session.types';
/**
 * SessionManager — Manages in-memory conversation sessions indexed by phone number.
 * Each phone number has one session containing message history, cart, and order state.
 */
declare class SessionManager {
    private sessions;
    private cleanupInterval;
    constructor();
    /**
     * Gets an existing session or creates a new one for the given phone number.
     */
    getOrCreateSession(phoneNumber: string, contactName?: string | null): Session;
    /**
     * Gets an existing session without creating a new one.
     */
    getSession(phoneNumber: string): Session | undefined;
    /**
     * Adds a message to the session history (keeps max MAX_HISTORY_LENGTH).
     */
    addMessage(phoneNumber: string, role: 'user' | 'model', content: string): void;
    /**
     * Gets the message history for Gemini context.
     */
    getMessageHistory(phoneNumber: string): MessageHistoryEntry[];
    /**
     * Updates specific fields on a session.
     */
    updateSession(phoneNumber: string, updates: Partial<Session>): void;
    /**
     * Sets the handoff flag for a phone number.
     */
    setHandoff(phoneNumber: string, active: boolean): void;
    /**
     * Checks if a phone number is in handoff mode.
     */
    isHandoff(phoneNumber: string): boolean;
    /**
     * Resets a session to initial state (keeps history).
     */
    resetSession(phoneNumber: string): void;
    /**
     * Removes a session entirely.
     */
    deleteSession(phoneNumber: string): void;
    /**
     * Clears all sessions that have been inactive longer than the timeout.
     */
    clearExpiredSessions(): number;
    /**
     * Returns the total number of active sessions.
     */
    getActiveSessionCount(): number;
    /**
     * Starts the periodic cleanup interval.
     */
    private startCleanupInterval;
    /**
     * Stops the cleanup interval (for testing).
     */
    stopCleanup(): void;
}
export declare const sessionManager: SessionManager;
export { SessionManager };
//# sourceMappingURL=session.manager.d.ts.map