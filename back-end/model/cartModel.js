import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";
export const getCartByUserId = async (id) => {
  try {
    const { data, error } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", id);
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No cart found for this user");
    return data;
  } catch (error) {
    throw new Error(`Failed to get Cart by user id ${error.message}`);
  }
};

export const createCart = async (id) => {
  try {
    const { data, error } = await supabase
      .from("carts")
      .insert({ user_id: id })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`failed to create cart ${error.message}`);
  }
};

export const updateCartPrice = async (cartId, newTotal, accessToken) => {
  const supabase = createSupabaseClient(accessToken);
  try {
    const { data, error } = await supabase
      .from("carts")
      .update({ total: newTotal })
      .eq("id", cartId)
      .select();
    return data;
  } catch (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }
};

export const getCartById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("carts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to get Cart by id ${error.message}`);
  }
};
//cartModel
