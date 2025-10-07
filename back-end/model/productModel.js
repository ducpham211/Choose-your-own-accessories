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

export const searchProducts = async (query) => {
  if (!query) return [];

  console.log(`Executing search for query: ${query}`);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${query}%`)
    .limit(8);

  if (error) {
    console.error(`Supabase error: ${error.message}`);
    throw new Error(error.message);
  }

  console.log(`Products found: ${JSON.stringify(data)}`);
  return data || [];
};

//productModel.js
export const getShoes = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", "%Giày%")
      .limit(8);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};

export const getShirts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", "%Áo%")
      .limit(8);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};

export const getAccessories = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .not("name", "ilike", "%Giày%")
      .not("name", "ilike", "%Áo%")
      .limit(8);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};
