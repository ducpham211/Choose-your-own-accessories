import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";

export const getOrderById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to get order by id ${error.message}`);
  }
};

export const createOrder = async (userId, totalPrice, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("orders")
      .insert([
        { user_id: userId, total_price: totalPrice, status: "completed" },
      ])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to create order ${error.message}`);
  }
};

export const updateOrderPrice = async (orderId, newTotal, accessToken) => {
  const supabase = createSupabaseClient(accessToken);
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ total_price: newTotal })
      .eq("id", orderId)
      .select();
    return data;
  } catch (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }
};

export const getOrdersById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", id);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to get order by id ${error.message}`);
  }
};
//orderModel
