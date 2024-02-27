"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeUserId = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = decodeUserId(req);
        if (!userId) {
            throw new Error();
        }
        req.userId = userId;
        next();
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
});
exports.auth = auth;
function decodeUserId(req) {
    const secret = process.env.JWT_SECRET;
    const token = parseBearer(req.header('Authorization'));
    if (!token) {
        return {};
    }
    return jsonwebtoken_1.default.verify(token, secret);
}
exports.decodeUserId = decodeUserId;
function parseBearer(string) {
    if (!string)
        return;
    const parts = string.split(' ');
    if (parts.length === 2) {
        var scheme = parts[0];
        var credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
            return credentials;
        }
    }
    return;
}
