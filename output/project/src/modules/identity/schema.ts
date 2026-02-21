import { z } from 'zod';

// Define o schema para o input de registro de usuário
export const userRegistrationInputSchema = z.object({
  email: z.string().email('Email inválido.').min(1, 'Email é obrigatório.'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres.'),
  companyName: z.string().min(1, 'Nome da empresa é obrigatório.').optional(),
  name: z.string().min(1, 'Nome é obrigatório.').optional(),
});

// Tipo inferido do schema de input
export type UserRegistrationInput = z.infer<typeof userRegistrationInputSchema>;

// Schema para um usuário completo (incluindo campos gerados pelo sistema)
export const userSchema = userRegistrationInputSchema.extend({
  _id: z.string(), // MongoDB ObjectId como string
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.enum(['pending', 'active', 'inactive']).default('pending'), // Exemplo de status
  // Adicionar outros campos específicos de usuário conforme o app evolui
});

export type User = z.infer<typeof userSchema>;

// Schema para validação de login, se aplicável (não direto para CTA de registro)
export const userLoginInputSchema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
});

export type UserLoginInput = z.infer<typeof userLoginInputSchema>;

// Schema para dados sensíveis, garantindo que a senha nunca seja retornada
export const userPublicSchema = userSchema.omit({ password: true });
export type UserPublic = z.infer<typeof userPublicSchema>;
