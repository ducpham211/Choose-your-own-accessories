// src/features/admin/services/adminApi.js
import axios from "axios";
import { supabase } from "../../../src/supabaseClient";
export const fetchAdminStats = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    const response = await axios.get("http://localhost:3000/api/admin/stats", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    console.log("data from admin page : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    throw new Error(
      `Failed to load admin data: ${
        error.response?.data?.error || error.message
      }`
    );
  }
};
//adminApi
