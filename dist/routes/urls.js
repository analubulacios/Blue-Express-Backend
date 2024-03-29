"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_controller_1 = __importDefault(require("../modules/controllers/url.controller"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/shorten", url_controller_1.default.shortenUrl);
router.get("/all_urls", auth_1.auth, url_controller_1.default.getAllUrlsController);
router.get("/:short_url", url_controller_1.default.redirectToOriginalUrl);
router.delete("/:id", auth_1.auth, url_controller_1.default.deleteUrl);
exports.default = router;
