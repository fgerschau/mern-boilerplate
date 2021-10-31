import { ERROR_CODES } from '#/middleware/expressErrorHandler';
import ICustomError from './CustomError';

class StatusError extends Error implements ICustomError {
  public code: string;
  public status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.code = ERROR_CODES.STATUS;
    this.status = status;
    this.message = message || ERROR_CODES.STATUS;
  }
}

export default StatusError;
