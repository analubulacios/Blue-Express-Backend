import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';

export function generateToken(userId: string): string {
  const secretKey = crypto.randomBytes(32).toString('hex');

  const payload = {
      userId: userId
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

