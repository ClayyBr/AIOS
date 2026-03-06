import {
    WebhookPayload,
    WebhookMessage,
    WebhookContact,
    ExtractedMessage,
} from '../types/whatsapp.types';
import { logger } from '../utils/logger';

/**
 * Extracts messages from a Meta webhook payload.
 * A single webhook event can contain multiple entries and messages.
 *
 * @param payload - The webhook payload from Meta
 * @returns Array of extracted messages ready for processing
 */
export function extractMessages(payload: WebhookPayload): ExtractedMessage[] {
    const messages: ExtractedMessage[] = [];

    if (payload.object !== 'whatsapp_business_account') {
        logger.warn({ object: payload.object }, 'Received non-WhatsApp webhook event');
        return messages;
    }

    for (const entry of payload.entry) {
        for (const change of entry.changes) {
            if (change.field !== 'messages') continue;

            const value = change.value;
            const incomingMessages = value.messages || [];
            const contacts = value.contacts || [];

            for (const msg of incomingMessages) {
                const contact = contacts.find((c: WebhookContact) => c.wa_id === msg.from);
                const extracted = extractSingleMessage(msg, contact);
                if (extracted) {
                    messages.push(extracted);
                }
            }
        }
    }

    return messages;
}

/**
 * Extracts a single message into our internal representation.
 */
function extractSingleMessage(
    msg: WebhookMessage,
    contact: WebhookContact | undefined,
): ExtractedMessage | null {
    const text = getMessageText(msg);
    const hasMedia = ['image', 'audio', 'video', 'document', 'sticker'].includes(msg.type);

    const extracted: ExtractedMessage = {
        from: msg.from,
        messageId: msg.id,
        timestamp: msg.timestamp,
        type: msg.type,
        text,
        contactName: contact?.profile?.name || null,
        hasMedia,
    };

    logger.info(
        {
            from: maskPhone(msg.from),
            type: msg.type,
            hasText: !!text,
            hasMedia,
            contactName: contact?.profile?.name || 'unknown',
        },
        '📨 Message received',
    );

    return extracted;
}

/**
 * Extracts text content from different message types.
 */
function getMessageText(msg: WebhookMessage): string | null {
    switch (msg.type) {
        case 'text':
            return msg.text?.body || null;
        case 'image':
        case 'video':
        case 'document':
            return msg[msg.type]?.caption || null;
        case 'location':
            return msg.location
                ? `📍 ${msg.location.name || ''} ${msg.location.address || ''} (${msg.location.latitude}, ${msg.location.longitude})`.trim()
                : null;
        case 'reaction':
            return msg.reaction?.emoji || null;
        default:
            return null;
    }
}

/**
 * Masks a phone number for logging (privacy).
 * "5512991650505" → "55129916****"
 */
function maskPhone(phone: string): string {
    if (phone.length <= 4) return '****';
    return phone.slice(0, -4) + '****';
}

/**
 * Checks if a webhook payload contains status updates (not messages).
 */
export function isStatusUpdate(payload: WebhookPayload): boolean {
    for (const entry of payload.entry) {
        for (const change of entry.changes) {
            if (change.value.statuses && change.value.statuses.length > 0) {
                return true;
            }
        }
    }
    return false;
}
