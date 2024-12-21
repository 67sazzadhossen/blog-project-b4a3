import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';

import createError from 'http-errors';

const registerUserIntoDB = async (payload: TUser) => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw createError('validation error');
  }

  const newUser = await UserModel.create(payload);
  return newUser;
};

export const AuthServices = {
  registerUserIntoDB,
};
