import express from "express";
import urlRoutes from "./urls"

const router = express.Router();

router.use("/urls", urlRoutes);

export default router;