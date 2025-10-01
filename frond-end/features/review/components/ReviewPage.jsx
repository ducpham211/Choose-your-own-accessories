// src/features/reviews/components/ReviewPage.jsx
import React, { useState, useEffect } from "react";
import { fetchReviews, submitReview } from "../services/reviewApi";
import { supabase } from "../../../src/supabaseClient";

export const ReviewPage = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("ReviewPage productId:", productId);
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();
  }, [productId]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        if (!productId) {
          setError("Product ID is missing");
          setLoading(false);
          return;
        }
        const data = await fetchReviews(productId);
        console.log("Fetched reviews:", data);
        setReviews(data);
      } catch (err) {
        setError("Không thể tải đánh giá");
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert("Vui lòng đăng nhập để đánh giá!");
    if (rating < 1) return alert("Vui lòng chọn đánh giá!");

    setSubmitting(true);
    try {
      const newReview = await submitReview(productId, rating, comment);
      setReviews([newReview, ...reviews]);
      const updatedReviews = await fetchReviews(productId);
      setReviews(updatedReviews);
      setComment("");
      alert("Cảm ơn bạn đã đánh giá!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1
      )
    : 0;

  if (loading) return <p className="review-loading">Đang tải đánh giá...</p>;
  if (error) return <p className="review-error">{error}</p>;

  return (
    <div className="review-section">
      <h3 className="review-title">Đánh giá sản phẩm</h3>

      {reviews.length > 0 && (
        <div className="review-avg-card">
          <p className="review-avg-text">
            Điểm trung bình:{" "}
            <span className="review-avg-score">{avgRating}</span>/5
          </p>
          <div className="review-stars-display">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`review-star-icon ${
                  star <= avgRating ? "filled" : "empty"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      )}

      <div className="review-form-container">
        <h4 className="review-form-title">Viết đánh giá của bạn</h4>
        <form onSubmit={handleSubmit}>
          <div className="review-rating-group">
            <label className="review-rating-label">Đánh giá:</label>
            <div className="review-star-buttons">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`review-star-button ${
                    star <= rating ? "selected" : "unselected"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="review-comment-group">
            <label className="review-comment-label">Nhận xét (tuỳ chọn):</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="review-comment-textarea"
              rows="3"
              placeholder="Chia sẻ trải nghiệm của bạn..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="review-submit-button"
          >
            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      </div>

      <div>
        {reviews.length === 0 ? (
          <p className="review-list-empty">Chưa có đánh giá nào.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-author">
                    {review.users?.email || "Ẩn danh"}
                  </span>
                  <div className="review-stars-small">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`review-star-small ${
                          i < review.rating ? "filled" : "empty"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="review-comment-text">
                  {review.comment || "Không có nhận xét."}
                </p>
                <p className="review-date">
                  {new Date(review.created_at).toLocaleDateString("vi-VN")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
//ReviewPage.jsx
