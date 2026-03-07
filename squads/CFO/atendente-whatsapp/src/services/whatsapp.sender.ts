import { env } from '../config/env';
import { CONSTANTS } from '../config/constants';
import { logger } from '../utils/logger';

/**
 * WhatsAppSender — Sends messages via Meta WhatsApp Cloud API.
 */
class WhatsAppSender {
    private baseUrl: string;
    private initialized: boolean;

    constructor() {
        this.baseUrl = `${CONSTANTS.META_API_BASE_URL}/${CONSTANTS.META_API_VERSION}/${env.META_PHONE_NUMBER_ID}`;
        this.initialized = !!env.META_ACCESS_TOKEN && !!env.META_PHONE_NUMBER_ID;

        if (!this.initialized) {
            logger.warn('⚠️ META_ACCESS_TOKEN or META_PHONE_NUMBER_ID not configured — WhatsAppSender disabled');
        }
    }

    /**
     * Sends a text message to a WhatsApp number.
     */
    async sendTextMessage(to: string, text: string): Promise<boolean> {
        if (!this.initialized) {
            logger.warn('WhatsAppSender not initialized — message not sent');
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
    async markAsRead(messageId: string): Promise<boolean> {
        if (!this.initialized) return false;

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
                signal: AbortSignal.timeout(CONSTANTS.META_API_TIMEOUT_MS),
            });

            return response.ok;
        } catch {
            // Silently fail for read receipts — not critical
            return false;
        }
    }

    /**
     * Sends a request to the Meta API with retry logic.
     */
    private async sendRequest(
        body: Record<string, unknown>,
        to: string,
    ): Promise<boolean> {
        let lastError: Error | null = null;

        for (let attempt = 1; attempt <= CONSTANTS.MAX_RETRIES; attempt++) {
            try {
                const response = await fetch(`${this.baseUrl}/messages`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: JSON.stringify(body),
                    signal: AbortSignal.timeout(CONSTANTS.META_API_TIMEOUT_MS),
                });

                if (response.ok) {
                    logger.info(
                        { to: to.slice(-4), attempt },
                        '📤 Message sent successfully',
                    );
                    return true;
                }

                const errorData = await response.json().catch(() => ({}));
                lastError = new Error(
                    `Meta API error ${response.status}: ${JSON.stringify(errorData)}`,
                );

                logger.warn(
                    { attempt, status: response.status, to: to.slice(-4) },
                    `⚠️ Meta API attempt ${attempt}/${CONSTANTS.MAX_RETRIES} failed`,
                );
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));

                logger.warn(
                    { attempt, error: lastError.message, to: to.slice(-4) },
                    `⚠️ Meta API attempt ${attempt}/${CONSTANTS.MAX_RETRIES} error`,
                );
            }

            if (attempt < CONSTANTS.MAX_RETRIES) {
                const delay = CONSTANTS.RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }

        logger.error(
            { error: lastError?.message, to: to.slice(-4) },
            '❌ All Meta API retry attempts failed',
        );

        return false;
    }

    private getHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${env.META_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        };
    }
}

// Singleton
export const whatsappSender = new WhatsAppSender();
export { WhatsAppSender };
