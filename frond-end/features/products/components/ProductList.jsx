// ProductList.jsx
import { Link } from "react-router-dom";
export const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Đang tải sản phẩm...</p>
      </div>
    );
  }
  return (
    <div>
      <section className="products-section">
        <div className="products-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card"
            >
              {/* Sale Badge */}
              <div className="sale-badge">-50%</div>

              {/* Product Image */}
              <div className="product-image-wrapper">
                <img
                  src={product.image_url?.trim() || "/placeholder.png"}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
                <div className="product-overlay">
                  <button className="quick-view-btn">👁️ Xem Nhanh</button>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-count">(128)</span>
                </div>

                <div className="product-footer">
                  <div className="product-prices">
                    <span className="product-price-old">
                      {(product.price * 2).toLocaleString()} ₫
                    </span>
                    <span className="product-price">
                      {product.price.toLocaleString()} ₫
                    </span>
                  </div>
                  <button className="add-to-cart-btn">🛒</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
