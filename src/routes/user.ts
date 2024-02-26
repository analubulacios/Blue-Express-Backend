import express from "express";
import userController from "../modules/controllers/user.controller";


const router = express.Router();
router.post("/login", userController.login);

export default router;