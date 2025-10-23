import { getUser } from "../controller/authController.js";
import { fetchAdmins } from "../controller/authController.js";
import express from "express";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";
import { updateInfor } from "../controller/userController.js";

const router = express.Router();

router.get("/user", getUserIdFromSession, getUser);
router.get("/user/admin", getUserIdFromSession, fetchAdmins);
router.put("/user", getUserIdFromSession, updateInfor);
export default router;
