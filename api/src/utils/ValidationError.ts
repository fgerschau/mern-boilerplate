import { ValidationErrorEnum } from '#/enums/validation';
import mongoose from 'mongoose';

export interface IValidationErrorObject {
  type: ValidationErrorEnum;
  path: string;
  message: string; // message in plain english
  messageId: string; // localization ID
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IValidationError extends mongoose.Error.ValidationError {}

export const ValidationError = mongoose.Error.ValidationError;
export const ValidatorError = mongoose.Error.ValidatorError;
