import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductCard } from "../services/productApi";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { addToCart } from "../../cart/services/cartApi";
import { ReviewList } from "../../review/components/ReviewList";
export const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddToCart = async () => {
    try {
      if (quantity < 1) {
        setError("Số lượng phải ít nhất là 1");
        setSuccess("");
        return;
      }

      await addToCart(id, quantity);
      setSuccess("Đã thêm sản phẩm vào giỏ hàng thành công! 🎉");
      setError("");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setError(error.message || "Có lỗi xảy ra khi thêm vào giỏ hàng");
      setSuccess("");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        console.log("Fetching product ID:", id);
        const response = await fetchProductCard(id);
        console.log("Product data:", response);
        setProduct(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-container">
        <p className="detail-loading-message">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <p className="detail-error-message">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="detail-floating-elements">
        <div className="detail-floating-dot"></div>
        <div className="detail-floating-dot"></div>
        <div className="detail-floating-dot"></div>
      </div>

      <div className="product-detail-layout">
        {/* Product Image Section */}
        <div className="detail-image-section">
          {product.image_url && (
            <img
              src={product.image_url.trim()}
              alt={product.name}
              className="detail-product-image"
            />
          )}
        </div>

        {/* Product Info Section */}
        <div className="detail-info-section">
          <div>
            <h2 className="detail-product-name">{product.name}</h2>

            <p className="detail-product-description">{product.description}</p>

            <p className="detail-product-price">
              {product.price?.toLocaleString("vi-VN")} VND
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="detail-cart-section">
            <label className="detail-quantity-label">Số lượng</label>

            <div className="detail-quantity-controls">
              <input
                type="number"
                className="detail-quantity-input"
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setQuantity(value);
                  if (error) setError(""); // Clear error when user changes quantity
                }}
                min={1}
                max={99}
                value={quantity}
                placeholder="Nhập số lượng..."
                required
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="detail-cart-btn"
              disabled={loading}
            >
              <ShoppingCart className="detail-cart-icon" size={20} />
              Thêm vào giỏ hàng
            </button>

            {/* Error Message */}
            {error && <div className="detail-error-display">⚠️ {error}</div>}

            {/* Success Message */}
            {success && (
              <div className="detail-success-message">✅ {success}</div>
            )}
          </div>

          {/* Additional Actions */}
          <div className="detail-action-buttons">
            <button className="detail-action-btn">
              <Heart size={16} />
              Yêu thích
            </button>

            <button className="detail-action-btn">
              <Share2 size={16} />
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
      <div className="product-review-section">
        <ReviewList productId={id} />
      </div>
    </div>
  );
};
//ProductCard.jsx
