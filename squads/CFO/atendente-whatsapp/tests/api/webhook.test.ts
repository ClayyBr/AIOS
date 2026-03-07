import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app';
import { geminiService } from '../../src/services/gemini.service';
import { sessionManager } from '../../src/services/session.manager';
import { textMessagePayload } from '../fixtures/webhook-payloads';
import { env } from '../../src/config/env';

// Mock dependencies
vi.mock('../../src/services/gemini.service', () => ({
    geminiService: {
        generateResponse: vi.fn(),
        extractControlTags: vi.fn(),
    },
}));

vi.mock('../../src/services/whatsapp.sender', () => ({
    whatsappSender: {
        sendTextMessage: vi.fn().mockResolvedValue(true),
        markAsRead: vi.fn().mockResolvedValue(true),
    },
}));

vi.mock('../../src/services/sheets.service', () => ({
    sheetsService: {
        getRestaurantData: vi.fn().mockResolvedValue({
            formattedMenu: 'Menu Teste',
            formattedPromos: 'Promo Teste',
        }),
    },
}));

describe('Webhook Router - Order Transitions', () => {
    const testPhone = '5512991650505'; // Matches textMessagePayload

    beforeEach(() => {
        vi.clearAllMocks();
        sessionManager.resetSession(testPhone);
        sessionManager.updateSession(testPhone, { state: 'ORDERING' as any });
        // Disable signature validation for these routing tests by removing the secret
        env.META_APP_SECRET = '';
    });

    it('should transition to CONFIRMED when only ORDER_CONFIRMED tag is present', async () => {
        vi.mocked(geminiService.generateResponse).mockResolvedValue('Pedido confirmado!\n[ORDER_CONFIRMED]');
        vi.mocked(geminiService.extractControlTags).mockReturnValue({
            cleanText: 'Pedido confirmado!',
            tags: ['ORDER_CONFIRMED'],
        });

        await request(app).post('/webhook').send(textMessagePayload).expect(200);

        // Give the async microtask queue a tick to process the unawaited promise in router
        await new Promise(resolve => setTimeout(resolve, 50));

        const session = sessionManager.getSession(testPhone);
        expect(session?.state).toBe('CONFIRMED');
    });

    it('should transition to AWAITING_PIX_PROOF when ORDER_CONFIRMED and PIX_REQUESTED tags are present', async () => {
        vi.mocked(geminiService.generateResponse).mockResolvedValue('Pedido confirmado! Pagamento via Pix\n[ORDER_CONFIRMED]\n[PIX_REQUESTED]');
        vi.mocked(geminiService.extractControlTags).mockReturnValue({
            cleanText: 'Pedido confirmado! Pagamento via Pix',
            tags: ['ORDER_CONFIRMED', 'PIX_REQUESTED'],
        });

        await request(app).post('/webhook').send(textMessagePayload).expect(200);

        await new Promise(resolve => setTimeout(resolve, 50));

        const session = sessionManager.getSession(testPhone);
        expect(session?.state).toBe('AWAITING_PIX_PROOF');
    });
});
