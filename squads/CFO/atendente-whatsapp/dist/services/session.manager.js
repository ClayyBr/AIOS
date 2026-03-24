"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = exports.sessionManager = void 0;
const session_types_1 = require("../types/session.types");
const env_1 = require("../config/env");
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
/**
 * SessionManager — Manages in-memory conversation sessions indexed by phone number.
 * Each phone number has one session containing message history, cart, and order state.
 */
class SessionManager {
    sessions = new Map();
    cleanupInterval = null;
    constructor() {
        this.startCleanupInterval();
    }
    /**
     * Gets an existing session or creates a new one for the given phone number.
     */
    getOrCreateSession(phoneNumber, contactName) {
        const existing = this.sessions.get(phoneNumber);
        if (existing) {
            existing.lastActivity = new Date();
            if (contactName && !existing.contactName) {
                existing.contactName = contactName;
            }
            return existing;
        }
        const session = {
            phoneNumber,
            contactName: contactName || null,
            messageHistory: [],
            cart: [],
            deliveryAddress: null,
            paymentMethod: null,
            paymentDetails: null,
            state: session_types_1.SessionState.IDLE,
            lastActivity: new Date(),
            isHandoff: false,
            createdAt: new Date(),
        };
        this.sessions.set(phoneNumber, session);
        logger_1.logger.info({ phone: phoneNumber.slice(-4), totalSessions: this.sessions.size }, '🆕 New session created');
        return session;
    }
    /**
     * Gets an existing session without creating a new one.
     */
    getSession(phoneNumber) {
        return this.sessions.get(phoneNumber);
    }
    /**
     * Adds a message to the session history (keeps max MAX_HISTORY_LENGTH).
     */
    addMessage(phoneNumber, role, content) {
        const session = this.sessions.get(phoneNumber);
        if (!session)
            return;
        session.messageHistory.push({ role, content });
        // Trim history to keep only the last N messages
        if (session.messageHistory.length > constants_1.CONSTANTS.MAX_HISTORY_LENGTH) {
            session.messageHistory = session.messageHistory.slice(-constants_1.CONSTANTS.MAX_HISTORY_LENGTH);
        }
        session.lastActivity = new Date();
    }
    /**
     * Gets the message history for Gemini context.
     */
    getMessageHistory(phoneNumber) {
        const session = this.sessions.get(phoneNumber);
        return session?.messageHistory || [];
    }
    /**
     * Updates specific fields on a session.
     */
    updateSession(phoneNumber, updates) {
        const session = this.sessions.get(phoneNumber);
        if (!session)
            return;
        Object.assign(session, updates, { lastActivity: new Date() });
    }
    /**
     * Sets the handoff flag for a phone number.
     */
    setHandoff(phoneNumber, active) {
        const session = this.sessions.get(phoneNumber);
        if (!session)
            return;
        session.isHandoff = active;
        session.state = active ? session_types_1.SessionState.HANDOFF : session_types_1.SessionState.IDLE;
        session.lastActivity = new Date();
        logger_1.logger.info({ phone: phoneNumber.slice(-4), handoff: active }, active ? '🤝 Handoff activated' : '🤖 Bot reactivated');
    }
    /**
     * Checks if a phone number is in handoff mode.
     */
    isHandoff(phoneNumber) {
        const session = this.sessions.get(phoneNumber);
        return session?.isHandoff || false;
    }
    /**
     * Resets a session to initial state (keeps history).
     */
    resetSession(phoneNumber) {
        const session = this.sessions.get(phoneNumber);
        if (!session)
            return;
        session.cart = [];
        session.deliveryAddress = null;
        session.paymentMethod = null;
        session.paymentDetails = null;
        session.state = session_types_1.SessionState.IDLE;
        session.isHandoff = false;
        session.lastActivity = new Date();
    }
    /**
     * Removes a session entirely.
     */
    deleteSession(phoneNumber) {
        this.sessions.delete(phoneNumber);
    }
    /**
     * Clears all sessions that have been inactive longer than the timeout.
     */
    clearExpiredSessions() {
        const timeoutMs = (env_1.env.SESSION_TIMEOUT_MINUTES || 30) * 60 * 1000;
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
            logger_1.logger.info({ cleared, remaining: this.sessions.size }, '🧹 Expired sessions cleared');
        }
        return cleared;
    }
    /**
     * Returns the total number of active sessions.
     */
    getActiveSessionCount() {
        return this.sessions.size;
    }
    /**
     * Starts the periodic cleanup interval.
     */
    startCleanupInterval() {
        this.cleanupInterval = setInterval(() => {
            this.clearExpiredSessions();
        }, constants_1.CONSTANTS.CLEANUP_INTERVAL_MS);
        // Prevent the interval from keeping the process alive
        if (this.cleanupInterval.unref) {
            this.cleanupInterval.unref();
        }
    }
    /**
     * Stops the cleanup interval (for testing).
     */
    stopCleanup() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
        }
    }
}
exports.SessionManager = SessionManager;
// Singleton instance
exports.sessionManager = new SessionManager();
//# sourceMappingURL=session.manager.js.map