"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database"));
const Url = database_1.default.define("urls", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    original_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    short_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    creation_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deletion_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
});
exports.default = Url;
