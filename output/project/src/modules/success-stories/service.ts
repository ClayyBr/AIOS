import { SuccessStoryModel, SuccessStoryDocument } from './model';
import { CreateSuccessStoryDTO, UpdateSuccessStoryDTO, successStorySchema } from './schema';
import { pipe, TE, E, AppError, tryCatchTE } from '../../utils/fp';
import { logger } from '../../utils/logger';

export const createSuccessStory = (dto: CreateSuccessStoryDTO): TE.TaskEither<AppError, SuccessStoryDocument> =>
  pipe(
    E.tryCatch(
      () => successStorySchema.parse(dto),
      (reason) => ({ type: 'ValidationError', message: 'Invalid success story data provided.', details: reason })
    ),
    TE.fromEither,
    TE.chainW(validatedData =>
      tryCatchTE(
        () => new SuccessStoryModel(validatedData).save(),
        'DatabaseError'
      )
    )
  );

export const getSuccessStories = (filterFeatured: boolean = false): TE.TaskEither<AppError, SuccessStoryDocument[]> =>
  tryCatchTE(
    () => SuccessStoryModel.find(filterFeatured ? { isFeatured: true } : {}).sort({ createdAt: -1 }).exec(),
    'DatabaseError'
  );

export const getSuccessStoryById = (id: string): TE.TaskEither<AppError, SuccessStoryDocument> =>
  tryCatchTE(
    async () => {
      const story = await SuccessStoryModel.findById(id).exec();
      if (!story) {
        return Promise.reject(new Error('Success story not found.'));
      }
      return story;
    },
    'NotFoundError'
  );

export const updateSuccessStory = (id: string, dto: UpdateSuccessStoryDTO): TE.TaskEither<AppError, SuccessStoryDocument> =>
  pipe(
    E.tryCatch(
      () => successStorySchema.partial().parse(dto),
      (reason) => ({ type: 'ValidationError', message: 'Invalid update data provided.', details: reason })
    ),
    TE.fromEither,
    TE.chainW(validatedData =>
      tryCatchTE(
        async () => {
          const updatedStory = await SuccessStoryModel.findByIdAndUpdate(id, { ...validatedData, updatedAt: new Date() }, { new: true }).exec();
          if (!updatedStory) {
            return Promise.reject(new Error('Success story not found for update.'));
          }
          return updatedStory;
        },
        'DatabaseError'
      )
    )
  );

export const deleteSuccessStory = (id: string): TE.TaskEither<AppError, { message: string }> =>
  tryCatchTE(
    async () => {
      const result = await SuccessStoryModel.findByIdAndDelete(id).exec();
      if (!result) {
        return Promise.reject(new Error('Success story not found for deletion.'));
      }
      return { message: 'Success story deleted successfully.' };
    },
    'DatabaseError'
  );
