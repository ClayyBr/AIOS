import { app } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const PORT = env.PORT;

app.listen(PORT, () => {
    logger.info({
        port: PORT,
        env: env.NODE_ENV,
        geminiConfigured: !!env.GEMINI_API_KEY,
        metaConfigured: !!env.META_ACCESS_TOKEN,
        sheetsConfigured: !!env.GOOGLE_SHEETS_CREDENTIALS,
    }, `🚀 Atendente WhatsApp server running on port ${PORT}`);
});
