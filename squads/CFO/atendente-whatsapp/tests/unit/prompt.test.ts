import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, buildFallbackPrompt } from '../../src/prompts/atendente.prompt';

describe('buildSystemPrompt', () => {
    it('should include restaurant name in the prompt', () => {
        const prompt = buildSystemPrompt('', '', 'Dog do Cleison');
        expect(prompt).toContain('Dog do Cleison');
        expect(prompt).toContain('Luna');
    });

    it('should include cardápio text when provided', () => {
        const cardapio = '- Dog Super: R$ 22,00\n- Dog Simples: R$ 18,00';
        const prompt = buildSystemPrompt(cardapio, '');

        expect(prompt).toContain('Dog Super: R$ 22,00');
        expect(prompt).toContain('Dog Simples: R$ 18,00');
    });

    it('should include promoções when provided', () => {
        const promos = 'Combo Dog + Refri: de R$35,90 por R$29,90';
        const prompt = buildSystemPrompt('', promos);

        expect(prompt).toContain('Combo Dog + Refri');
        expect(prompt).toContain('R$29,90');
    });

    it('should include fallback text when cardápio is empty', () => {
        const prompt = buildSystemPrompt('', '');
        expect(prompt).toContain('verificando com a equipe');
    });

    it('should include control tag instructions', () => {
        const prompt = buildSystemPrompt('', '');
        expect(prompt).toContain('[HANDOFF]');
        expect(prompt).toContain('[PIX_REQUESTED]');
        expect(prompt).toContain('[ORDER_CONFIRMED]');
    });

    it('should include personality guidelines', () => {
        const prompt = buildSystemPrompt('', '');
        expect(prompt).toContain('Simpática');
        expect(prompt).toContain('NUNCA inventar');
        expect(prompt).toContain('emojis com moderação');
    });

    it('should use default restaurant name when not provided', () => {
        const prompt = buildSystemPrompt('', '');
        expect(prompt).toContain('nosso restaurante');
    });
});

describe('buildFallbackPrompt', () => {
    it('should return a valid prompt with fallback cardápio text', () => {
        const prompt = buildFallbackPrompt('Dog do Cleison');
        expect(prompt).toContain('Dog do Cleison');
        expect(prompt).toContain('temporariamente indisponível');
    });
});
