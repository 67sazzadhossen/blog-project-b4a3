import { NextFunction, Request, Response } from 'express';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthServices.registerUserIntoDB(req.body);
    const { _id, name, email } = result;

    sendResponse(res, {
      success: true,
      message: 'User registered successfully',
      statusCode: httpStatus.CREATED,
      data: {
        _id,
        name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  registerUser,
};
