import { supabase } from "../../src/supabaseClient";
import axios from "axios";
export const momoPayment = async (total) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log("Access Token in fetchCart:", session?.access_token);
    if (error) {
      console.error("getSession error in fetchCart:", error.message, error);
      throw new Error(`Cannot get session: ${error.message}`);
    }
    if (!session) throw new Error("Please log in");
    const response = await axios.post(
      "http://localhost:3000/api/payment",
      { amount: total, orderInfo: "Thanh toán đơn hàng từ giỏ hàng" },
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("fetchCart unexpected error:", error.message, error);
    throw new Error(error.response?.data?.error || "Failed to fetch cart");
  }
};
