import { supabase } from "../config/supabase";
import { createSupabaseClient } from "../utils/supabaseClient";
export const createShipping = async (orderId, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("shipping")
      .insert([{ order_id: orderId }]);
    if (error) throw new Error(error.message);
    console.log("shipping created : ", data);
    return data;
  } catch (error) {
    throw new Error(`Failed to create shipping : ${error.message}`);
  }
};

export const updateStatusShipping = async (orderId, newStatus, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("shipping")
      .update({ status: newStatus })
      .eq("order_id", orderId)
      .select();
    if (error) throw new Error(error.message);
    console.log("status after updated : ", data);
    return data;
  } catch (error) {
    throw new Error(`Failed to update shipping : ${error.message}`);
  }
};

export const deleteShipping = async (orderId, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("shipping")
      .delete()
      .eq("order_id", orderId);
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`Failed to update shipping : ${error.message}`);
  }
};
export const getShippingOrderId = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from("shipping")
      .select()
      .eq("order_id", orderId)
      .single();
    if (error) throw new Error(error.message);
    console.log("get shipping by id : ", data);
    return data;
  } catch (error) {
    throw new Error(`Failed to get shipping by id : ${error.message}`);
  }
};

export const getAllShippings = async () => {
  try {
    const { data, error } = await supabase
      .from("shipping")
      .select()
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    console.log("get all shipping : ", data);
    return data;
  } catch (error) {
    throw new Error(`Failed to get shipping by id : ${error.message}`);
  }
};
