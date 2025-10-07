import { getUser } from "../controller/authController.js";
import { fetchAdmins } from "../controller/authController.js";
import express from "express";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/user", getUserIdFromSession, getUser);
router.get("/user/admin", getUserIdFromSession, fetchAdmins);
export default router;

//userRoutes
