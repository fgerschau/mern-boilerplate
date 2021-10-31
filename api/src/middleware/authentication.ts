import UnauthorizedError from '#/config/Errors/UnauthorizedError';
import config from '#/config';
import { expressAsyncHandler } from '#/controllers/utils/asyncHandler';
import jwt from 'jsonwebtoken';
import UserModel from '#/models/UserModel';

export const isAuthenticated = expressAsyncHandler(async (req, _res, next) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError();
  }

  const token = req.headers.authorization.split(' ')[0];

  try {
    const decodedUser = jwt.verify(token, config.JWT_SECRET);

    const user = new UserModel(decodedUser);
    await user.validate();

    req.user = user;
    return next();
  } catch (e) {
    throw new UnauthorizedError();
  }
});
