"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
function generateRandomString() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
exports.generateRandomString = generateRandomString;
