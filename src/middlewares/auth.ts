import { RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SessionDecodedToken } from '../utils.ts/generateToken';

import 'dotenv/config';

export const auth: RequestHandler = async (req: any, res: Response, next) => {
  try {
    const { userId } = decodeUserId(req)
    if(!userId) {
      throw new Error()
    }
    req.userId = userId
    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};

export function decodeUserId(req: any): SessionDecodedToken {
  const secret = process.env.JWT_SECRET as string 
  const token = parseBearer(req.header('Authorization'))

  if(!token) {
    return {};
  }
  return jwt.verify(token, secret) as SessionDecodedToken;
}

function parseBearer(string: string) {
  if(!string) return;
  const parts = string.split(' ');
  if (parts.length === 2) {
    var scheme = parts[0];
    var credentials = parts[1];
 
    if (/^Bearer$/i.test(scheme)) {
      return credentials
    }
  }
  return;
}