import { z } from 'zod';

export const trainerSchema = z.object({
  name: z
    .string()
    .min(2, 'Trainer name must be at least 2 characters.')
    .max(100, 'Trainer name too long.'),
  specialty: z
    .string()
    .min(3, 'Specialty must be at least 3 characters.')
    .max(100, 'Specialty too long.'),
  bio: z.string().max(500, 'Bio must not exceed 500 characters.').optional(),
  imageUrl: z.string().url('Invalid image URL.').optional(), // Storing URL, not image data
  socialLinks: z.record(z.string().url('Invalid social link URL.')).optional(), // e.g., { instagram: '...' }
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Trainer = z.infer<typeof trainerSchema>;

export const createTrainerDTOSchema = trainerSchema.omit({ createdAt: true, updatedAt: true });
export type CreateTrainerDTO = z.infer<typeof createTrainerDTOSchema>;

export const updateTrainerDTOSchema = trainerSchema
  .omit({ createdAt: true, updatedAt: true })
  .partial();
export type UpdateTrainerDTO = z.infer<typeof updateTrainerDTOSchema>;
