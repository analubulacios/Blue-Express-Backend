import express from "express";
import urlController from "../modules/controllers/url.controller";
import { auth } from "../middlewares/auth";


const router = express.Router();

router.post("/shorten", urlController.shortenUrl);

router.get("/all_urls", auth, urlController.getAllUrlsController);

router.get("/:short_url", auth, urlController.redirectToOriginalUrl);

router.delete("/:id", auth, urlController.deleteUrl);


export default router;