import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProductList } from "../services/productApi";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductList();
        console.log("Product data:", response);
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) return <p className="loading-text">Loading Products...</p>;

  // ProductList.jsx — GIỮ NGUYÊN PHẦN JS, CHỈ THÊM CHỮ TRÊN DECAL
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">FitZone</h2>

      <div className="product-decal">
        <div className="decal-content">
          <div className="decal-title">Mega Sale</div>
          <div className="decal-subtitle">Ưu đai khủng - Mua ngay kẻo lỡ</div>
          <div className="decal-discount">50% OFF</div>
        </div>

        {/* Floating decorative elements */}
        <div className="floating-icon" style={{ fontSize: "24px" }}>
          🎉
        </div>
        <div className="floating-icon" style={{ fontSize: "20px" }}>
          ✨
        </div>
        <div className="floating-icon" style={{ fontSize: "18px" }}>
          🔥
        </div>

        {/* Sparkle effects */}
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>

        {/* Sliding promotional text */}
        <div className="sliding-text">
          🚀 FREESHIP TOÀN QUỐC - GIẢM GIÁ ĐẾN 70% - MUA 1 TẶNG 1 🚀
        </div>

        {/* Optional countdown timer */}
        <div className="countdown-timer">⏰ 02:45:30</div>
      </div>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/products/${product.id}`} className="product-link">
              <div className="product-image-wrapper">
                <img
                  src={product.image_url?.trim() || "/placeholder.png"}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                {product.price.toLocaleString()} VND
              </p>
              <p className="product-description">{product.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
