import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, buildFallbackPrompt } from '../../src/prompts/atendente.prompt';

describe('buildSystemPrompt', () => {
    it('should include restaurant name in the prompt', () => {
        const prompt = buildSystemPrompt('Dog do Cleison');
        expect(prompt).toContain('Dog do Cleison');
        expect(prompt).toContain('Luna');
    });

    it('should include Goomer link instructions', () => {
        const prompt = buildSystemPrompt();
        expect(prompt).toContain('benditoes.goomer.app/menu');
    });

    it('should include control tag instructions', () => {
        const prompt = buildSystemPrompt();
        expect(prompt).toContain('[HANDOFF]');
        expect(prompt).toContain('[PIX_REQUESTED]');
        expect(prompt).toContain('[ORDER_CONFIRMED]');
    });

    it('should include personality guidelines', () => {
        const prompt = buildSystemPrompt();
        expect(prompt).toContain('Simpática');
        expect(prompt).toContain('emojis com moderação');
    });

    it('should use default restaurant name when not provided', () => {
        const prompt = buildSystemPrompt();
        expect(prompt).toContain('nosso restaurante');
    });
});

describe('buildFallbackPrompt', () => {
    it('should return a valid prompt with restaurant name', () => {
        const prompt = buildFallbackPrompt('Dog do Cleison');
        expect(prompt).toContain('Dog do Cleison');
        expect(prompt).toContain('benditoes.goomer.app/menu');
    });
});
