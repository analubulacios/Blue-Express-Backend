import express from "express";
import urlController from "../modules/controllers/url.controller";


const router = express.Router();

router.post("/shorten", urlController.shortenUrl);

router.get("/:short_url", urlController.redirectToOriginalUrl);

router.delete("/:id", urlController.deleteUrl);

export default router;