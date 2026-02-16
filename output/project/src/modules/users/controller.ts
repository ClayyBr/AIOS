import { Request, Response } from 'express';
import { pipe, TE } from '../../utils/fp';
import * as UserService from './service';
import { CreateUserDTO } from './schema';
import { logger } from '../../utils/logger';

export const createUserHandler = (req: Request, res: Response) =>
  pipe(
    UserService.createUser(req.body as CreateUserDTO),
    TE.match(
      (error) => {
        logger.error('Failed to create user:', error);
        let statusCode = 500;
        if (error.type === 'ValidationError') statusCode = 400;
        if (error.type === 'DuplicateEmailError') statusCode = 409; // Conflict
        res.status(statusCode).json({ error });
      },
      (user) => res.status(201).json(user)
    )
  )(); // Call the TaskEither to execute it

export const getUsersHandler = (req: Request, res: Response) =>
  pipe(
    UserService.getUsers(),
    TE.match(
      (error) => {
        logger.error('Failed to retrieve users:', error);
        res.status(500).json({ error });
      },
      (users) => res.status(200).json(users)
    )
  )();

export const getUserByIdHandler = (req: Request, res: Response) =>
  pipe(
    UserService.getUserById(req.params.id),
    TE.match(
      (error) => {
        logger.error(`Failed to retrieve user with ID ${req.params.id}:`, error);
        let statusCode = 500;
        if (error.type === 'NotFoundError') statusCode = 404;
        res.status(statusCode).json({ error });
      },
      (user) => res.status(200).json(user)
    )
  )();
