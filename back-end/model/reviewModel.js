import { supabase } from "../config/supabase.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";
export const getReviewsByProductId = async (productId) => {
  console.log("Fetching reviews for productId:", productId);
  if (!productId || productId === "undefined") {
    throw new Error("Invalid product_id: missing or 'undefined'");
  }
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, users!user_id(email)")
      .eq("product_id", productId);

    if (error) {
      throw new Error(`Error fetching reviews: ${error.message}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to get reviews: ${error.message}`);
  }
};

export const createReview = async (
  productId,
  userId,
  rating,
  comment,
  accessToken
) => {
  try {
    const supabase = createSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("reviews")
      .insert([{ product_id: productId, user_id: userId, rating, comment }])
      .select();

    if (error) {
      throw new Error(`Error creating review: ${error.message}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
};
//reviewModel.js
