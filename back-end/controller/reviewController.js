import { getReviewsByProductId, createReview } from "../model/reviewModel.js";

export const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params.productId ? req.params : req.query;
  console.log("Product ID from params:", productId);
  try {
    const reviews = await getReviewsByProductId(productId);
    console.log("reviews fetched : ", reviews);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export const addReview = async (req, res) => {
  const { product_id } = req.body;
  console.log("Product ID ", product_id);
  const { rating, comment } = req.body;
  console.log("Review data from body:", { rating, comment });
  const userId = req.userId;
  const accessToken = req.accessToken;
  console.log("User ID from auth middleware:", userId);
  try {
    const review = await createReview(
      product_id,
      userId,
      rating,
      comment,
      accessToken
    );
    console.log("review created:", review);
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

//reviewController.js
