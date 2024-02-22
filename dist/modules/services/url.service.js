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
const urlGenerator_1 = require("../../utils.ts/urlGenerator");
const url_model_1 = __importDefault(require("../models/url.model"));
class UrlService {
    createShortUrl(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shortUrl = `https://bu.ex/${(0, urlGenerator_1.generateRandomString)()}`;
                const createdUrl = yield url_model_1.default.create({
                    original_url: body.original_url,
                    short_url: shortUrl,
                });
                return createdUrl;
            }
            catch (error) {
                throw new Error("No se pudo crear la URL");
            }
        });
    }
    // async findUrlByShortUrl(dto: GetShortenUrlDto) {
    //   try {
    //     const urls = await Url.findAll();
    //     return urls;
    //   } catch (error) {
    //     throw new Error("No se pudo obtener las URLS");
    //   }
    // }
    deleteUrlById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield url_model_1.default.destroy({
                where: { id },
            });
        });
    }
}
exports.default = new UrlService();
