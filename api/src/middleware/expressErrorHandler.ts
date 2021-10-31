import ICustomError from '#/config/Errors/CustomError';
import logger from '#/utils/logger';
import { Request, Response, NextFunction } from 'express';

export enum ERROR_CODES {
  UNAUTHORIZED = 'UNAUTHORIZED',
  STATUS = 'STATUS',
  NOTFOUND = 'NOTFOUND',
}

export const expressErrorHandler = (
  error: ICustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === ERROR_CODES.UNAUTHORIZED) {
    res.status(401);
    return res.send('Unauthorized');
  }

  if (error.code === ERROR_CODES.NOTFOUND) {
    res.status(404);
    return res.send(error.message);
  }

  if (error.code === ERROR_CODES.STATUS) {
    res.status(error.status);
    return res.send(error.message);
  }

  logger.error(error);
  res.status(500);
  return res.send('Internal server error');
};
