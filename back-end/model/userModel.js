import { supabase } from "../config/supabase.js";

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

//userModel

export const getUsersForChat = async (currentUserRole, currentUserId) => {
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
