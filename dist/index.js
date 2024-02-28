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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    if (req.method === "POST" || req.method === "DELETE") {
        let data = "";
        if (req.readable) {
            req.on("data", (chunk) => {
                data += chunk.toString();
            });
            req.on("end", () => {
                try {
                    if (data) {
                        req.body = JSON.parse(data);
                    }
                    next();
                }
                catch (error) {
                    res.status(400).json({ error: "Invalid JSON in request body" });
                }
            });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});
const PORT = process.env.PORT || 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.authenticate();
            // Synchronize the models with the database
            yield database_1.default.sync({ force: false });
            app.use("/", index_1.default);
            app.listen(PORT, () => {
            });
        }
        catch (error) {
            console.error("No se pudo conectar con el servidor", error);
        }
    });
}
main();
