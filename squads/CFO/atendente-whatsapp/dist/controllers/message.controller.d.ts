import { WebhookPayload, ExtractedMessage } from '../types/whatsapp.types';
/**
 * Extracts messages from a Meta webhook payload.
 * A single webhook event can contain multiple entries and messages.
 *
 * @param payload - The webhook payload from Meta
 * @returns Array of extracted messages ready for processing
 */
export declare function extractMessages(payload: WebhookPayload): ExtractedMessage[];
/**
 * Checks if a webhook payload contains status updates (not messages).
 */
export declare function isStatusUpdate(payload: WebhookPayload): boolean;
//# sourceMappingURL=message.controller.d.ts.map