import { Request, Response } from 'express';
import { generateShortUrl, retrieveOriginalUrl } from '../services/url.service';


export const shortenUrlController = (req: Request, res: Response): void => {
    const originalUrl: string = req.body.original_url;
    const shortUrl: string = generateShortUrl(originalUrl);
    res.json({ short_url: shortUrl });
};

export const originalUrlController = (req: Request, res: Response): void => {
    const shortUrl: string = req.params.shortUrl;
    const originalUrl: string | null = retrieveOriginalUrl(shortUrl);
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: 'URL corta no encontrada' });
    }
};
