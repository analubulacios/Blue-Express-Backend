import express from "express";
import urlRoutes from "./urls"
import userRoutes from "./user"

const router = express.Router();

router.use("/urls", urlRoutes);

router.use("/user", userRoutes);

export default router;