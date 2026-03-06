import { Router, Request, Response } from 'express';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { validateSignature } from '../utils/signature';
import { extractMessages, isStatusUpdate } from '../controllers/message.controller';
import { WebhookPayload } from '../types/whatsapp.types';

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
// Webhook message reception
// ========================================
router.post('/webhook', (req: Request, res: Response) => {
    // Always respond 200 immediately (Meta requires response within 5s)
    res.status(200).send('EVENT_RECEIVED');

    // Validate signature if app secret is configured
    if (env.META_APP_SECRET) {
        const signature = req.headers['x-hub-signature-256'] as string;
        const rawBody = JSON.stringify(req.body);

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
    // TODO: Story 2.x — Connect to GeminiService + SessionManager for actual processing
    for (const message of messages) {
        logger.info(
            {
                from: message.from.slice(-4),
                type: message.type,
                hasText: !!message.text,
                contactName: message.contactName,
            },
            `💬 Processing message from ...${message.from.slice(-4)}`,
        );
    }
});

export { router as webhookRouter };
