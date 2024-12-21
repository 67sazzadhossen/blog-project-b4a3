import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = UserServices.createUserIntoDB(data);
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

export const UserController = {
  createUser,
};
