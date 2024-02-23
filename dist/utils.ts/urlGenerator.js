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
exports.generateRandomString = void 0;
const nanoid_1 = require("nanoid");
const url_model_1 = __importDefault(require("../modules/models/url.model"));
const nanoid = (0, nanoid_1.customAlphabet)("abcdefghkmnpqrstuvwxyzABCDEFGHKLMNPQRSTUVWXYZ23456789", 5);
function generateRandomString() {
    return __awaiter(this, void 0, void 0, function* () {
        const shortUrl = nanoid();
        const searchDb = yield url_model_1.default.findOne({
            where: {
                short_url: shortUrl,
            },
        });
        if (!searchDb) {
            return shortUrl;
        }
        return generateRandomString();
    });
}
exports.generateRandomString = generateRandomString;
