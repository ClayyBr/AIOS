"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignature = validateSignature;
const crypto_1 = __importDefault(require("crypto"));
const logger_1 = require("./logger");
/**
 * Validates the X-Hub-Signature-256 header from Meta webhooks.
 * Uses HMAC-SHA256 with the app secret to verify payload integrity.
 *
 * @param rawBody - Raw request body as string/buffer
 * @param signature - Value of X-Hub-Signature-256 header
 * @param appSecret - Meta App Secret
 * @returns true if signature is valid
 */
function validateSignature(rawBody, signature, appSecret) {
    if (!signature || !appSecret) {
        logger_1.logger.warn('Missing signature or app secret for webhook validation');
        return false;
    }
    const expectedSignature = 'sha256=' +
        crypto_1.default
            .createHmac('sha256', appSecret)
            .update(rawBody)
            .digest('hex');
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    }
    catch {
        // timingSafeEqual throws if buffers have different lengths
        return false;
    }
}
//# sourceMappingURL=signature.js.map