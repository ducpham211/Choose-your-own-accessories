import axios from "axios";
import { supabase } from "../../../src/supabaseClient";
export const fetchShipping = async (id) => {
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
    const response = await axios.get(
      `http://localhost:3000/api/shipping/${id}`,
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

export const updateStatus = async (id, newStatus) => {
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
    const response = await axios.put(
      `http://localhost:3000/api/shipping/${id}`,
      { newStatus },
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
