import userBll from '#/bll/userBll';
import { isAuthenticated } from '#/middleware/authentication';
import express from 'express';
import { expressAsyncHandler } from './utils/asyncHandler';

const router = express.Router();

router.get(
  '/users/:id',
  isAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const user = await userBll.getUser(req.params.id);
    res.send(user);
  }),
);

router.post(
  '/users',
  expressAsyncHandler(async (req, res) => {
    const user = req.body;
    const newUser = await userBll.createUser(user);
    res.status(201).json(newUser);
  }),
);

export default router;
