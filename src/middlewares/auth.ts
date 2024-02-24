import { Response } from 'express';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export const auth = async (req: any, _res: Response, next: any) => {
  try {
    const jwtoken = process.env.JWT_SECRET || "";
    if (!req.headers.authorization) {
      throw Error(
        'Request does not have the authentication header',
      );
    }
    const Authorization: any = req.headers.authorization;
    const token: any = Authorization.split(' ')[1];
    try {
      const payload: any = jwt.verify(token, jwtoken);
      if (payload.exp <= moment().unix()) {
        throw Error('Token has been expired');
      }
      req.user = payload;
    } catch (e) {
      throw Error('Token not valid');
    }
    next();
  } catch (error) {
    next(error);
  }
};
