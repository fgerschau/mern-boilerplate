import express, { NextFunction, Request, Response } from 'express';
import { IValidationError } from '../utils/ValidationError';
import { expressErrorHandler } from './expressErrorHandler';

interface ILocalizedError {
  message: string;
  id: string;
}

export interface IClientError {
  error: ILocalizedError[];
}

const validationErrorHandler = (
  error: IValidationError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error?.name === 'ValidationError') {
    res.status(400).json(error.errors);
    next(error);
    return;
  }

  // TODO: Add default error handler
  next(error);
};

export const initializeErrorMiddleware = (app: express.Express) => {
  app.use(validationErrorHandler);
  app.use(expressErrorHandler);
};
