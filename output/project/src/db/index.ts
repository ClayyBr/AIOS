import mongoose from 'mongoose';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { logger } from '../utils/logger';

export const createConnection = (): TE.TaskEither<Error, mongoose.Mongoose> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    return TE.left(new Error('MONGODB_URI is not defined in environment variables.'));
  }

  return pipe(
    TE.tryCatch(
      () => mongoose.connect(mongoUri),
      (reason) => (reason instanceof Error ? reason : new Error(String(reason)))
    ),
    TE.mapLeft((error) => {
      logger.error('Database connection error:', error.message);
      return error;
    })
  );
};
