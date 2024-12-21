import { Request, Response } from 'express';
import { UserServices } from '../user/user.service';

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Validation error',
      error,
    });
  }
};

export const AuthController = {
  registerUser,
};
