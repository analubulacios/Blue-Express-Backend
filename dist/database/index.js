"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = process.env.DB_DATABASE || "";
console.log("database------>", database);
const username = process.env.DB_USERNAME || "";
console.log("username----->", username);
const password = process.env.DB_PASSWORD || "";
console.log("password----->", password);
const host = process.env.DB_HOST || "localhost";
console.log("host----->", host);
const port = process.env.DB_PORT || "5432";
console.log("port----->", port);
const sequelize = new sequelize_typescript_1.Sequelize(database, username, password, {
    host: host,
    dialect: "postgres",
    port: parseInt(port, 10),
});
exports.default = sequelize;
// import { Sequelize } from 'sequelize';
// // Configuración de la conexión a la base de datos
// const sequelize = new Sequelize('blueexpress', 'postgres', '1987', {
//   host: '127.0.0.1',
//   dialect: 'postgres',
// });
// export default sequelize;
