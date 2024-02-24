import { Response } from 'express';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export const auth = async (req: any, _res: Response, next: any) => {
  try {
    const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDg3ODYwOTQsImV4cCI6MTcwOTM5MDg5NH0.o2Sw-IKVdTGAtPKGU7Rs0rjhYTNWTgOsZ1fUJPJiBj0";

    const [, payloadEncoded] = token1.split('.');
    const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());
    
    console.log("Payload:", payload);
    
    const userId = payload.sub;
    console.log("User ID:", userId);
    console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET);
    const jwtoken = process.env.JWT_SECRET || "";
    if (!req.headers.authorization) {
      throw Error('Request does not have the authentication header');
    }
    const Authorization: any = req.headers.authorization;
    console.log("Authorization:", Authorization);
    const token: any = Authorization.split(' ')[1];
    console.log("token:", token);
    try {
      // hay que ver porque no lee el token
      const payload: any = jwt.verify(token, jwtoken);
      console.log("Decodificado:", payload);
      if (payload.exp <= moment().unix()) {
        throw Error('Token has been expired');
      }
      console.log("Decodificado:", payload);
      req.user = payload;
      next();
    } catch (e) {
      throw Error('Token not valid');
    }
  } catch (error) {
    next(error);
  }
};
