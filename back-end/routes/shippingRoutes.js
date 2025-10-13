import express from "express";
import {
  addShipping,
  getShipping,
  getAllShipping,
  deleteShipping,
  updateStatusShipping,
} from "../controller/shippingController.js";

import {
  getUserIdFromSession,
  isAdmin,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/:id", getShipping);
router.get("/", getAllShipping);
router.post("/:id", getUserIdFromSession, isAdmin, addShipping);
router.put("/:id", getUserIdFromSession, isAdmin, updateStatusShipping);
router.delete("/:id", getUserIdFromSession, isAdmin, deleteShipping);

export default router;
//shippingRoutes.js
