import { describe, it, expect } from 'vitest';
import { GeminiService, FALLBACK_MESSAGE } from '../../src/services/gemini.service';

describe('GeminiService', () => {
    describe('extractControlTags', () => {
        // Create instance just for tag extraction tests (no API key needed)
        const service = new GeminiService();

        it('should extract [HANDOFF] tag', () => {
            const response = 'Vou te transferir para nosso atendimento. Aguarde! 😊\n[HANDOFF]';
            const result = service.extractControlTags(response);

            expect(result.tags).toContain('HANDOFF');
            expect(result.cleanText).toBe('Vou te transferir para nosso atendimento. Aguarde! 😊');
            expect(result.cleanText).not.toContain('[HANDOFF]');
        });

        it('should extract [PIX_REQUESTED] tag', () => {
            const response = 'Ótimo! Vou te enviar a chave Pix 💰\n[PIX_REQUESTED]';
            const result = service.extractControlTags(response);

            expect(result.tags).toContain('PIX_REQUESTED');
            expect(result.cleanText).toBe('Ótimo! Vou te enviar a chave Pix 💰');
        });

        it('should extract [ORDER_CONFIRMED] tag', () => {
            const response = 'Pedido confirmado! Prazo de ~50min 🍽️\n[ORDER_CONFIRMED]';
            const result = service.extractControlTags(response);

            expect(result.tags).toContain('ORDER_CONFIRMED');
            expect(result.cleanText).toBe('Pedido confirmado! Prazo de ~50min 🍽️');
        });

        it('should extract multiple tags', () => {
            const response = 'Pedido confirmado via Pix!\n[ORDER_CONFIRMED]\n[PIX_REQUESTED]';
            const result = service.extractControlTags(response);

            expect(result.tags).toHaveLength(2);
            expect(result.tags).toContain('ORDER_CONFIRMED');
            expect(result.tags).toContain('PIX_REQUESTED');
        });

        it('should return empty tags array when no tags present', () => {
            const response = 'Olá! Como posso te ajudar? 😊';
            const result = service.extractControlTags(response);

            expect(result.tags).toHaveLength(0);
            expect(result.cleanText).toBe('Olá! Como posso te ajudar? 😊');
        });

        it('should handle response with tag in the middle', () => {
            const response = 'Vou verificar [HANDOFF] com a equipe';
            const result = service.extractControlTags(response);

            expect(result.tags).toContain('HANDOFF');
            expect(result.cleanText).toBe('Vou verificar  com a equipe');
        });

        it('should not extract unknown tags', () => {
            const response = 'Teste [UNKNOWN_TAG] aqui';
            const result = service.extractControlTags(response);

            expect(result.tags).toHaveLength(0);
            expect(result.cleanText).toBe('Teste [UNKNOWN_TAG] aqui');
        });
    });

    describe('FALLBACK_MESSAGE', () => {
        it('should be a non-empty string', () => {
            expect(FALLBACK_MESSAGE).toBeTruthy();
            expect(typeof FALLBACK_MESSAGE).toBe('string');
        });

        it('should contain a friendly message', () => {
            expect(FALLBACK_MESSAGE).toContain('instabilidade');
        });
    });
});
