"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalUrlController = exports.shortenUrlController = void 0;
const url_service_1 = require("../services/url.service");
const shortenUrlController = (req, res) => {
    const originalUrl = req.body.original_url;
    const shortUrl = (0, url_service_1.generateShortUrl)(originalUrl);
    res.json({ short_url: shortUrl });
};
exports.shortenUrlController = shortenUrlController;
const originalUrlController = (req, res) => {
    const shortUrl = req.params.shortUrl;
    const originalUrl = (0, url_service_1.retrieveOriginalUrl)(shortUrl);
    if (originalUrl) {
        res.redirect(originalUrl);
    }
    else {
        res.status(404).json({ error: 'URL corta no encontrada' });
    }
};
exports.originalUrlController = originalUrlController;
