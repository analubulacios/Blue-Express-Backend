import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const database = process.env.DB_DATABASE || "";
const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "5432";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
  port: parseInt(port, 10),
});

export default sequelize;


// import { Sequelize } from 'sequelize';

// // Configuración de la conexión a la base de datos
// const sequelize = new Sequelize('blueexpress', 'postgres', '1987', {
//   host: '127.0.0.1',
//   dialect: 'postgres',
// });

// export default sequelize;

