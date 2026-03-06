import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'atendente-whatsapp',
        uptime: process.uptime(),
    });
});

// Webhook verification (Meta challenge)
router.get('/webhook', (req: Request, res: Response) => {
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;

    if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
        logger.info('✅ Webhook verified successfully');
        res.status(200).send(challenge);
    } else {
        logger.warn({ mode, tokenReceived: !!token }, '❌ Webhook verification failed');
        res.status(403).send('Forbidden');
    }
});

// Webhook message reception (placeholder — will be expanded in Story 1.2)
router.post('/webhook', (_req: Request, res: Response) => {
    // Respond 200 immediately (Meta requires fast response)
    res.status(200).send('EVENT_RECEIVED');

    // Async processing will be added in Story 1.2
    logger.info('📨 Webhook event received');
});

export { router as webhookRouter };
