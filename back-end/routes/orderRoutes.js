import express from "express";
import { getOrder, addOrder } from "../controller/orderController.js";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/:id", getUserIdFromSession, getOrder);
router.post("", getUserIdFromSession, addOrder);
export default router;
