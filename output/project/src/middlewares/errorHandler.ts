import { Request, Response, NextFunction } from 'express';
import { ZodIssue } from 'zod'; // Import ZodIssue for validation errors

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: ZodIssue[]; // Optional: for validation error details

  constructor(name: string, message: string, statusCode: number = 500, errors?: ZodIssue[], isOperational: boolean = true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restores prototype chain
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor); // Captures stack trace
  }
}

// Middleware de tratamento de erros centralizado
export const errorHandlerMiddleware = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    console.error(`🚨 AppError: [${err.name}] ${err.message} (Status: ${err.statusCode})`, err.errors || err.stack);
    return res.status(err.statusCode).json({
      status: 'error',
      name: err.name,
      message: err.message,
      ...(err.errors && { errors: err.errors }), // Inclui detalhes de erro de validação
    });
  }

  // Erros inesperados
  console.error(`💥 Unexpected Error: ${err.message}`, err.stack);
  return res.status(500).json({
    status: 'error',
    name: 'InternalServerError',
    message: 'Something went wrong. Please try again later.',
  });
};
