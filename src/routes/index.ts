import express from "express";
import urlRoutes from "./urls";
import userRoutes from "./user";
import statsRoutes from "./stats";

const router = express.Router();

router.use("/urls", urlRoutes);

router.use("/user", userRoutes);

router.use("/stats", statsRoutes);

export default router;