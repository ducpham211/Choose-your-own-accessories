// src/controller/momoController.js
import { createMomoPayment } from "../model/momoModel.js";

export const createPayment = async (req, res) => {
  try {
    const { amount, orderInfo } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentResult = await createMomoPayment({ amount, orderInfo });
    console.log("payment created from controller : ", paymentResult);
    res.status(200).json(paymentResult);
  } catch (error) {
    console.error("MoMo payment error:", error);
    res.status(500).json({ error: "Failed to create MoMo payment" });
  }
};
