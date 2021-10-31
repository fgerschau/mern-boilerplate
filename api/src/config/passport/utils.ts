import jwt from 'jsonwebtoken';
import { IUser } from '#/models/UserModel';
import config from '#/config';

function addTokenToObject(object: any) {
  // Creates a JSON Web Token that expires in x minutes
  const token = jwt.sign(object, config.JWT_SECRET, {
    expiresIn: parseInt(config.JWT_VALID_MIN, 10) * 60,
  });

  object.token = token;
}

export function getObjectWithJwtFromModel(model: IUser) {
  const userObject = model.toJSON();

  addTokenToObject(userObject);

  return userObject;
}
