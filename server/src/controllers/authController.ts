import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import { User, users } from '../models/userModel';
import { clearJWT, generateJWT } from '../utils/jwtUtils';

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) throw createError(400, 'Missing credentials');

  const user: User | null = users.find((u) => u.email === email) || null;

  if (!user) throw createError(400, 'User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createError(400, 'Invalid password');

  generateJWT(res, user.id);
  res.status(200).json({ success: true, data: {} });
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  clearJWT(res);
  res.status(200).json({ success: true, data: {} });
};

export { loginUser, logoutUser };
