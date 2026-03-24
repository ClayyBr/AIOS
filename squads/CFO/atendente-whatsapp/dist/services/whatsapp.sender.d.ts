/**
 * WhatsAppSender — Sends messages via Meta WhatsApp Cloud API.
 */
declare class WhatsAppSender {
    private baseUrl;
    private initialized;
    constructor();
    /**
     * Sends a text message to a WhatsApp number.
     */
    sendTextMessage(to: string, text: string): Promise<boolean>;
    /**
     * Marks a message as read (blue ticks).
     */
    markAsRead(messageId: string): Promise<boolean>;
    /**
     * Sends a request to the Meta API with retry logic.
     */
    private sendRequest;
    private getHeaders;
}
export declare const whatsappSender: WhatsAppSender;
export { WhatsAppSender };
//# sourceMappingURL=whatsapp.sender.d.ts.map