import dotenv from 'dotenv';
import { z } from 'zod';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Define o schema de validação para as variáveis de ambiente
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1, 'MONGO_URI é obrigatório.'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET é obrigatório.').optional(), // Opcional para MVP de registro
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60 * 1000), // 1 minute
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100), // 100 requests per window
  // Adicionar outras variáveis de ambiente necessárias
});

// Valida as variáveis de ambiente
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('❌ Erro de validação das variáveis de ambiente:', parseResult.error.issues);
  throw new Error('Variáveis de ambiente inválidas. Verifique seu arquivo .env');
}

// Exporta as variáveis de ambiente configuradas
export const config = {
  port: parseResult.data.PORT,
  mongoUri: parseResult.data.MONGO_URI,
  jwtSecret: parseResult.data.JWT_SECRET,
  rateLimitWindowMs: parseResult.data.RATE_LIMIT_WINDOW_MS,
  rateLimitMaxRequests: parseResult.data.RATE_LIMIT_MAX_REQUESTS,
};
