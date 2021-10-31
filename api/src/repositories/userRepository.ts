import mongoose from 'mongoose';
import UserModel from '#/models/UserModel';

const createUser = async (user: any) => {
  const newUser = new UserModel(user);
  const savedUser = await newUser.save();
  return savedUser.toObject();
};

const getUserById = (id: string) => {
  return UserModel.findOne({ id: new mongoose.Types.ObjectId(id) });
};

const getUserByName = (name: string) => {
  return UserModel.findOne({ name });
};

export default {
  createUser,
  getUserById,
  getUserByName,
};
