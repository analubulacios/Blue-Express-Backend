"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = process.env.DB_DATABASE || "";
const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "5432";
// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   dialect: "postgres",
//   port: parseInt(port, 10),
// });
const sequelize = new sequelize_typescript_1.Sequelize(database, username, password, {
    host: host,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    port: parseInt(port, 10),
});
exports.default = sequelize;
