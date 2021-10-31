import ICustomError from './CustomError';

class AuthenticationError extends Error implements ICustomError {
  public code: string;

  constructor(message?: string) {
    super(message);
    this.code = 'IncorrectCredentials';
    this.message = message;
    this.name = 'IncorrectCredentialsError';
  }
}

export default AuthenticationError;
