import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SessionManager } from '../../src/services/session.manager';
import { SessionState } from '../../src/types/session.types';

describe('SessionManager', () => {
    let manager: SessionManager;

    beforeEach(() => {
        manager = new SessionManager();
    });

    afterEach(() => {
        manager.stopCleanup();
    });

    describe('getOrCreateSession', () => {
        it('should create a new session for a new phone number', () => {
            const session = manager.getOrCreateSession('5512991650505', 'Cleison');

            expect(session.phoneNumber).toBe('5512991650505');
            expect(session.contactName).toBe('Cleison');
            expect(session.state).toBe(SessionState.IDLE);
            expect(session.messageHistory).toEqual([]);
            expect(session.cart).toEqual([]);
            expect(session.isHandoff).toBe(false);
        });

        it('should return existing session for same phone number', () => {
            const session1 = manager.getOrCreateSession('5512991650505', 'Cleison');
            session1.state = SessionState.ORDERING;

            const session2 = manager.getOrCreateSession('5512991650505');

            expect(session2.state).toBe(SessionState.ORDERING);
            expect(session2.contactName).toBe('Cleison');
        });

        it('should create separate sessions for different phone numbers', () => {
            const session1 = manager.getOrCreateSession('5512991650505', 'Cleison');
            const session2 = manager.getOrCreateSession('5511999990000', 'Maria');

            expect(manager.getActiveSessionCount()).toBe(2);
            expect(session1.contactName).toBe('Cleison');
            expect(session2.contactName).toBe('Maria');
        });

        it('should update contactName if not set on existing session', () => {
            manager.getOrCreateSession('5512991650505');
            const session = manager.getOrCreateSession('5512991650505', 'Cleison');

            expect(session.contactName).toBe('Cleison');
        });
    });

    describe('addMessage', () => {
        it('should add message to session history', () => {
            manager.getOrCreateSession('5512991650505');
            manager.addMessage('5512991650505', 'user', 'Olá, quero um pedido');

            const history = manager.getMessageHistory('5512991650505');
            expect(history).toHaveLength(1);
            expect(history[0].role).toBe('user');
            expect(history[0].content).toBe('Olá, quero um pedido');
        });

        it('should keep max 20 messages in history', () => {
            manager.getOrCreateSession('5512991650505');

            // Add 25 messages
            for (let i = 0; i < 25; i++) {
                manager.addMessage('5512991650505', 'user', `Message ${i}`);
            }

            const history = manager.getMessageHistory('5512991650505');
            expect(history).toHaveLength(20);
            expect(history[0].content).toBe('Message 5'); // First 5 should be trimmed
            expect(history[19].content).toBe('Message 24');
        });

        it('should not crash when session does not exist', () => {
            manager.addMessage('9999999999', 'user', 'test');
            const history = manager.getMessageHistory('9999999999');
            expect(history).toEqual([]);
        });
    });

    describe('setHandoff / isHandoff', () => {
        it('should activate handoff for a phone number', () => {
            manager.getOrCreateSession('5512991650505');
            manager.setHandoff('5512991650505', true);

            expect(manager.isHandoff('5512991650505')).toBe(true);

            const session = manager.getSession('5512991650505');
            expect(session?.state).toBe(SessionState.HANDOFF);
        });

        it('should deactivate handoff and reset to IDLE', () => {
            manager.getOrCreateSession('5512991650505');
            manager.setHandoff('5512991650505', true);
            manager.setHandoff('5512991650505', false);

            expect(manager.isHandoff('5512991650505')).toBe(false);

            const session = manager.getSession('5512991650505');
            expect(session?.state).toBe(SessionState.IDLE);
        });

        it('should return false for non-existent session', () => {
            expect(manager.isHandoff('9999999999')).toBe(false);
        });
    });

    describe('resetSession', () => {
        it('should reset cart, address, payment, and state but keep history', () => {
            const session = manager.getOrCreateSession('5512991650505');
            session.cart = [{ name: 'Dog Super', quantity: 1, unitPrice: 22, options: [] }];
            session.deliveryAddress = 'Rua da Constituição 171';
            session.paymentMethod = 'Pix';
            session.state = SessionState.CONFIRMED;
            manager.addMessage('5512991650505', 'user', 'Olá');

            manager.resetSession('5512991650505');

            const reset = manager.getSession('5512991650505');
            expect(reset?.cart).toEqual([]);
            expect(reset?.deliveryAddress).toBeNull();
            expect(reset?.paymentMethod).toBeNull();
            expect(reset?.state).toBe(SessionState.IDLE);
            expect(reset?.isHandoff).toBe(false);
            // History should be preserved
            expect(reset?.messageHistory).toHaveLength(1);
        });
    });

    describe('clearExpiredSessions', () => {
        it('should clear sessions older than timeout', () => {
            vi.useFakeTimers();

            manager.getOrCreateSession('5512991650505');
            manager.getOrCreateSession('5511999990000');

            // Advance time by 31 minutes (past the 30 min default timeout)
            vi.advanceTimersByTime(31 * 60 * 1000);

            const cleared = manager.clearExpiredSessions();

            expect(cleared).toBe(2);
            expect(manager.getActiveSessionCount()).toBe(0);

            vi.useRealTimers();
        });

        it('should NOT clear sessions still within timeout', () => {
            vi.useFakeTimers();

            manager.getOrCreateSession('5512991650505');

            // Advance time by only 10 minutes (within 30 min timeout)
            vi.advanceTimersByTime(10 * 60 * 1000);

            const cleared = manager.clearExpiredSessions();

            expect(cleared).toBe(0);
            expect(manager.getActiveSessionCount()).toBe(1);

            vi.useRealTimers();
        });

        it('should clear expired and keep active sessions', () => {
            vi.useFakeTimers();

            manager.getOrCreateSession('5512991650505'); // Will expire

            // Advance 31 minutes
            vi.advanceTimersByTime(31 * 60 * 1000);

            // Create a new session (fresh, should survive)
            manager.getOrCreateSession('5511999990000');

            const cleared = manager.clearExpiredSessions();

            expect(cleared).toBe(1);
            expect(manager.getActiveSessionCount()).toBe(1);
            expect(manager.getSession('5511999990000')).toBeDefined();
            expect(manager.getSession('5512991650505')).toBeUndefined();

            vi.useRealTimers();
        });
    });

    describe('updateSession', () => {
        it('should update specific fields', () => {
            manager.getOrCreateSession('5512991650505');
            manager.updateSession('5512991650505', {
                state: SessionState.AWAITING_ADDRESS,
                deliveryAddress: 'Rua do Teste 123',
            });

            const session = manager.getSession('5512991650505');
            expect(session?.state).toBe(SessionState.AWAITING_ADDRESS);
            expect(session?.deliveryAddress).toBe('Rua do Teste 123');
        });
    });

    describe('deleteSession', () => {
        it('should remove session entirely', () => {
            manager.getOrCreateSession('5512991650505');
            manager.deleteSession('5512991650505');

            expect(manager.getSession('5512991650505')).toBeUndefined();
            expect(manager.getActiveSessionCount()).toBe(0);
        });
    });
});
