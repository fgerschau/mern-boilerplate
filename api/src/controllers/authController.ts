import express from 'express';
import { expressAsyncHandler } from './utils/asyncHandler';
import passport from 'passport';

const router = express.Router();

router.post(
  '/register',
  expressAsyncHandler(async (_req, res) => {
    //const user = req.body;
    //await userBll.createUser(user);
    return res.status(405).send({ message: 'The registration is currently closed.' });
  }),
);

router.post('/login', (req, res, next) => {
  const data = req.body;
  if (!data?.password || !data?.email) {
    return res.status(400);
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

export default router;
