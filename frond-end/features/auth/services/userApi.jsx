import axios from "axios";
import { supabase } from "../../../src/supabaseClient";
export const getUserInfo = async () => {
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
      `${import.meta.env.VITE_API_URL}/api/auth/user`,
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      }
    );
    return response.data.user;
  } catch (error) {
    throw new Error(`Failed to get user info: ${error.message}`);
  }
};
export const updateUser = async (id, fullName, address) => {
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
      `${import.meta.env.VITE_API_URL}/api/auth/user/${id}`,
      { full_name: fullName, address },
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      }
    );
    console.log("data updated from frond end : ", response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get user info: ${error.message}`);
  }
};
