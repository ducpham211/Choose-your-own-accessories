// src/config/momoConfig.js
export const momoConfig = {
  partnerCode: process.env.MOMO_PARTNER_CODE || "MOMO",
  accessKey: process.env.MOMO_ACCESS_KEY || "F8BBA842ECF85",
  secretKey: process.env.MOMO_SECRET_KEY || "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  redirectUrl:
    process.env.MOMO_REDIRECT_URL || "http://localhost:5173/momo-redirect",
  ipnUrl:
    process.env.MOMO_IPN_URL ||
    "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b",
  endpoint:
    process.env.MOMO_ENDPOINT ||
    "https://test-payment.momo.vn/v2/gateway/api/create",
};
