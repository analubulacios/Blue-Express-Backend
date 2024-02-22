"use strict";
// export function generateRandomString(): string {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   }
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
const nanoid_1 = require("nanoid");
function generateRandomString() {
    return (0, nanoid_1.nanoid)();
}
exports.generateRandomString = generateRandomString;
