import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import { flow, pipe } from 'fp-ts/function';

// Re-export common fp-ts modules for convenience
export { E, TE, T, flow, pipe };

export type AppError = {
  type:
    | 'ValidationError'
    | 'DatabaseError'
    | 'NotFoundError'
    | 'UnauthorizedError'
    | 'UnknownError';
  message: string;
  details?: any;
};

export const toAppError = (error: unknown, type: AppError['type'] = 'UnknownError'): AppError => {
  if (error instanceof Error) {
    return { type, message: error.message };
  } else if (typeof error === 'string') {
    return { type, message: error };
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return { type, message: error.message, details: error };
  }
  return { type, message: 'An unknown error occurred.', details: error };
};

// Utility to lift a promise-returning function to TaskEither with AppError
export const tryCatchTE = <A>(
  fa: () => Promise<A>,
  type: AppError['type'] = 'UnknownError'
): TE.TaskEither<AppError, A> => TE.tryCatch(fa, (reason) => toAppError(reason, type));
