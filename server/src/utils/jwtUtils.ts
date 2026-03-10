import { Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';
const JWT_EXPIRY_IN_SECONDS = process.env.JWT_EXPIRY_IN_SECONDS || '3600';

const generateJWT = (res: Response, userId: number) => {
  const expiryInSeconds = parseInt(JWT_EXPIRY_IN_SECONDS as string);
  if (isNaN(expiryInSeconds)) {
    throw new Error('Invalid JWT_EXPIRY value');
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: expiryInSeconds,
  });

  const expiryInMilliseconds = expiryInSeconds * 1000;

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: expiryInMilliseconds,
    path: '/',
  });
};

const clearJWT = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  });
};

export { generateJWT, clearJWT };
