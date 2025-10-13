// src/model/momoModel.js
import crypto from "crypto";
import axios from "axios";
import { momoConfig } from "../config/momo.js";

export const createMomoPayment = async (paymentData) => {
  const {
    amount,
    orderInfo = "pay with MoMo",
    extraData = "",
    orderGroupId = "",
    autoCapture = true,
    lang = "vi",
  } = paymentData;

  const orderId = momoConfig.partnerCode + new Date().getTime();
  const requestId = orderId;

  // Tạo raw signature
  const rawSignature =
    `accessKey=${momoConfig.accessKey}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&ipnUrl=${momoConfig.ipnUrl}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&partnerCode=${momoConfig.partnerCode}` +
    `&redirectUrl=${momoConfig.redirectUrl}` +
    `&requestId=${requestId}` +
    `&requestType=payWithMethod`;

  // Tạo chữ ký HMAC SHA256
  const signature = crypto
    .createHmac("sha256", momoConfig.secretKey)
    .update(rawSignature)
    .digest("hex");

  // Dữ liệu gửi đến MoMo
  const requestBody = {
    partnerCode: momoConfig.partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl: momoConfig.redirectUrl,
    ipnUrl: momoConfig.ipnUrl,
    lang,
    requestType: "payWithMethod",
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  };

  try {
    const response = await axios.post(momoConfig.endpoint, requestBody, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`MoMo API error: ${error.message}`);
  }
};
