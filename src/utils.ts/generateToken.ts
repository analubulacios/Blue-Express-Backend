import jwt from 'jsonwebtoken';

export type SessionDecodedToken = {
  userId?: string
}

export function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET as string

  const payload: SessionDecodedToken = {
    userId: userId
  };
  const token = jwt.sign(payload, secret);
  return token;
}

