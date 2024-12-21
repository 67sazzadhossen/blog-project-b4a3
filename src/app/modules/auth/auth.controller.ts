import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendRes from '../../utils/sendRes';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body);
  const { _id, name, email } = result;
  sendRes(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: { _id, name, email },
  });
});

export const AuthController = {
  registerUser,
};
