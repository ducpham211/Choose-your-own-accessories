import { getUser } from "../controller/authController.js";
import express from "express";

const router = express.Router();

router.get("/user", getUser);

export default router;

//authRoutes
