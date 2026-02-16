import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.').max(100, 'Name cannot exceed 100 characters.'),
  email: z.string().email('Invalid email address.').max(255, 'Email cannot exceed 255 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.').max(1000, 'Message cannot exceed 1000 characters.').optional().or(z.literal('')), // Allow empty string as optional
});

export type ContactFormInputs = z.infer<typeof ContactSchema>;
