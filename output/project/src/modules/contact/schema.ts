import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(100, 'Name too long.'),
  email: z.string().email('Invalid email address.').max(100, 'Email too long.'),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone),
      'Invalid phone number format.'
    )
    .optional(),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters.')
    .max(200, 'Subject too long.')
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(1000, 'Message too long.'),
  createdAt: z.date().default(() => new Date()),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const createContactFormDTOSchema = contactFormSchema.omit({ createdAt: true });
export type CreateContactFormDTO = z.infer<typeof createContactFormDTOSchema>;
