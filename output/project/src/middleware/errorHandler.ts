import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/fp';
import { logger } from '../utils/logger';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error: AppError =
    err instanceof Error
      ? { type: 'UnknownError', message: err.message, details: err }
      : (err as AppError);

  logger.error(`Error: ${error.type} - ${error.message}`, error.details);

  let statusCode = 500;
  switch (error.type) {
    case 'ValidationError':
      statusCode = 400;
      break;
    case 'NotFoundError':
      statusCode = 404;
      break;
    case 'UnauthorizedError':
      statusCode = 401;
      break;
    case 'DatabaseError':
      statusCode = 500;
      break;
    default:
      statusCode = 500;
  }

  res.status(statusCode).json({
    error: { type: error.type, message: error.message, details: error.details },
  });
};
