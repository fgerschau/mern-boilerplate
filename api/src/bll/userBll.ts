import userRepository from '#/repositories/userRepository';

const getUser = (id: string) => {
  return userRepository.getUserById(id);
};

const createUser = async (user: any) => {
  return userRepository.createUser(user);
};

const getUserByName = (name: string) => {
  return userRepository.getUserByName(name);
};

export default {
  getUser,
  createUser,
  getUserByName,
};
