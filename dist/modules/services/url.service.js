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
    createShortUrl(body, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // This measures the time taken for URL shortening
                // const startTime = new Date().getTime(); // Captures the start time
                // Your code for URL shortening goes here
                // const endTime = new Date().getTime(); // Captures the end time
                // const elapsedTimeInSeconds = (endTime - startTime) / 1000; // Calculates the elapsed time in seconds
                // console.log(`The short URL was generated in ${elapsedTimeInSeconds} seconds.`);
                const shortUrl = yield (0, urlGenerator_1.generateRandomString)(process.env.DOMAIN);
                const createdUrl = yield url_model_1.default.create({
                    original_url: body.original_url,
                    short_url: shortUrl,
                    clicks: 0,
                    user_id: user_id,
                });
                return createdUrl;
            }
            catch (error) {
                throw new Error("Could not create URL");
            }
        });
    }
    findUrlByShortUrl(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { short_url } = dto;
                let url = yield url_model_1.default.findOne({
                    where: {
                        short_url: short_url,
                    },
                });
                if (!url) {
                    throw new Error("URL not found in the database.");
                }
                if (url) {
                    yield url.increment('clicks', { by: 1 });
                }
                return url === null || url === void 0 ? void 0 : url.dataValues.original_url;
            }
            catch (error) {
                throw new Error("Could not get URL:" + error);
            }
        });
    }
    getAllUrls(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urls = yield url_model_1.default.findAll({
                    where: {
                        user_id,
                    },
                });
                if (urls.length === 0) {
                    throw new Error("No URLs were found for the given user.");
                }
                return urls;
            }
            catch (error) {
                throw new Error("There are no short or long urls" + error);
            }
        });
    }
    deleteUrlById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield url_model_1.default.findByPk(id);
                if (!url) {
                    throw new Error("URL not found");
                }
                yield url.destroy();
            }
            catch (error) {
                throw new Error("Error deleting URL");
            }
        });
    }
}
exports.default = new UrlService();
