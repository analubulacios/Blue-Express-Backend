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
const url_service_1 = __importDefault(require("../services/url.service"));
class UrlController {
    shortenUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req body -----------", req.body);
                if (!req.body || !req.body.original_url) {
                    return res
                        .status(400)
                        .json({ error: "Cuerpo de la solicitud no válido" });
                }
                const url = yield url_service_1.default.createShortUrl(req.body);
                console.log("req url -----------", url);
                res.status(201).json(url);
            }
            catch (error) {
                console.error("Error al crear la URL en la base de datos:", error);
                res.status(500).json({ error: "Error al acortar la URL" });
            }
        });
    }
    redirectToOriginalUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Solicitud de URL corta recibida:", req.params.short_url);
                const url = yield url_service_1.default.findUrlByShortUrl(req.params);
                console.log("Veamos que me trae de mi base de datos", url);
                if (!url) {
                    return res.status(404).json({ error: "URL corta no encontrada" });
                }
                return res.redirect(url.original_url);
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "Error al obtener la URL original: " + error });
            }
        });
    }
    // Funciona
    getAllUrlsController(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urls = yield url_service_1.default.getAllUrls();
                res.status(200).json(urls);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error al obtener las URLs" });
            }
        });
    }
    // Funciona
    deleteUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield url_service_1.default.deleteUrlById(id);
                res.status(204).send();
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error al eliminar la URL" });
            }
        });
    }
}
exports.default = new UrlController();
