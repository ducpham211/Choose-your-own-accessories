import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";
export const createShipping = async (id, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("shipping")
      .insert([{ order_id: id }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    console.log("shipping created : ", data);
    return data;
  } catch (error) {
    throw new Error(`Failed to create shipping : ${error.message}`);
  }
};

export const updateStatus = async (shippingId, newStatus, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("shipping")
      .update({ status: newStatus })
      .eq("order_id", shippingId)
      .select();
    if (error) throw new Error(error.message);
    console.log("status after updated : ", data);
    return data;
  } catch (error) {
    throw new Error(`Failed to update shipping : ${error.message}`);
  }
};
//shippingModel.jsx

export const deleteShippingById = async (id, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("shipping")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`Failed to update shipping : ${error.message}`);
  }
};
export const getShippingByOrderId = async (id) => {
  try {
    const { data, error } = await supabase
      .from("shipping")
      .select()
      .eq("order_id", id);
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
    throw new Error(`Failed to get all shipping : ${error.message}`);
  }
};
//shippingModel
