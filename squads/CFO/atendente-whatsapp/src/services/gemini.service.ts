import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { env } from '../config/env';
import { CONSTANTS } from '../config/constants';
import { logger } from '../utils/logger';

interface MessageHistoryEntry {
    role: 'user' | 'model';
    content: string;
}

/**
 * GeminiService — Interface with Gemini 1.5 Flash API.
 * Handles prompt building, message generation, retry logic, and error handling.
 */
class GeminiService {
    private model;
    private initialized: boolean;

    constructor() {
        this.initialized = false;

        if (!env.GEMINI_API_KEY) {
            logger.warn('⚠️ GEMINI_API_KEY not configured — GeminiService disabled');
            this.model = null;
            return;
        }

        const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

        this.model = genAI.getGenerativeModel({
            model: CONSTANTS.GEMINI_MODEL,
            generationConfig: {
                temperature: CONSTANTS.GEMINI_TEMPERATURE,
                maxOutputTokens: 500,
                topP: 0.95,
            },
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
            ],
        });

        this.initialized = true;
        logger.info('🤖 GeminiService initialized with model: ' + CONSTANTS.GEMINI_MODEL);
    }

    /**
     * Generates a response from Gemini given a system prompt, message history, and new user message.
     *
     * @param systemPrompt - The system instruction (persona + cardápio)
     * @param messageHistory - Previous conversation messages for context
     * @param userMessage - The new message from the user
     * @returns The generated response text
     */
    async generateResponse(
        systemPrompt: string,
        messageHistory: MessageHistoryEntry[],
        userMessage: string,
    ): Promise<string> {
        if (!this.model || !this.initialized) {
            logger.warn('GeminiService not initialized — returning fallback');
            return FALLBACK_MESSAGE;
        }

        // Build chat history in Gemini format
        const geminiHistory = messageHistory.map((entry) => ({
            role: entry.role,
            parts: [{ text: entry.content }],
        }));

        let lastError: Error | null = null;

        for (let attempt = 1; attempt <= CONSTANTS.MAX_RETRIES; attempt++) {
            try {
                const chat = this.model.startChat({
                    history: geminiHistory,
                    systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
                });

                const result = await Promise.race([
                    chat.sendMessage(userMessage),
                    this.timeout(CONSTANTS.GEMINI_API_TIMEOUT_MS),
                ]);

                const response = result.response;
                const text = response.text();

                if (!text || text.trim().length === 0) {
                    logger.warn('Gemini returned empty response');
                    return FALLBACK_MESSAGE;
                }

                logger.info(
                    { attempt, responseLength: text.length },
                    '✅ Gemini response generated',
                );

                return text;
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));

                logger.warn(
                    { attempt, maxRetries: CONSTANTS.MAX_RETRIES, error: lastError.message },
                    `⚠️ Gemini attempt ${attempt}/${CONSTANTS.MAX_RETRIES} failed`,
                );

                if (attempt < CONSTANTS.MAX_RETRIES) {
                    const delay = CONSTANTS.RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
                    await this.sleep(delay);
                }
            }
        }

        logger.error(
            { error: lastError?.message },
            '❌ All Gemini retry attempts failed — returning fallback',
        );

        return FALLBACK_MESSAGE;
    }

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
    } {
        const tagPattern = /\[(HANDOFF|PIX_REQUESTED|ORDER_CONFIRMED)\]/g;
        const tags: string[] = [];

        let match;
        while ((match = tagPattern.exec(response)) !== null) {
            tags.push(match[1]);
        }

        // Remove tags from the response text
        const cleanText = response
            .replace(tagPattern, '')
            .replace(/\n\s*$/, '') // Remove trailing empty lines
            .trim();

        if (tags.length > 0) {
            logger.info({ tags }, '🏷️ Control tags detected in Gemini response');
        }

        return { cleanText, tags };
    }

    /**
     * Creates a timeout promise that rejects after the specified duration.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private timeout(ms: number): Promise<any> {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Gemini API timeout after ${ms}ms`)), ms);
        });
    }

    /**
     * Sleep for a specified duration.
     */
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

const FALLBACK_MESSAGE =
    'Desculpe, estamos com uma instabilidade momentânea. Tente novamente em 1 minuto 🙏';

// Singleton instance
export const geminiService = new GeminiService();
export { GeminiService, MessageHistoryEntry, FALLBACK_MESSAGE };
