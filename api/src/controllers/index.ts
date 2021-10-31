import express from 'express';

import userController from './userController';
import authController from './authController';

export default (app: express.Express) => {
  app.use(userController);
  app.use(authController);
};
