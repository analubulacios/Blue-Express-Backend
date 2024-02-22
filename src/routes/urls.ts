import express from 'express';
import { originalUrlController, shortenUrlController } from '../modules/controllers/url.controller';


const router = express.Router();

// Generación de URL Corta
router.post('/shorten', shortenUrlController);

// Recuperación de URL Original
router.get('/original/:shortUrl', originalUrlController);

export default router;
