/**
 * System Prompt — Persona "Luna"
 * Atendente virtual do restaurante via WhatsApp.
 *
 * Este prompt é injetado como system instruction no Gemini 1.5 Flash.
 * Ele define a personalidade, regras e formato das respostas.
 */
export declare function buildSystemPrompt(nomeRestaurante?: string): string;
/**
 * Prompt simplificado para quando o cardápio não estiver disponível.
 */
export declare function buildFallbackPrompt(nomeRestaurante?: string): string;
//# sourceMappingURL=atendente.prompt.d.ts.map