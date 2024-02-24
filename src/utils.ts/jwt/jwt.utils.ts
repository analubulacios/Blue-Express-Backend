import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import 'dotenv/config';
import type { JwtPayload } from 'jsonwebtoken';
import { DataToken } from './jwt.types';

/**
 * @description we get a token with the user's key data to use in the sections
 * @param user
 * @returns
 */
export const getToken = (user: any) => {
  try {
    const jwtoken = process.env.JWT_SECRET || "";
    const payload: DataToken = {
      sub: user.userId,
      uuid: user.uuid,
      username: user.username,
      verified: user.verified,
      type: user.type,
      deleted: user.deleted,
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix(),
    };
    return jwt.sign(payload, jwtoken);
  } catch (e) {
    throw Error('Error');
  }
};

export function getData(bearerHeader: string, secret: string) {
  try {
    const bearer = bearerHeader.split(' ');

    const token = bearer[1];

    if (!token)     throw Error('Error');

    const decoded = jwt.verify(token, secret) as JwtPayload;

    return decoded;
  } catch (error) {
    throw Error('Error');
  }
}
