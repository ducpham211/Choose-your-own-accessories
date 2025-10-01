import { supabase } from "../../../src/supabaseClient";
import axios from "axios";

export const fetchReviews = async (productId) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw new Error(`Session error: ${error.message}`);
    if (!session) throw new Error("Please log in");

    const response = await axios.get(
      "http://localhost:3000/api/reviews",
      { params: { productId } },
      { headers: { Authorization: `Bearer ${session.access_token}` } }
    );
    console.log("fetch review response:", response.data);
    return response.data;
  } catch (error) {
    console.error("fetch review:", error);
    throw new Error("Failed to fetch reviews");
  }
};

export const submitReview = async (productId, rating, comment) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("Bạn cần đăng nhập để đánh giá");

    const response = await axios.post(
      "http://localhost:3000/api/reviews",
      { product_id: productId, rating, comment },
      { headers: { Authorization: `Bearer ${session.access_token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("submit review:", error);
    throw new Error("Failed to submit review");
  }
};

//reviewApi.jsx
