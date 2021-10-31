import UserModel from '#/models/UserModel';
import AuthenticationError from '#/config/Errors/AuthenticationError';
import PassportLocal from 'passport-local';
import { getObjectWithJwtFromModel } from './utils';

const Strategy = PassportLocal.Strategy;

export default new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  (email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    return UserModel.findOne({ email: userData.email }, async (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        const error = new AuthenticationError('User not found.');

        return done(error);
      }

      const validPassword = await user.comparePasswords(userData.password);
      if (!validPassword) {
        const error = new AuthenticationError('Your password is wrong.');

        return done(error);
      }

      const userObject = getObjectWithJwtFromModel(user);

      return UserModel.findOneAndUpdate(
        { _id: userObject._id },
        { $set: { lastLogin: new Date() } },
        (error) => {
          if (error) {
            return done(error);
          }

          return done(null, userObject.token, userObject);
        },
      );
    });
  },
);
