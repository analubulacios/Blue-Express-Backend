"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database"));
const url_model_1 = __importDefault(require("./url.model"));
const User = database_1.default.define("users", {
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
});
User.hasMany(url_model_1.default, { foreignKey: "user_id" });
url_model_1.default.belongsTo(User, { foreignKey: "user_id" });
exports.default = User;
