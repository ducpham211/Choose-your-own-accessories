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

export const getOrderItems = async (orderId) => {
  try {
    const { data: orderItemData, error } = await supabase
      .from("order_items")
      .select(
        `
        *,
        products (
          name,
          image_url
        )
      `
      )
      .eq("order_id", orderId);
    if (error) throw new Error(error.message);
    console.log("order_items fetched : ", orderItemData);
    const { data: shippingData, error: shippingError } = await supabase
      .from("shipping")
      .select("*")
      .eq("order_id", orderId);

    if (shippingError) throw new Error(shippingError.message);
    console.log("shipping fetched : ", shippingData);
    return { orderItemData, shipping: shippingData || null };
  } catch (error) {
    throw new Error(`Failed to create order item: ${error.message}`);
  }
};
//orderItemModel
