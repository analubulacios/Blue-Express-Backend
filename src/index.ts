import express from 'express';
import urlRouter from './routes/urls';
import sequelize from './sequelize'; 
// import Url from './modules/models/url.model';// Importa el modelo Url
// import User from './modules/models/user.model'; // Importa el modelo User

const app = express()

app.use(express.json())

const PORT = 5003

app.get("/ping", (_req, res) => {
    console.log("Veamos si llega algo");
    res.send("pong");
  });

app.use('/api', urlRouter);

// Conecta con la base de datos utilizando Sequelize
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
        return sequelize.sync({ force: true }); // Sincroniza los modelos con la base de datos
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