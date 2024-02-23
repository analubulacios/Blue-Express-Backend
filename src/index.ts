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
      req.on("data", (chunk) => {
        data += chunk.toString();
      });
  
      req.on("end", () => {
        try {
          req.body = JSON.parse(data);
          next();
        } catch (error) {
          res.status(400).json({ error: "Invalid JSON in request body" });
        }
      });
    } else {
      next();
    }
  });

const PORT = process.env.PORT || ""; 

async function main() {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: false });

    app.use("/", Routes);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar con el servidor");
  }
}

main();