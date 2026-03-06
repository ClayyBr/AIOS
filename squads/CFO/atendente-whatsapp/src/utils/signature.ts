import crypto from 'crypto';
import { logger } from './logger';

/**
 * Validates the X-Hub-Signature-256 header from Meta webhooks.
 * Uses HMAC-SHA256 with the app secret to verify payload integrity.
 *
 * @param rawBody - Raw request body as string/buffer
 * @param signature - Value of X-Hub-Signature-256 header
 * @param appSecret - Meta App Secret
 * @returns true if signature is valid
 */
export function validateSignature(
    rawBody: string | Buffer,
    signature: string,
    appSecret: string,
): boolean {
    if (!signature || !appSecret) {
        logger.warn('Missing signature or app secret for webhook validation');
        return false;
    }

    const expectedSignature =
        'sha256=' +
        crypto
            .createHmac('sha256', appSecret)
            .update(rawBody)
            .digest('hex');

    try {
        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature),
        );
    } catch {
        // timingSafeEqual throws if buffers have different lengths
        return false;
    }
}
