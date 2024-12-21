import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/api/auth/register', UserController.createUser);

export const UserRoutes = router;
