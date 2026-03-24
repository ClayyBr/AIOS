"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = void 0;
const express_1 = require("express");
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
const signature_1 = require("../utils/signature");
const message_controller_1 = require("../controllers/message.controller");
const gemini_service_1 = require("../services/gemini.service");
const session_manager_1 = require("../services/session.manager");
const whatsapp_sender_1 = require("../services/whatsapp.sender");
const atendente_prompt_1 = require("../prompts/atendente.prompt");
const router = (0, express_1.Router)();
exports.webhookRouter = router;
// ========================================
// Health check
// ========================================
router.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'atendente-whatsapp',
        uptime: process.uptime(),
        activeSessions: session_manager_1.sessionManager.getActiveSessionCount(),
    });
});
// ========================================
// Webhook verification (Meta challenge)
// ========================================
router.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === env_1.env.META_VERIFY_TOKEN) {
        logger_1.logger.info('✅ Webhook verified successfully');
        res.status(200).send(challenge);
    }
    else {
        logger_1.logger.warn({ mode, tokenReceived: !!token }, '❌ Webhook verification failed');
        res.status(403).send('Forbidden');
    }
});
// ========================================
// Webhook message reception + processing
// ========================================
router.post('/webhook', (req, res) => {
    // Always respond 200 immediately (Meta requires response within 5s)
    res.status(200).send('EVENT_RECEIVED');
    // Validate signature if app secret is configured
    if (env_1.env.META_APP_SECRET) {
        const signature = req.headers['x-hub-signature-256'];
        // @ts-ignore - rawBody is attached by express.json.verify in app.ts
        const rawBody = req.rawBody || JSON.stringify(req.body);
        if (!(0, signature_1.validateSignature)(rawBody, signature, env_1.env.META_APP_SECRET)) {
            logger_1.logger.warn('❌ Invalid webhook signature — ignoring event');
            return;
        }
    }
    const payload = req.body;
    // Ignore status updates (delivered, read, etc.)
    if ((0, message_controller_1.isStatusUpdate)(payload)) {
        logger_1.logger.debug('📊 Status update received — ignoring');
        return;
    }
    // Extract messages
    const messages = (0, message_controller_1.extractMessages)(payload);
    if (messages.length === 0) {
        logger_1.logger.debug('No processable messages in webhook event');
        return;
    }
    // Process each message asynchronously
    for (const message of messages) {
        processMessage(message.from, message.text, message.contactName, message.messageId, message.type)
            .catch((error) => {
            logger_1.logger.error({ error: error instanceof Error ? error.message : String(error), from: message.from.slice(-4) }, '❌ Error processing message');
        });
    }
});
// ========================================
// Admin endpoints
// ========================================
router.post('/admin/reactivate', (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        res.status(400).json({ error: 'Missing "phone" field' });
        return;
    }
    session_manager_1.sessionManager.setHandoff(phone, false);
    session_manager_1.sessionManager.resetSession(phone);
    logger_1.logger.info({ phone: phone.slice(-4) }, '🤖 Bot reactivated via admin');
    res.status(200).json({ success: true, message: `Bot reactivated for ...${phone.slice(-4)}` });
});
// ========================================
// Core message processing
// ========================================
async function processMessage(from, text, contactName, messageId, messageType) {
    // Mark message as read
    whatsapp_sender_1.whatsappSender.markAsRead(messageId);
    // Check if handoff is active — ignore if so
    if (session_manager_1.sessionManager.isHandoff(from)) {
        logger_1.logger.info({ from: from.slice(-4) }, '🤝 Message ignored — handoff active');
        return;
    }
    // Get or create session
    const session = session_manager_1.sessionManager.getOrCreateSession(from, contactName);
    // Handle non-text messages
    if (!text && messageType !== 'image') {
        // Audio, video, sticker, etc.
        const unsupportedMsg = messageType === 'audio'
            ? 'Oi! Desculpe, mas eu não consigo ouvir áudios no momento 😕 Pode escrever pra mim em texto por favor?'
            : messageType === 'sticker'
                ? '😊'
                : 'Desculpe, não consigo processar esse tipo de mensagem. Pode me enviar como texto? 📝';
        await whatsapp_sender_1.whatsappSender.sendTextMessage(from, unsupportedMsg);
        return;
    }
    // Handle image (potential Pix proof)
    if (messageType === 'image' && session.state === 'AWAITING_PIX_PROOF') {
        // Will be fully implemented in Story 4.1
        await whatsapp_sender_1.whatsappSender.sendTextMessage(from, '✅ Comprovante recebido! Seu pedido está confirmado e já está sendo preparado 🍽️');
        session_manager_1.sessionManager.updateSession(from, { state: 'CONFIRMED' });
        return;
    }
    // Process text with Gemini
    const userMessage = text || '';
    // Add user message to history
    session_manager_1.sessionManager.addMessage(from, 'user', userMessage);
    // Build system prompt pointing to Goomer Link
    const systemPrompt = (0, atendente_prompt_1.buildSystemPrompt)(env_1.env.PIX_RECEIVER_NAME || 'nosso restaurante');
    // Get message history for context
    const messageHistory = session_manager_1.sessionManager.getMessageHistory(from);
    // Generate response from Gemini
    const rawResponse = await gemini_service_1.geminiService.generateResponse(systemPrompt, messageHistory.slice(0, -1), // Exclude the message we just added (it goes as userMessage)
    userMessage);
    // Extract control tags
    const { cleanText, tags } = gemini_service_1.geminiService.extractControlTags(rawResponse);
    // Handle control tags
    if (tags.includes('HANDOFF')) {
        session_manager_1.sessionManager.setHandoff(from, true);
    }
    if (tags.includes('ORDER_CONFIRMED')) {
        const isPix = tags.includes('PIX_REQUESTED');
        const newState = isPix ? 'AWAITING_PIX_PROOF' : 'CONFIRMED';
        session_manager_1.sessionManager.updateSession(from, { state: newState });
        logger_1.logger.info({ phone: from.slice(-4), isPix }, '✅ Order confirmed by Luna');
    }
    // Add model response to history
    session_manager_1.sessionManager.addMessage(from, 'model', cleanText);
    // Send response to client
    await whatsapp_sender_1.whatsappSender.sendTextMessage(from, cleanText);
    logger_1.logger.info({
        from: from.slice(-4),
        state: session.state,
        tags: tags.length > 0 ? tags : undefined,
        historyLength: messageHistory.length,
    }, '💬 Message processed and response sent');
}
//# sourceMappingURL=webhook.js.map