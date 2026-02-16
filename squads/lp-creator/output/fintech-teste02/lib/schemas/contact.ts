import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório e deve ter pelo menos 2 caracteres."),
  email: z.string().email("Email inválido."),
  message: z.string().optional()
});

export type ContactFormInput = z.infer<typeof ContactSchema>;
