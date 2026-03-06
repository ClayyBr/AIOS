import express from 'express';
import { webhookRouter } from './routes/webhook';
import { logger } from './utils/logger';

const app = express();

// Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, _res, next) => {
    if (req.path !== '/health') {
        logger.debug({ method: req.method, path: req.path }, 'Incoming request');
    }
    next();
});

// Routes
app.use('/', webhookRouter);

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error({ error: err.message, stack: err.stack }, 'Unhandled error');
    res.status(500).json({ error: 'Internal Server Error' });
});

export { app };
