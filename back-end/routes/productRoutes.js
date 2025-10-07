import express from "express";
import {
  getProduct,
  getProducts,
  createNewProduct,
  searchAccessories,
  searchShirts,
  searchShoes,
} from "../controller/productController.js";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";
import { searchProductsHandler } from "../controller/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProductsHandler);
router.get("/shoes", searchShoes);
router.get("/shirts", searchShirts);
router.get("/accessories", searchAccessories);
router.get("/:id", getProduct);
router.post("", getUserIdFromSession, createNewProduct);

export default router;
