"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveOriginalUrl = exports.generateShortUrl = void 0;
const generateShortUrl = (originalUrl) => {
    // Utilizar originalUrl en la lógica de alguna manera
    const shortUrl = 'https://bu.ex/' + originalUrl.length; // Ejemplo simple, podrías usar cualquier otra lógica
    return shortUrl;
};
exports.generateShortUrl = generateShortUrl;
const retrieveOriginalUrl = (shortUrl) => {
    // Utilizar shortUrl en la lógica de alguna manera
    const originalUrl = 'https://example.com/' + shortUrl.substring(0, 5); // Ejemplo simple, podrías usar cualquier otra lógica
    return originalUrl;
};
exports.retrieveOriginalUrl = retrieveOriginalUrl;
