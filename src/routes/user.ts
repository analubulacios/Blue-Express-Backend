import express from "express";
import userController from "../modules/controllers/user.controller";


const router = express.Router();

router.post("/user", userController.createUser);

export default router;