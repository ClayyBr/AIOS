"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FALLBACK_MESSAGE = exports.GeminiService = exports.geminiService = void 0;
const env_1 = require("../config/env");
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
const genai_1 = require("@google/genai");
/**
 * GeminiService — Interface with Gemini 2.0 Flash API.
 * Handles prompt building, message generation, retry logic, and error handling.
 */
class GeminiService {
    client;
    initialized;
    constructor() {
        this.initialized = false;
        if (!env_1.env.GEMINI_API_KEY) {
            logger_1.logger.warn('⚠️ GEMINI_API_KEY not configured — GeminiService disabled');
            return;
        }
        this.initializeClient();
    }
    async initializeClient() {
        try {
            if (this.client)
                return;
            this.client = new genai_1.GoogleGenAI({ apiKey: env_1.env.GEMINI_API_KEY });
            this.initialized = true;
            logger_1.logger.info('🤖 GeminiService initialized with model: ' + constants_1.CONSTANTS.GEMINI_MODEL);
        }
        catch (error) {
            logger_1.logger.error({ error: error.message, stack: error.stack }, 'Failed to initialize GoogleGenAI client');
        }
    }
    /**
     * Generates a response from Gemini given a system prompt, message history, and new user message.
     *
     * @param systemPrompt - The system instruction (persona + cardápio)
     * @param messageHistory - Previous conversation messages for context
     * @param userMessage - The new message from the user
     * @returns The generated response text
     */
    async generateResponse(systemPrompt, messageHistory, userMessage) {
        if (!this.initialized) {
            // Guard against cold-start race conditions
            await this.initializeClient();
        }
        if (!this.client || !this.initialized) {
            logger_1.logger.warn('GeminiService not initialized — returning fallback');
            return FALLBACK_MESSAGE;
        }
        // Build chat history in the new format
        const geminiHistory = messageHistory.map((entry) => ({
            role: entry.role,
            parts: [{ text: entry.content }],
        }));
        const config = {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            temperature: constants_1.CONSTANTS.GEMINI_TEMPERATURE,
            maxOutputTokens: 500,
            topP: 0.95,
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_NONE',
                },
                {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_NONE',
                },
                {
                    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    threshold: 'BLOCK_NONE',
                },
                {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_NONE',
                },
            ],
        };
        let lastError = null;
        for (let attempt = 1; attempt <= constants_1.CONSTANTS.MAX_RETRIES; attempt++) {
            try {
                // Initialize a new chat session with history and config
                const chat = this.client.chats.create({
                    model: constants_1.CONSTANTS.GEMINI_MODEL,
                    config: config,
                    history: geminiHistory,
                });
                const result = await Promise.race([
                    chat.sendMessage({ message: userMessage }),
                    this.timeout(constants_1.CONSTANTS.GEMINI_API_TIMEOUT_MS),
                ]);
                const text = result.text;
                if (!text || text.trim().length === 0) {
                    logger_1.logger.warn('Gemini returned empty response');
                    return FALLBACK_MESSAGE;
                }
                logger_1.logger.info({ attempt, responseLength: text.length }, '✅ Gemini response generated');
                return text;
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                logger_1.logger.warn({ attempt, maxRetries: constants_1.CONSTANTS.MAX_RETRIES, error: lastError.message }, `⚠️ Gemini attempt ${attempt}/${constants_1.CONSTANTS.MAX_RETRIES} failed`);
                if (attempt < constants_1.CONSTANTS.MAX_RETRIES) {
                    const delay = constants_1.CONSTANTS.RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
                    await this.sleep(delay);
                }
            }
        }
        logger_1.logger.error({ error: lastError?.message }, '❌ All Gemini retry attempts failed — returning fallback');
        return FALLBACK_MESSAGE;
    }
    /**
     * Extracts control tags from a Gemini response.
     * Tags like [HANDOFF], [PIX_REQUESTED], [ORDER_CONFIRMED] are parsed and removed.
     *
     * @param response - Raw response from Gemini
     * @returns Object with clean text and detected tags
     */
    extractControlTags(response) {
        const tagPattern = /\[(HANDOFF|PIX_REQUESTED|ORDER_CONFIRMED)\]/g;
        const tags = [];
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
            logger_1.logger.info({ tags }, '🏷️ Control tags detected in Gemini response');
        }
        return { cleanText, tags };
    }
    /**
     * Creates a timeout promise that rejects after the specified duration.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timeout(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Gemini API timeout after ${ms}ms`)), ms);
        });
    }
    /**
     * Sleep for a specified duration.
     */
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
exports.GeminiService = GeminiService;
const FALLBACK_MESSAGE = 'Desculpe, estamos com uma instabilidade momentânea. Tente novamente em 1 minuto 🙏';
exports.FALLBACK_MESSAGE = FALLBACK_MESSAGE;
// Singleton instance
exports.geminiService = new GeminiService();
//# sourceMappingURL=gemini.service.js.map