interface MessageHistoryEntry {
    role: 'user' | 'model';
    content: string;
}
/**
 * GeminiService — Interface with Gemini 2.0 Flash API.
 * Handles prompt building, message generation, retry logic, and error handling.
 */
declare class GeminiService {
    private client;
    private initialized;
    constructor();
    private initializeClient;
    /**
     * Generates a response from Gemini given a system prompt, message history, and new user message.
     *
     * @param systemPrompt - The system instruction (persona + cardápio)
     * @param messageHistory - Previous conversation messages for context
     * @param userMessage - The new message from the user
     * @returns The generated response text
     */
    generateResponse(systemPrompt: string, messageHistory: MessageHistoryEntry[], userMessage: string): Promise<string>;
    /**
     * Extracts control tags from a Gemini response.
     * Tags like [HANDOFF], [PIX_REQUESTED], [ORDER_CONFIRMED] are parsed and removed.
     *
     * @param response - Raw response from Gemini
     * @returns Object with clean text and detected tags
     */
    extractControlTags(response: string): {
        cleanText: string;
        tags: string[];
    };
    /**
     * Creates a timeout promise that rejects after the specified duration.
     */
    private timeout;
    /**
     * Sleep for a specified duration.
     */
    private sleep;
}
declare const FALLBACK_MESSAGE = "Desculpe, estamos com uma instabilidade moment\u00E2nea. Tente novamente em 1 minuto \uD83D\uDE4F";
export declare const geminiService: GeminiService;
export { GeminiService, MessageHistoryEntry, FALLBACK_MESSAGE };
//# sourceMappingURL=gemini.service.d.ts.map