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
                if (!req.body || !req.body.original_url) {
                    return res
                        .status(400)
                        .json({ error: "Cuerpo de la solicitud no válido" });
                }
                const url = yield url_service_1.default.createShortUrl(req.body);
                res.status(201).json(url);
            }
            catch (error) {
                res.status(500).json({ error: "Error al acortar la URL" });
            }
        });
    }
    // async redirectToOriginalUrl(req: any, res: any) {
    //   try {
    //     console.log("Veamos que es lo que llega, req.params");
    //     const url = await urlsService.findUrlByShortUrl(req.params);
    //     if (!url) {
    //       return res.status(404).json({ error: "URL corta no encontrada" });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Error al obtener la URL original" });
    //   }
    // }
    deleteUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Aquí podrías verificar si el usuario tiene permisos para eliminar la URL
                const deletedUrl = yield url_service_1.default.deleteUrlById(id);
                if (!deletedUrl) {
                    return res.status(404).json({ error: "URL no encontrada" });
                }
                res.status(204).end();
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error al eliminar la URL" });
            }
        });
    }
}
exports.default = new UrlController();
