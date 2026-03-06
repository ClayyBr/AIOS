import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    // Meta WhatsApp
    META_VERIFY_TOKEN: z.string().default(''),
    META_ACCESS_TOKEN: z.string().default(''),
    META_PHONE_NUMBER_ID: z.string().default(''),
    META_APP_SECRET: z.string().default(''),

    // Google AI Studio
    GEMINI_API_KEY: z.string().default(''),

    // Google Sheets
    GOOGLE_SHEETS_CREDENTIALS: z.string().default(''),
    SHEETS_CARDAPIO_ID: z.string().default(''),
    SHEETS_PEDIDOS_ID: z.string().default(''),

    // Pagamento Pix
    PIX_KEY: z.string().default(''),
    PIX_RECEIVER_NAME: z.string().default(''),

    // Configuração
    SESSION_TIMEOUT_MINUTES: z.coerce.number().default(30),
    CARDAPIO_CACHE_MINUTES: z.coerce.number().default(15),
    ESTIMATED_DELIVERY_MINUTES: z.coerce.number().default(50),
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        const formatted = result.error.format();
        throw new Error(`Invalid environment variables: ${JSON.stringify(formatted)}`);
    }

    return result.data;
}

export const env = loadEnv();
