"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urls_1 = __importDefault(require("./routes/urls"));
const database_1 = __importDefault(require("./database"));
// import Url from './modules/models/url.model';// Importa el modelo Url
// import User from './modules/models/user.model'; // Importa el modelo User
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 5003;
app.get("/ping", (_req, res) => {
    console.log("Veamos si llega algo");
    res.send("pong");
});
app.use('/api', urls_1.default);
// Conecta con la base de datos utilizando Sequelize
database_1.default.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    return database_1.default.sync({ force: true }); // Sincroniza los modelos con la base de datos
})
    .then(() => {
    console.log('Tablas creadas exitosamente.');
})
    .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
