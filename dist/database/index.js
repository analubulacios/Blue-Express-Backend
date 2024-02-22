"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Configuración de la conexión a la base de datos
const sequelize = new sequelize_1.Sequelize('blueexpress', 'postgres', '1987', {
    host: '127.0.0.1',
    dialect: 'postgres',
});
exports.default = sequelize;
