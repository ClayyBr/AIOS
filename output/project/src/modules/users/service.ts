import { UserModel, UserDocument } from './model';
import { CreateUserDTO, userSchema } from './schema';
import { pipe, TE, E, AppError, tryCatchTE } from '../../utils/fp';
import { logger } from '../../utils/logger';

type CreateUserError = AppError | { type: 'DuplicateEmailError'; message: string };

export const createUser = (dto: CreateUserDTO): TE.TaskEither<CreateUserError, UserDocument> =>
  pipe(
    E.tryCatch(
      () => userSchema.parse(dto), // Zod validation
      (reason) => ({
        type: 'ValidationError',
        message: 'Invalid user data provided.',
        details: reason,
      })
    ),
    TE.fromEither,
    TE.chainW((validatedData) =>
      tryCatchTE(
        async () => {
          const existingUser = await UserModel.findOne({ email: validatedData.email });
          if (existingUser) {
            logger.warn(`Attempted to create user with duplicate email: ${validatedData.email}`);
            // Returning an Either.left here within the TaskEither chain
            return Promise.reject({
              type: 'DuplicateEmailError',
              message: 'Email already registered.',
            });
          }
          const newUser = new UserModel(validatedData);
          return newUser.save();
        },
        (error) => {
          if (
            typeof error === 'object' &&
            error !== null &&
            'type' in error &&
            error.type === 'DuplicateEmailError'
          ) {
            return error as CreateUserError;
          }
          logger.error('Database error during user creation:', error);
          return { type: 'DatabaseError', message: 'Failed to create user.', details: error };
        }
      )
    )
  );

export const getUsers = (): TE.TaskEither<AppError, UserDocument[]> =>
  tryCatchTE(() => UserModel.find({}).exec(), 'DatabaseError');

export const getUserById = (id: string): TE.TaskEither<AppError, UserDocument> =>
  tryCatchTE(async () => {
    const user = await UserModel.findById(id).exec();
    if (!user) {
      return Promise.reject(new Error('User not found.'));
    }
    return user;
  }, 'NotFoundError');
