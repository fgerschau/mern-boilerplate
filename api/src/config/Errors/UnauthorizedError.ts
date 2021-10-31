import { ERROR_CODES } from '#/middleware/expressErrorHandler';
import ICustomError from './CustomError';

class UnauthorizedError extends Error implements ICustomError {
  public code: string;

  constructor(message?: string) {
    super(message);
    this.code = ERROR_CODES.UNAUTHORIZED;
    this.message = message;
  }
}

export default UnauthorizedError;
