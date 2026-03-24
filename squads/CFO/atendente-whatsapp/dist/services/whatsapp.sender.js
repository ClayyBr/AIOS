"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppSender = exports.whatsappSender = void 0;
const env_1 = require("../config/env");
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
/**
 * WhatsAppSender — Sends messages via Meta WhatsApp Cloud API.
 */
class WhatsAppSender {
    baseUrl;
    initialized;
    constructor() {
        this.baseUrl = `${constants_1.CONSTANTS.META_API_BASE_URL}/${constants_1.CONSTANTS.META_API_VERSION}/${env_1.env.META_PHONE_NUMBER_ID}`;
        this.initialized = !!env_1.env.META_ACCESS_TOKEN && !!env_1.env.META_PHONE_NUMBER_ID;
        if (!this.initialized) {
            logger_1.logger.warn('⚠️ META_ACCESS_TOKEN or META_PHONE_NUMBER_ID not configured — WhatsAppSender disabled');
        }
    }
    /**
     * Sends a text message to a WhatsApp number.
     */
    async sendTextMessage(to, text) {
        if (!this.initialized) {
            logger_1.logger.warn('WhatsAppSender not initialized — message not sent');
            return false;
        }
        const body = {
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: { body: text },
        };
        return this.sendRequest(body, to);
    }
    /**
     * Marks a message as read (blue ticks).
     */
    async markAsRead(messageId) {
        if (!this.initialized)
            return false;
        const body = {
            messaging_product: 'whatsapp',
            status: 'read',
            message_id: messageId,
        };
        try {
            const response = await fetch(`${this.baseUrl}/messages`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(body),
                signal: AbortSignal.timeout(constants_1.CONSTANTS.META_API_TIMEOUT_MS),
            });
            return response.ok;
        }
        catch {
            // Silently fail for read receipts — not critical
            return false;
        }
    }
    /**
     * Sends a request to the Meta API with retry logic.
     */
    async sendRequest(body, to) {
        let lastError = null;
        for (let attempt = 1; attempt <= constants_1.CONSTANTS.MAX_RETRIES; attempt++) {
            try {
                const response = await fetch(`${this.baseUrl}/messages`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: JSON.stringify(body),
                    signal: AbortSignal.timeout(constants_1.CONSTANTS.META_API_TIMEOUT_MS),
                });
                if (response.ok) {
                    logger_1.logger.info({ to: to.slice(-4), attempt }, '📤 Message sent successfully');
                    return true;
                }
                const errorData = await response.json().catch(() => ({}));
                lastError = new Error(`Meta API error ${response.status}: ${JSON.stringify(errorData)}`);
                logger_1.logger.warn({ attempt, status: response.status, to: to.slice(-4) }, `⚠️ Meta API attempt ${attempt}/${constants_1.CONSTANTS.MAX_RETRIES} failed`);
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                logger_1.logger.warn({ attempt, error: lastError.message, to: to.slice(-4) }, `⚠️ Meta API attempt ${attempt}/${constants_1.CONSTANTS.MAX_RETRIES} error`);
            }
            if (attempt < constants_1.CONSTANTS.MAX_RETRIES) {
                const delay = constants_1.CONSTANTS.RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        logger_1.logger.error({ error: lastError?.message, to: to.slice(-4) }, '❌ All Meta API retry attempts failed');
        return false;
    }
    getHeaders() {
        return {
            'Authorization': `Bearer ${env_1.env.META_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        };
    }
}
exports.WhatsAppSender = WhatsAppSender;
// Singleton
exports.whatsappSender = new WhatsAppSender();
//# sourceMappingURL=whatsapp.sender.js.map