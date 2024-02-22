export const generateShortUrl = (originalUrl: string): string => {
    // Utilizar originalUrl en la lógica de alguna manera
    const shortUrl = 'https://bu.ex/' + originalUrl.length; // Ejemplo simple, podrías usar cualquier otra lógica
    return shortUrl;
};

export const retrieveOriginalUrl = (shortUrl: string): string | null => {
    // Utilizar shortUrl en la lógica de alguna manera
    const originalUrl = 'https://example.com/' + shortUrl.substring(0, 5); // Ejemplo simple, podrías usar cualquier otra lógica
    return originalUrl;
};
