import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";

export const createCartItem = async (cartId, productId, quantity) => {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .insert([{ cart_id: cartId, product_id: productId, quantity }])
      .select();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to create Cart item: ${error.message}`);
  }
};

// cartItemModel.js
export const getCartItemByCartId = async (cartId) => {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        *,
        products!inner(*)  // 👈 join với bảng products
      `
      )
      .eq("cart_id", cartId);

    if (error) throw new Error(error.message);
    return data || []; // Trả về mảng cart items, mỗi item có product nhúng vào
  } catch (error) {
    throw new Error(`Failed to get cart items with products: ${error.message}`);
  }
};

export const deleteCartItemsByCartId = async (cartId, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cartId);
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`Failed to delete Cart item: ${error.message}`);
  }
};
//cartItemModel.js
