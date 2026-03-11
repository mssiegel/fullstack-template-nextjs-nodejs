import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import { prisma } from '../lib/prisma';
import { generateJWT } from '../utils/jwtUtils';
import logger from '../config/logger';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) throw createError(400, 'Missing credentials!');

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingEmail) throw createError(400, 'Email already exists!');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  generateJWT(res, newUser.id);
  logger.info(`User registered: ${email}`);
  res.status(201).json({ success: true, data: {} });
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw createError(404, 'User not found');

  const userDataWithoutPassword = { id: user.id, email: user.email };
  res.status(200).json({
    success: true,
    data: { user: userDataWithoutPassword },
  });
};

export { registerUser, getUser };
