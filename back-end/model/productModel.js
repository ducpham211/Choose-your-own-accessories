import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";

export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to get products by id : ${error.message}`);
  }
};

export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(` ${error.messageS}`);
  }
};

// productModel.js

export const createProduct = async (
  name,
  description,
  price,
  image_url,
  stock,
  category,
  accessToken
) => {
  try {
    const supabase = createSupabaseClient(accessToken);

    const { data, error } = await supabase
      .from("products")
      .insert([{ name, description, price, image_url, stock, category }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};
