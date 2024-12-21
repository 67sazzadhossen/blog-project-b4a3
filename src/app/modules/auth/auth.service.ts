/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import httpStatus from 'http-status';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUserIntoDB = async (payload: TUser) => {
  const isUserExists = await User.findOne({ email: payload?.email });

  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const newUser = await User.create(payload);

  return newUser;
};

const loginUserFromDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This user is blocked');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    userId: (user as any)._id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { token: accessToken };
};

export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB,
};
