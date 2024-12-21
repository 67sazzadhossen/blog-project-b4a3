import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import httpStatus from 'http-status';

const registerUserIntoDB = async (payload: TUser) => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User Already Exists');
  }

  const newUser = await UserModel.create(payload);
  return newUser;
};

export const AuthServices = {
  registerUserIntoDB,
};
