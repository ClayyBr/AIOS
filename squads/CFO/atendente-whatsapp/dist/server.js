"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
const PORT = env_1.env.PORT;
app_1.app.listen(PORT, () => {
    logger_1.logger.info({
        port: PORT,
        env: env_1.env.NODE_ENV,
        geminiConfigured: !!env_1.env.GEMINI_API_KEY,
        metaConfigured: !!env_1.env.META_ACCESS_TOKEN,
        sheetsConfigured: !!env_1.env.GOOGLE_SHEETS_CREDENTIALS,
    }, `🚀 Atendente WhatsApp server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map