import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
    isBlocked: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<TUser>('User', userSchema);
