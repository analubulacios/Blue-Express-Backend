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

// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   dialect: "postgres",
// dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//      },
//   port: parseInt(port, 10),
// });

export default sequelize;


