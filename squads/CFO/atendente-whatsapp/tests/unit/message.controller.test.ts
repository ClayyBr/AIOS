import { describe, it, expect } from 'vitest';
import { extractMessages, isStatusUpdate } from '../../src/controllers/message.controller';
import {
    textMessagePayload,
    imageMessagePayload,
    statusUpdatePayload,
    emptyPayload,
    comandaSitePayload,
} from '../fixtures/webhook-payloads';
import { WebhookPayload } from '../../src/types/whatsapp.types';

describe('extractMessages', () => {
    it('should extract text message correctly', () => {
        const messages = extractMessages(textMessagePayload);

        expect(messages).toHaveLength(1);
        expect(messages[0].from).toBe('5512991650505');
        expect(messages[0].type).toBe('text');
        expect(messages[0].text).toBe('Olá, quero fazer um pedido');
        expect(messages[0].contactName).toBe('Cleison Braga');
        expect(messages[0].hasMedia).toBe(false);
        expect(messages[0].messageId).toBe('wamid.HBgMNTU0MTk5MTIzNDU2FQIAERgSMEIwRjhGMkQzNTRCRjUzMkIA');
    });

    it('should extract image message with caption', () => {
        const messages = extractMessages(imageMessagePayload);

        expect(messages).toHaveLength(1);
        expect(messages[0].from).toBe('5512991650505');
        expect(messages[0].type).toBe('image');
        expect(messages[0].text).toBe('Comprovante Pix');
        expect(messages[0].hasMedia).toBe(true);
    });

    it('should extract comanda message from site', () => {
        const messages = extractMessages(comandaSitePayload);

        expect(messages).toHaveLength(1);
        expect(messages[0].type).toBe('text');
        expect(messages[0].text).toContain('#### NOVO PEDIDO ####');
        expect(messages[0].text).toContain('Nº pedido: 48');
        expect(messages[0].text).toContain('VALOR FINAL: R$ 27,00');
    });

    it('should return empty array for empty payload', () => {
        const messages = extractMessages(emptyPayload);
        expect(messages).toHaveLength(0);
    });

    it('should return empty array for non-whatsapp payload', () => {
        const payload = {
            object: 'instagram',
            entry: [],
        } as unknown as WebhookPayload;

        const messages = extractMessages(payload);
        expect(messages).toHaveLength(0);
    });

    it('should return empty array for status update payload', () => {
        const messages = extractMessages(statusUpdatePayload);
        expect(messages).toHaveLength(0);
    });

    it('should handle contact name as null when no contacts', () => {
        const payloadNoContacts: WebhookPayload = {
            object: 'whatsapp_business_account',
            entry: [
                {
                    id: 'BIZ_ID',
                    changes: [
                        {
                            value: {
                                messaging_product: 'whatsapp',
                                metadata: {
                                    display_phone_number: '5511999990000',
                                    phone_number_id: 'PHONE_ID',
                                },
                                messages: [
                                    {
                                        from: '5512000000000',
                                        id: 'wamid.NOCONTACT',
                                        timestamp: '1709740400',
                                        type: 'text',
                                        text: { body: 'Hello' },
                                    },
                                ],
                            },
                            field: 'messages',
                        },
                    ],
                },
            ],
        };

        const messages = extractMessages(payloadNoContacts);
        expect(messages).toHaveLength(1);
        expect(messages[0].contactName).toBeNull();
    });
});

describe('isStatusUpdate', () => {
    it('should return true for status update payload', () => {
        expect(isStatusUpdate(statusUpdatePayload)).toBe(true);
    });

    it('should return false for text message payload', () => {
        expect(isStatusUpdate(textMessagePayload)).toBe(false);
    });

    it('should return false for empty payload', () => {
        expect(isStatusUpdate(emptyPayload)).toBe(false);
    });
});
