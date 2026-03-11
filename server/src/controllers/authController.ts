import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { User, users } from '../models/userModel';
import { clearJWT, generateJWT } from '../utils/jwtUtils';

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Missing credentials' });
    return;
  }

  const user: User | null = users.find((u) => u.email === email) || null;

  if (!user) {
    res.status(400).json({ message: 'User not found!' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: 'Invalid password!' });
    return;
  }
  generateJWT(res, user.id);
  res.status(200).json({ message: 'Login successful!' });
};

const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  clearJWT(res);
  res.status(200).json({ message: 'Logout successful!' });
};

export { loginUser, logoutUser };
