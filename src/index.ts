import express from "express";
import sequelize from "./database";
import Routes from "./routes/index";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); 

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
        } catch (error) {
          res.status(400).json({ error: "Invalid JSON in request body" });
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3000; 

async function main() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("ADVERTENCIA: No se ha especificado una base de datos. El servidor continuará ejecutándose sin conexión a la base de datos.");
    } else {
    await sequelize.authenticate();

// Synchronize the models with the database
    await sequelize.sync({ force: false });
  } 
    app.use("/", Routes);

    app.listen(PORT, () => {
    });

  } catch (error) {
    console.error("No se pudo conectar con el servidor", error);
  }
}

main();