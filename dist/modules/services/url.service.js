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
    createShortUrl(body, request_ip, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shortUrl = yield (0, urlGenerator_1.generateRandomString)();
                const createdUrl = yield url_model_1.default.create({
                    original_url: body.original_url,
                    short_url: shortUrl,
                    request_ip: request_ip,
                    user_id: user_id,
                });
                return createdUrl;
            }
            catch (error) {
                throw new Error("No se pudo crear la URL");
            }
        });
    }
    // agregar en cada redireccion un + 1 en click
    //buscar metodo incremet (SEQUELIZE) 
    findUrlByShortUrl(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { short_url } = dto;
                const url = yield url_model_1.default.findOne({
                    where: {
                        short_url: short_url,
                    },
                });
                return url === null || url === void 0 ? void 0 : url.dataValues;
            }
            catch (error) {
                console.error(error);
                throw new Error("No se pudo obtener la URL: " + error);
            }
        });
    }
    getAllUrls() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urls = yield url_model_1.default.findAll({});
                return urls;
            }
            catch (error) {
                console.error(error);
                throw new Error("No hay urls ni cortas ni largas " + error);
            }
        });
    }
    deleteUrlById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield url_model_1.default.findByPk(id);
                if (!url) {
                    throw new Error("URL no encontrada");
                }
                yield url.destroy();
            }
            catch (error) {
                console.error(error);
                throw new Error("Error al eliminar la URL");
            }
        });
    }
}
exports.default = new UrlService();
