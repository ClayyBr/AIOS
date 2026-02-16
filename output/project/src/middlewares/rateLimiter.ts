import rateLimit from 'express-rate-limit';
import { config } from '../config';
import { AppError } from './errorHandler';

// Configuração básica do rate limiter
const rateLimiterMiddleware = rateLimit({
  windowMs: config.rateLimitWindowMs, // Janela de tempo
  max: config.rateLimitMaxRequests,    // Número máximo de requisições por IP por janela
  message: new AppError('TooManyRequests', 'Too many requests from this IP, please try again after some time.', 429),
  // Headers que informam o limite atual
  standardHeaders: true, // Retorna os cabeçalhos `RateLimit-*` (RFC 6585)
  legacyHeaders: false,  // Desabilita os cabeçalhos `X-RateLimit-*` (depreciados)
  // Store: Para uso em produção, configure um store como `connect-redis`
  // Para MVP e desenvolvimento, o store padrão (MemoryStore) é suficiente.
  // store: new RedisStore({
  //   client: redisClient,
  //   expiry: config.rateLimitWindowMs / 1000, // Em segundos
  // }),
});

export default rateLimiterMiddleware;
