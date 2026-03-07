import { Router, Request, Response } from 'express';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { validateSignature } from '../utils/signature';
import { extractMessages, isStatusUpdate } from '../controllers/message.controller';
import { WebhookPayload } from '../types/whatsapp.types';
import { geminiService } from '../services/gemini.service';
import { sessionManager } from '../services/session.manager';
import { whatsappSender } from '../services/whatsapp.sender';
import { sheetsService } from '../services/sheets.service';
import { buildSystemPrompt } from '../prompts/atendente.prompt';

const router = Router();

// ========================================
// Health check
// ========================================
router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'atendente-whatsapp',
        uptime: process.uptime(),
        activeSessions: sessionManager.getActiveSessionCount(),
    });
});

// ========================================
// Webhook verification (Meta challenge)
// ========================================
router.get('/webhook', (req: Request, res: Response) => {
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;

    if (mode === 'subscribe' && token === env.META_VERIFY_TOKEN) {
        logger.info('✅ Webhook verified successfully');
        res.status(200).send(challenge);
    } else {
        logger.warn({ mode, tokenReceived: !!token }, '❌ Webhook verification failed');
        res.status(403).send('Forbidden');
    }
});

// ========================================
// Webhook message reception + processing
// ========================================
router.post('/webhook', (req: Request, res: Response) => {
    // Always respond 200 immediately (Meta requires response within 5s)
    res.status(200).send('EVENT_RECEIVED');

    // Validate signature if app secret is configured
    if (env.META_APP_SECRET) {
        const signature = req.headers['x-hub-signature-256'] as string;
        // @ts-ignore - rawBody is attached by express.json.verify in app.ts
        const rawBody = req.rawBody || JSON.stringify(req.body);

        if (!validateSignature(rawBody, signature, env.META_APP_SECRET)) {
            logger.warn('❌ Invalid webhook signature — ignoring event');
            return;
        }
    }

    const payload = req.body as WebhookPayload;

    // Ignore status updates (delivered, read, etc.)
    if (isStatusUpdate(payload)) {
        logger.debug('📊 Status update received — ignoring');
        return;
    }

    // Extract messages
    const messages = extractMessages(payload);

    if (messages.length === 0) {
        logger.debug('No processable messages in webhook event');
        return;
    }

    // Process each message asynchronously
    for (const message of messages) {
        processMessage(message.from, message.text, message.contactName, message.messageId, message.type)
            .catch((error) => {
                logger.error(
                    { error: error instanceof Error ? error.message : String(error), from: message.from.slice(-4) },
                    '❌ Error processing message',
                );
            });
    }
});

// ========================================
// Admin endpoints
// ========================================
router.post('/admin/reactivate', (req: Request, res: Response) => {
    const { phone } = req.body as { phone?: string };

    if (!phone) {
        res.status(400).json({ error: 'Missing "phone" field' });
        return;
    }

    sessionManager.setHandoff(phone, false);
    sessionManager.resetSession(phone);

    logger.info({ phone: phone.slice(-4) }, '🤖 Bot reactivated via admin');
    res.status(200).json({ success: true, message: `Bot reactivated for ...${phone.slice(-4)}` });
});

// ========================================
// Core message processing
// ========================================
async function processMessage(
    from: string,
    text: string | null,
    contactName: string | null,
    messageId: string,
    messageType: string,
): Promise<void> {
    // Mark message as read
    whatsappSender.markAsRead(messageId);

    // Check if handoff is active — ignore if so
    if (sessionManager.isHandoff(from)) {
        logger.info({ from: from.slice(-4) }, '🤝 Message ignored — handoff active');
        return;
    }

    // Get or create session
    const session = sessionManager.getOrCreateSession(from, contactName);

    // Handle non-text messages
    if (!text && messageType !== 'image') {
        // Audio, video, sticker, etc.
        const unsupportedMsg = messageType === 'audio'
            ? 'Oi! Desculpe, mas eu não consigo ouvir áudios no momento 😕 Pode escrever pra mim em texto por favor?'
            : messageType === 'sticker'
                ? '😊'
                : 'Desculpe, não consigo processar esse tipo de mensagem. Pode me enviar como texto? 📝';

        await whatsappSender.sendTextMessage(from, unsupportedMsg);
        return;
    }

    // Handle image (potential Pix proof)
    if (messageType === 'image' && session.state === 'AWAITING_PIX_PROOF') {
        // Will be fully implemented in Story 4.1
        await whatsappSender.sendTextMessage(
            from,
            '✅ Comprovante recebido! Seu pedido está confirmado e já está sendo preparado 🍽️',
        );
        sessionManager.updateSession(from, { state: 'CONFIRMED' as never });
        return;
    }

    // Process text with Gemini
    const userMessage = text || '';

    // Add user message to history
    sessionManager.addMessage(from, 'user', userMessage);

    // Fetch restaurant cardápio and promoções (uses cache internally)
    const restaurantData = await sheetsService.getRestaurantData();

    // Build system prompt with dynamic data
    const systemPrompt = buildSystemPrompt(
        restaurantData.formattedMenu,
        restaurantData.formattedPromos,
        env.PIX_RECEIVER_NAME || 'nosso restaurante'
    );

    // Get message history for context
    const messageHistory = sessionManager.getMessageHistory(from);

    // Generate response from Gemini
    const rawResponse = await geminiService.generateResponse(
        systemPrompt,
        messageHistory.slice(0, -1), // Exclude the message we just added (it goes as userMessage)
        userMessage,
    );

    // Extract control tags
    const { cleanText, tags } = geminiService.extractControlTags(rawResponse);

    // Handle control tags
    if (tags.includes('HANDOFF')) {
        sessionManager.setHandoff(from, true);
    }

    if (tags.includes('ORDER_CONFIRMED')) {
        const isPix = tags.includes('PIX_REQUESTED');
        const newState = isPix ? 'AWAITING_PIX_PROOF' : 'CONFIRMED';

        sessionManager.updateSession(from, { state: newState as any });
        logger.info({ phone: from.slice(-4), isPix }, '✅ Order confirmed by Luna');
    }

    // Add model response to history
    sessionManager.addMessage(from, 'model', cleanText);

    // Send response to client
    await whatsappSender.sendTextMessage(from, cleanText);

    logger.info(
        {
            from: from.slice(-4),
            state: session.state,
            tags: tags.length > 0 ? tags : undefined,
            historyLength: messageHistory.length,
        },
        '💬 Message processed and response sent',
    );
}

export { router as webhookRouter };
