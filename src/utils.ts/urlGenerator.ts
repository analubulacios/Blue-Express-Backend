export function generateRandomString(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

// import { nanoid } from 'nanoid';

// export function generateRandomString(): string {
//     return nanoid();
// }

