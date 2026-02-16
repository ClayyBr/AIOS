import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Basic rate limiter using express-rate-limit. 
// For Token Bucket with Redis as mandated in blueprint, 
// a more sophisticated implementation would be required.
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req: Request) => req.ip || 'unknown',
});
