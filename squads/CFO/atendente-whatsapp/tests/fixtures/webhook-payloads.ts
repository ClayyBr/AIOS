import { WebhookPayload } from '../../src/types/whatsapp.types';

/**
 * Sample webhook payloads for testing.
 * Based on Meta WhatsApp Cloud API v21.0 documentation.
 */

export const textMessagePayload: WebhookPayload = {
    object: 'whatsapp_business_account',
    entry: [
        {
            id: 'BUSINESS_ACCOUNT_ID',
            changes: [
                {
                    value: {
                        messaging_product: 'whatsapp',
                        metadata: {
                            display_phone_number: '5511999990000',
                            phone_number_id: 'PHONE_NUMBER_ID',
                        },
                        contacts: [
                            {
                                profile: { name: 'Cleison Braga' },
                                wa_id: '5512991650505',
                            },
                        ],
                        messages: [
                            {
                                from: '5512991650505',
                                id: 'wamid.HBgMNTU0MTk5MTIzNDU2FQIAERgSMEIwRjhGMkQzNTRCRjUzMkIA',
                                timestamp: '1709740000',
                                type: 'text',
                                text: { body: 'Olá, quero fazer um pedido' },
                            },
                        ],
                    },
                    field: 'messages',
                },
            ],
        },
    ],
};

export const imageMessagePayload: WebhookPayload = {
    object: 'whatsapp_business_account',
    entry: [
        {
            id: 'BUSINESS_ACCOUNT_ID',
            changes: [
                {
                    value: {
                        messaging_product: 'whatsapp',
                        metadata: {
                            display_phone_number: '5511999990000',
                            phone_number_id: 'PHONE_NUMBER_ID',
                        },
                        contacts: [
                            {
                                profile: { name: 'Cleison Braga' },
                                wa_id: '5512991650505',
                            },
                        ],
                        messages: [
                            {
                                from: '5512991650505',
                                id: 'wamid.IMAGE123',
                                timestamp: '1709740100',
                                type: 'image',
                                image: {
                                    id: 'IMAGE_ID_123',
                                    mime_type: 'image/jpeg',
                                    sha256: 'abc123',
                                    caption: 'Comprovante Pix',
                                },
                            },
                        ],
                    },
                    field: 'messages',
                },
            ],
        },
    ],
};

export const statusUpdatePayload: WebhookPayload = {
    object: 'whatsapp_business_account',
    entry: [
        {
            id: 'BUSINESS_ACCOUNT_ID',
            changes: [
                {
                    value: {
                        messaging_product: 'whatsapp',
                        metadata: {
                            display_phone_number: '5511999990000',
                            phone_number_id: 'PHONE_NUMBER_ID',
                        },
                        statuses: [
                            {
                                id: 'wamid.STATUS123',
                                status: 'delivered',
                                timestamp: '1709740200',
                                recipient_id: '5512991650505',
                            },
                        ],
                    },
                    field: 'messages',
                },
            ],
        },
    ],
};

export const emptyPayload: WebhookPayload = {
    object: 'whatsapp_business_account',
    entry: [
        {
            id: 'BUSINESS_ACCOUNT_ID',
            changes: [
                {
                    value: {
                        messaging_product: 'whatsapp',
                        metadata: {
                            display_phone_number: '5511999990000',
                            phone_number_id: 'PHONE_NUMBER_ID',
                        },
                    },
                    field: 'messages',
                },
            ],
        },
    ],
};

export const comandaSitePayload: WebhookPayload = {
    object: 'whatsapp_business_account',
    entry: [
        {
            id: 'BUSINESS_ACCOUNT_ID',
            changes: [
                {
                    value: {
                        messaging_product: 'whatsapp',
                        metadata: {
                            display_phone_number: '5511999990000',
                            phone_number_id: 'PHONE_NUMBER_ID',
                        },
                        contacts: [
                            {
                                profile: { name: 'Cleison Braga' },
                                wa_id: '5512991650505',
                            },
                        ],
                        messages: [
                            {
                                from: '5512991650505',
                                id: 'wamid.COMANDA123',
                                timestamp: '1709740300',
                                type: 'text',
                                text: {
                                    body: `#### NOVO PEDIDO ####

#️⃣   Nº pedido: 48
feito em 27/08/2025 22:16

👤   Cleison Braga
📞   (12) 99165-0505

🛵   Endereço de entrega
Rua da Constituição 171
Bairro: Jardim Morumby
(Ao lado da Elétrica Jorge)

------- ITENS DO PEDIDO -------

*1 x Dog Super frango c/Bacon  (Muito +recheio)*
  Sache
    - Maionese Hellmans
    - Catchup
💵 1 x R$ 22,00 = R$ 22,00

-------------------------------

SUBTOTAL: R$ 22,00
*🏍 ENTREGA: R$ 5,00*
🔥 *VALOR FINAL: R$ 27,00*

PAGAMENTO
*Pix*: R$ 27,00

🕐   Prazo para entrega: 50 min`,
                                },
                            },
                        ],
                    },
                    field: 'messages',
                },
            ],
        },
    ],
};
