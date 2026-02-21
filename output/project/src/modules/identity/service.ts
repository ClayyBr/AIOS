import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import * as bcrypt from 'bcryptjs';
import { UserRegistrationInput, User, userPublicSchema } from './schema';
import { findUserByEmail, createUser, mapUserToPublic } from './repository';
import { AppError } from '../../middlewares/errorHandler';

// Hash da senha
const hashPassword = (password: string): TE.TaskEither<AppError, string> =>
  TE.tryCatch(
    () => bcrypt.hash(password, 10),
    (reason) =>
      new AppError('PasswordHashingError', `Failed to hash password: ${String(reason)}`, 500)
  );

// Registra um novo usuário
export const registerUser = (input: UserRegistrationInput): TE.TaskEither<AppError, User> =>
  pipe(
    findUserByEmail(input.email),
    TE.chain((existingUser) =>
      existingUser
        ? TE.left(new AppError('ConflictError', 'User with this email already exists.', 409))
        : TE.right(input)
    ),
    TE.chain((validInput) => hashPassword(validInput.password)),
    TE.chain((hashedPassword) =>
      createUser({
        email: input.email,
        password: hashedPassword,
        companyName: input.companyName,
        name: input.name,
      })
    )
  );

// Função para logar o usuário (MVP não focado em login, mas exemplifica)
export const loginUser = (email: string, passwordAttempt: string): TE.TaskEither<AppError, User> =>
  pipe(
    findUserByEmail(email),
    TE.chain((user) =>
      pipe(
        user
          ? TE.right(user)
          : TE.left(new AppError('NotFoundError', 'User not found or invalid credentials.', 401)),
        TE.filterOrElseW(
          (u) => u.status === 'active', // Exemplo: só permite login de usuários ativos
          () => new AppError('ForbiddenError', 'User account is not active.', 403)
        )
      )
    ),
    TE.chain((user) =>
      TE.tryCatch(
        () => bcrypt.compare(passwordAttempt, user.password),
        (reason) =>
          new AppError(
            'PasswordComparisonError',
            `Failed to compare passwords: ${String(reason)}`,
            500
          )
      )
    ),
    TE.chain((isMatch) =>
      isMatch
        ? TE.right(userPublicSchema.parse(userPublicSchema.parse(user))) // Ensure no password leakage
        : TE.left(new AppError('UnauthorizedError', 'Invalid credentials.', 401))
    )
  );
