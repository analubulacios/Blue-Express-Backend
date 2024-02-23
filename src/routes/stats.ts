import express from "express";
import statsController from "../modules/controllers/stats.controller";


const router = express.Router();

router.post("/stats", statsController.createStat);

export default router;