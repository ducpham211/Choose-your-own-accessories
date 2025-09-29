import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";

export const createOrderItem = async (
  orderId,
  productId,
  quantity,
  price,
  accessToken
) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("order_items")
      .insert([{ order_id: orderId, product_id: productId, quantity, price }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to create order item: ${error.message}`);
  }
};

//orderItemModel
