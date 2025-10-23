import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";

export const getUserById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to get user :${error.message}`);
  }
};

export const getUsersForChat = async (currentUserRole) => {
  try {
    let query = supabase.from("users").select("id, email");

    if (currentUserRole === "admin") {
      query = query.neq("role", "admin");
    } else {
      // Customer: chỉ lấy admin
      query = query.eq("role", "admin");
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Failed to fetch chat users:", error.message);
    throw new Error("Failed to fetch users");
  }
};

export const updateUserInfor = async (id, fullName, address, accessToken) => {
  const supabase = createSupabaseClient(accessToken);
  console.log("UID from token:", id);
  console.log("full_name : ", fullName);
  console.log("address : ", address);
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ full_name: fullName, address: address })
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    console.log("updated users data : ", data);
    return data;
  } catch (error) {
    console.error("Failed to update users:", error.message);
    throw new Error("Failed to update users");
  }
};
//userModel
