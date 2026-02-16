import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGODB_URI: z.string().url('Invalid MongoDB connection URI.'),
  CORS_ORIGIN: z.string().optional().default('*'),
  // Add other environment variables as needed (e.g., JWT_SECRET, RESEND_API_KEY)
});

try {
  envSchema.parse(process.env);
} catch (error) {
  console.error('Environment variable validation failed:', error);
  process.exit(1);
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export const config = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN,
};
