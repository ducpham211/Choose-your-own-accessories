import axios from "axios";
import { supabase } from "../../../src/supabaseClient";

export const fetchCart = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log("Access Token in fetchCart:", session?.access_token);
    if (error) {
      console.error("getSession error in fetchCart:", error.message, error);
      throw new Error(`Cannot get session: ${error.message}`);
    }
    if (!session) throw new Error("Please log in");
    const response = await axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error("fetchCart unexpected error:", error.message, error);
    throw new Error(error.response?.data?.error || "Failed to fetch cart");
  }
};

export const fetchCartItems = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log("Access Token in fetchCart:", session?.access_token);
    if (error) {
      console.error("getSession error in fetchCart:", error.message, error);
      throw new Error(`Cannot get session: ${error.message}`);
    }
    if (!session) throw new Error("Please log in");
    const response = await axios.get("http://localhost:3000/api/cart/items", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error("fetchCart unexpected error:", error.message, error);
    throw new Error(
      error.response?.data?.error || "Failed to fetch cart items"
    );
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log("Access Token in addToCart:", session?.access_token);
    if (error) {
      console.error("getSession error in addToCart:", error.message, error);
      throw new Error(`Cannot get session: ${error.message}`);
    }
    if (!session) throw new Error("Please log in");
    const response = await axios.post(
      "http://localhost:3000/api/cart/items",
      {
        product_id: productId,
        quantity,
      },
      { headers: { Authorization: `Bearer ${session.access_token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("addToCart unexpected error:", error.message, error);
    throw new Error(error.response?.data?.error || "Failed to add cart items");
  }
};

export const removeCartItem = async (id) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log("Access Token in removeCartItem:", session?.access_token);
    if (error) {
      console.error(
        "getSession error in removeCartItem:",
        error.message,
        error
      );
      throw new Error(`Cannot get session: ${error.message}`);
    }
    if (!session) throw new Error("Please log in");
    const response = await axios.delete(
      `http://localhost:3000/api/cart/items/${id}`,
      { headers: { Authorization: `Bearer ${session.access_token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("remove cart item unexpected error:", error.message, error);
    throw new Error(
      error.response?.data?.error || "Failed to remove cart item"
    );
  }
};
//cartApi
export const updateCartQuantity = async (id, newQuantity) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log("Access Token in updateCartQuantity:", session?.access_token);
    if (error) {
      console.error(
        "getSession error in updateCartQuantity:",
        error.message,
        error
      );
      throw new Error(`Cannot get session: ${error.message}`);
    }
    if (!session) throw new Error("Please log in");
    const response = await axios.put(
      `http://localhost:3000/api/cart/items/${id}`,
      { quantity: newQuantity },
      { headers: { Authorization: `Bearer ${session.access_token}` } }
    );
    console.log("Update quantity response:", response.data); // Thêm log response
    return response.data;
  } catch (error) {
    console.error(
      "Update quantity unexpected error:",
      error.message,
      error.response?.data
    ); // Log error chi tiết từ backend
    throw new Error(
      error.response?.data?.error || "Failed to update cart item quantity"
    );
  }
};
