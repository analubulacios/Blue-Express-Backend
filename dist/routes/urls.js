"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_controller_1 = require("../modules/controllers/url.controller");
const router = express_1.default.Router();
// Generación de URL Corta
router.post('/shorten', url_controller_1.shortenUrlController);
// Recuperación de URL Original
router.get('/original/:shortUrl', url_controller_1.originalUrlController);
exports.default = router;
