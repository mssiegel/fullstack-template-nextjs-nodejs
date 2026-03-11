import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { User, users } from '../models/userModel';
import { generateJWT } from '../utils/jwtUtils';
import logger from '../config/logger';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Missing credentials!' });
    return;
  }

  const existingEmail = users.find((user) => user.email === email);
  if (existingEmail) {
    res.status(400).json({ message: 'Email already exists!' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser: User = {
    id: users.length,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  generateJWT(res, newUser.id);
  logger.info(`User registered: ${email}`);
  res.status(201).json({ message: 'User created successfully!' });
};

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = req.user?.id;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json({ id: user.id, email: user.email });
};

export { registerUser, getUser };
