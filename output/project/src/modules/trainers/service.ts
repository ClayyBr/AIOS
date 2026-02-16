import { TrainerModel, TrainerDocument } from './model';
import { CreateTrainerDTO, UpdateTrainerDTO, trainerSchema } from './schema';
import { pipe, TE, E, AppError, tryCatchTE } from '../../utils/fp';
import { logger } from '../../utils/logger';

export const createTrainer = (dto: CreateTrainerDTO): TE.TaskEither<AppError, TrainerDocument> =>
  pipe(
    E.tryCatch(
      () => trainerSchema.parse(dto),
      (reason) => ({ type: 'ValidationError', message: 'Invalid trainer data provided.', details: reason })
    ),
    TE.fromEither,
    TE.chainW(validatedData =>
      tryCatchTE(
        () => new TrainerModel(validatedData).save(),
        'DatabaseError'
      )
    )
  );

export const getTrainers = (): TE.TaskEither<AppError, TrainerDocument[]> =>
  tryCatchTE(
    () => TrainerModel.find({ isActive: true }).sort({ name: 1 }).exec(),
    'DatabaseError'
  );

export const getTrainerById = (id: string): TE.TaskEither<AppError, TrainerDocument> =>
  tryCatchTE(
    async () => {
      const trainer = await TrainerModel.findById(id).exec();
      if (!trainer) {
        return Promise.reject(new Error('Trainer not found.'));
      }
      return trainer;
    },
    'NotFoundError'
  );

export const updateTrainer = (id: string, dto: UpdateTrainerDTO): TE.TaskEither<AppError, TrainerDocument> =>
  pipe(
    E.tryCatch(
      () => trainerSchema.partial().parse(dto),
      (reason) => ({ type: 'ValidationError', message: 'Invalid update data provided.', details: reason })
    ),
    TE.fromEither,
    TE.chainW(validatedData =>
      tryCatchTE(
        async () => {
          const updatedTrainer = await TrainerModel.findByIdAndUpdate(id, { ...validatedData, updatedAt: new Date() }, { new: true }).exec();
          if (!updatedTrainer) {
            return Promise.reject(new Error('Trainer not found for update.'));
          }
          return updatedTrainer;
        },
        'DatabaseError'
      )
    )
  );

export const deleteTrainer = (id: string): TE.TaskEither<AppError, { message: string }> =>
  tryCatchTE(
    async () => {
      const result = await TrainerModel.findByIdAndDelete(id).exec();
      if (!result) {
        return Promise.reject(new Error('Trainer not found for deletion.'));
      }
      return { message: 'Trainer deleted successfully.' };
    },
    'DatabaseError'
  );
