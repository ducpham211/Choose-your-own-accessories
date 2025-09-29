import express from "express";
import {
  getProduct,
  getProducts,
  createNewProduct,
} from "../controller/productController.js";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("", getUserIdFromSession, createNewProduct);

export default router;
