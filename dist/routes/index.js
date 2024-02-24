"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urls_1 = __importDefault(require("./urls"));
const user_1 = __importDefault(require("./user"));
const stats_1 = __importDefault(require("./stats"));
const router = express_1.default.Router();
router.use("/urls", urls_1.default);
router.use("/user", user_1.default);
router.use("/stats", stats_1.default);
exports.default = router;
