import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';

const registerUserIntoDB = async (payload: TUser) => {
  const newUser = await UserModel.create(payload);
  return newUser;
};

export const AuthServices = {
  registerUserIntoDB,
};
