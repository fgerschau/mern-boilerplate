import express from 'express';
import passport from 'passport';
import LocalLoginStrategy from './LocalLoginStrategy';

export const initializePassportStrategies = (app: express.Express) => {
  app.use(passport.initialize());
  //passport.use('local-signup', LocalSignupStrategy);
  passport.use('local-login', LocalLoginStrategy);
};
