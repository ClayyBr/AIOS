"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    // Meta WhatsApp
    META_VERIFY_TOKEN: zod_1.z.string().default(''),
    META_ACCESS_TOKEN: zod_1.z.string().default(''),
    META_PHONE_NUMBER_ID: zod_1.z.string().default(''),
    META_APP_SECRET: zod_1.z.string().default(''),
    // Google AI Studio
    GEMINI_API_KEY: zod_1.z.string().default(''),
    // Google Sheets
    GOOGLE_SHEETS_CREDENTIALS: zod_1.z.string().default(''),
    SHEETS_CARDAPIO_ID: zod_1.z.string().default(''),
    SHEETS_PEDIDOS_ID: zod_1.z.string().default(''),
    // Pagamento Pix
    PIX_KEY: zod_1.z.string().default(''),
    PIX_RECEIVER_NAME: zod_1.z.string().default(''),
    // Configuração
    SESSION_TIMEOUT_MINUTES: zod_1.z.coerce.number().default(30),
    CARDAPIO_CACHE_MINUTES: zod_1.z.coerce.number().default(15),
    ESTIMATED_DELIVERY_MINUTES: zod_1.z.coerce.number().default(50),
    PORT: zod_1.z.coerce.number().default(3002),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
});
function loadEnv() {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        const formatted = result.error.format();
        throw new Error(`Invalid environment variables: ${JSON.stringify(formatted)}`);
    }
    return result.data;
}
exports.env = loadEnv();
//# sourceMappingURL=env.js.map