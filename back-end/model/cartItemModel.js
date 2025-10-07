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
        products!inner(*)  // 
      `
      )
      .eq("cart_id", cartId);

    if (error) throw new Error(error.message);
    return data || [];
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

export const deleteCartItemById = async (id, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { error } = await supabase.from("cart_items").delete().eq("id", id);
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`Failed to delete Cart item: ${error.message}`);
  }
};

//cartItemModel.js
export const updateCartItemQuantity = async (id, newQuantity, accessToken) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to update Cart item: ${error.message}`);
  }
};

export const getPriceByProductId = async (productId) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("price")
      .eq("id", productId)
      .single();
    if (error) throw new Error(error.message);
    return data ? data.price : null;
  } catch (error) {
    throw new Error(`Failed to get product price: ${error.message}`);
  }
};

export const getCartItemById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("id", id);
    if (error) throw new Error(error.message);
    return data ? data[0] : null;
  } catch (error) {
    throw new Error(`Failed to get Cart item: ${error.message}`);
  }
};
