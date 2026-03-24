"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const webhook_1 = require("./routes/webhook");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
exports.app = app;
// Middlewares
app.use(express_1.default.json({
    limit: '5mb',
    // @ts-ignore
    verify: (req, _res, buf) => {
        // @ts-ignore
        req.rawBody = buf;
    }
}));
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging middleware
app.use((req, _res, next) => {
    if (req.path !== '/health') {
        logger_1.logger.debug({ method: req.method, path: req.path }, 'Incoming request');
    }
    next();
});
// Routes
app.use('/', webhook_1.webhookRouter);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
// Global error handler
app.use((err, _req, res, _next) => {
    logger_1.logger.error({ error: err.message, stack: err.stack }, 'Unhandled error');
    res.status(500).json({ error: 'Internal Server Error' });
});
//# sourceMappingURL=app.js.map