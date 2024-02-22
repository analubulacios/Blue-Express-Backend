"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/user.model.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database")); // Importa la instancia de Sequelize
const url_model_1 = __importDefault(require("./url.model"));
class User extends sequelize_1.Model {
}
User.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id',
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // El correo electrónico debe ser único
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default, // Conecta el modelo con la instancia de Sequelize
    modelName: 'User', // Nombre del modelo
});
// Definir la relación uno a muchos con el modelo Url
User.hasMany(url_model_1.default, { foreignKey: 'userId' });
exports.default = User;
