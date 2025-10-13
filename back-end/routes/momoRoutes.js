// src/routes/momoRoutes.js
import express from "express";
import { createPayment } from "../controller/momoController.js";

const router = express.Router();

router.post("/", createPayment);

export default router;
