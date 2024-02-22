import express from 'express';
import urlRouter from './routes/urls';

const app = express()

app.use(express.json())

const PORT = 5003

app.get("/ping", (_req, res) => {
    console.log("Veamos si llega algo");
    res.send("pong");
  });

app.use('/api', urlRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });