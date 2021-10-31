import express from 'express';
import { initializeErrorMiddleware } from './errorHandling';

export const initializeMiddlewares = (app: express.Express) => {
  initializeErrorMiddleware(app); // has to be initialized last
};
