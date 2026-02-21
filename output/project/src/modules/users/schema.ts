import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name must not exceed 50 characters.'),
  email: z
    .string()
    .email('Invalid email address.')
    .max(100, 'Email must not exceed 100 characters.'),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone),
      'Invalid phone number format.'
    )
    .optional(),
  message: z.string().max(500, 'Message must not exceed 500 characters.').optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof userSchema>;

export const createUserDTOSchema = userSchema.pick({
  name: true,
  email: true,
  phone: true,
  message: true,
});

export type CreateUserDTO = z.infer<typeof createUserDTOSchema>;
