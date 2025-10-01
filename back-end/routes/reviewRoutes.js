import express from "express";
import {
  getReviewsByProduct,
  addReview,
} from "../controller/reviewController.js";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", getReviewsByProduct);
router.post("/", getUserIdFromSession, addReview);

export default router;
//reviewRoutes.js
