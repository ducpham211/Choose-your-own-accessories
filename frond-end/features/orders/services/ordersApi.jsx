import { useState, useEffect } from "react";
import { supabase } from "../../../src/supabaseClient";
import axios from "axios";

// cartApi.jsx
export const checkoutCart = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw new Error(`Session error: ${error.message}`);
    if (!session) throw new Error("Please log in");

    const response = await axios.post(
      "http://localhost:3000/api/order",
      {},
      { headers: { Authorization: `Bearer ${session.access_token}` } }
    );
    return response.data.order;
  } catch (error) {
    console.error("Checkout failed:", error);
    throw new Error(
      error.response?.data?.error || "Failed to complete checkout"
    );
  }
};
//ordersApi.jsx
