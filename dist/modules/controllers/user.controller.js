"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const generateToken_1 = require("../../utils.ts/generateToken");
const url_model_1 = __importDefault(require("../models/url.model"));
const sequelize_1 = require("sequelize");
class UserController {
    login(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, localURLs } = req.body;
                const [user, created] = yield user_model_1.default.findOrCreate({ where: { email } });
                const userId = user.getDataValue('user_id');
                const localIds = (_a = localURLs === null || localURLs === void 0 ? void 0 : localURLs.map((u) => u.url_id)) !== null && _a !== void 0 ? _a : [];
                yield url_model_1.default.update({ "user_id": userId }, {
                    where: {
                        "user_id": null,
                        "url_id": {
                            [sequelize_1.Op.in]: localIds
                        },
                    }
                });
                const token = (0, generateToken_1.generateToken)(userId);
                return res.status(created ? 201 : 200).json({ userId, token });
            }
            catch (error) {
                return res.status(500).json({ error: "We could not create the user" });
            }
        });
    }
}
exports.default = new UserController();
