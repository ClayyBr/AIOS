/**
 * WhatsApp Cloud API — Webhook Types
 * Based on Meta Cloud API v21.0 documentation
 */
export interface WebhookPayload {
    object: 'whatsapp_business_account';
    entry: WebhookEntry[];
}
export interface WebhookEntry {
    id: string;
    changes: WebhookChange[];
}
export interface WebhookChange {
    value: WebhookValue;
    field: 'messages';
}
export interface WebhookValue {
    messaging_product: 'whatsapp';
    metadata: {
        display_phone_number: string;
        phone_number_id: string;
    };
    contacts?: WebhookContact[];
    messages?: WebhookMessage[];
    statuses?: WebhookStatus[];
}
export interface WebhookContact {
    profile: {
        name: string;
    };
    wa_id: string;
}
export type WebhookMessageType = 'text' | 'image' | 'audio' | 'video' | 'document' | 'sticker' | 'location' | 'contacts' | 'reaction' | 'interactive' | 'button' | 'order' | 'unknown';
export interface WebhookMessage {
    from: string;
    id: string;
    timestamp: string;
    type: WebhookMessageType;
    text?: {
        body: string;
    };
    image?: WebhookMedia;
    audio?: WebhookMedia;
    video?: WebhookMedia;
    document?: WebhookMedia & {
        filename?: string;
    };
    sticker?: WebhookMedia;
    location?: {
        latitude: number;
        longitude: number;
        name?: string;
        address?: string;
    };
    reaction?: {
        message_id: string;
        emoji: string;
    };
}
export interface WebhookMedia {
    id: string;
    mime_type: string;
    sha256?: string;
    caption?: string;
}
export interface WebhookStatus {
    id: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
    timestamp: string;
    recipient_id: string;
    errors?: WebhookError[];
}
export interface WebhookError {
    code: number;
    title: string;
    message: string;
}
export interface ExtractedMessage {
    from: string;
    messageId: string;
    timestamp: string;
    type: WebhookMessageType;
    text: string | null;
    contactName: string | null;
    hasMedia: boolean;
}
//# sourceMappingURL=whatsapp.types.d.ts.map