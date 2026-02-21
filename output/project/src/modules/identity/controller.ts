import { Request, Response, NextFunction } from 'express';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { registerUser } from './service';
import { userRegistrationInputSchema, userPublicSchema } from './schema';
import { AppError } from '../../middlewares/errorHandler';

// Controller para registro de usuário
export const handleRegisterUser = (req: Request, res: Response, next: NextFunction) =>
  pipe(
    userRegistrationInputSchema.safeParse(req.body), // Valida o input com Zod
    E.mapLeft(
      (error) => new AppError('ValidationError', 'Invalid registration input.', 400, error.issues)
    ),
    TE.fromEither, // Converte Either para TaskEither
    TE.chainW(registerUser), // Chama o serviço de registro
    TE.map((user) => userPublicSchema.parse(user)), // Garante que a senha não seja enviada na resposta
    TE.match(
      (error) => next(error), // Em caso de erro, passa para o middleware de erro
      (user) => res.status(201).json({ message: 'User registered successfully!', user }) // Em caso de sucesso
    )
  )(); // Executa o TaskEither

// Controller para login de usuário (exemplo, não focado no MVP de registro)
/*
export const handleLoginUser = (req: Request, res: Response, next: NextFunction) =>
  pipe(
    userLoginInputSchema.safeParse(req.body),
    E.mapLeft((error) => new AppError('ValidationError', 'Invalid login input.', 400, error.issues)),
    TE.fromEither,
    TE.chain(({ email, password }) => loginUser(email, password)),
    TE.match(
      (error) => next(error),
      (user) => res.status(200).json({ message: 'Login successful!', user, token: 'some_jwt_token' })
    )
  )();
*/
