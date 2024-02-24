import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';

export function generateToken(userId: string): string {
  const secretKey = crypto.randomBytes(32).toString('hex');

  const payload = {
      userId: userId
  };
  const expiresIn = 7 * 24 * 60 * 60;
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
}

