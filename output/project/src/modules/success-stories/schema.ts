import { z } from 'zod';

export const successStorySchema = z.object({
  memberId: z.string().optional(), // If linking to a user, otherwise free text
  memberName: z
    .string()
    .min(2, 'Member name must be at least 2 characters.')
    .max(100, 'Member name too long.'),
  storyTitle: z
    .string()
    .min(5, 'Story title must be at least 5 characters.')
    .max(200, 'Story title too long.'),
  storyContent: z
    .string()
    .min(50, 'Story content must be at least 50 characters.')
    .max(2000, 'Story content too long.'),
  imageUrl: z.string().url('Invalid image URL.').optional(),
  videoUrl: z.string().url('Invalid video URL.').optional(), // e.g., YouTube/Vimeo embed URL
  dateAchieved: z.date().optional(),
  isFeatured: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type SuccessStory = z.infer<typeof successStorySchema>;

export const createSuccessStoryDTOSchema = successStorySchema.omit({
  createdAt: true,
  updatedAt: true,
});
export type CreateSuccessStoryDTO = z.infer<typeof createSuccessStoryDTOSchema>;

export const updateSuccessStoryDTOSchema = successStorySchema
  .omit({ createdAt: true, updatedAt: true })
  .partial();
export type UpdateSuccessStoryDTO = z.infer<typeof updateSuccessStoryDTOSchema>;
