import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import { users } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) throw createError(401, 'Not authorized, no token');

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw createError(500, 'JWT secret is not defined');

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const user = users.find((u) => u.id === decoded.userId);

    if (!user) throw createError(401, 'Not authorized, user not found');

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw createError(401, 'Token expired');

    if (error instanceof jwt.JsonWebTokenError)
      throw createError(401, 'Invalid token');

    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
    return;
  }
};

export default authenticateUser;
