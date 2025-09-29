import { createSupabaseClient } from "./supabaseClient.js";

export const isAdmin = async (accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user) return false;

    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.user.id)
      .single();

    if (dbError || !userData) return false;

    return userData.role === "admin";
  } catch {
    return false;
  }
};
