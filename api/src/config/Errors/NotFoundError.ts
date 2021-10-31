import { ERROR_CODES } from '#/middleware/expressErrorHandler';
import ICustomError from './CustomError';

class NotFoundError extends Error implements ICustomError {
  public code: string;

  constructor(message = 'Not found') {
    super(message);
    this.code = ERROR_CODES.NOTFOUND;
    this.message = message;
  }
}

export default NotFoundError;
