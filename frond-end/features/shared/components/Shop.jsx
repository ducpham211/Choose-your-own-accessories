// Shop.jsx
import React from "react";

export const Shop = () => {
  const categories = [
    {
      id: 1,
      name: "Giày Thể Thao",
      icon: "👟",
      description: "Bộ sưu tập giày thể thao mới nhất",
      count: "150+ sản phẩm",
    },
    {
      id: 2,
      name: "Quần Áo",
      icon: "👕",
      description: "Thời trang thể thao cao cấp",
      count: "200+ sản phẩm",
    },
    {
      id: 3,
      name: "Phụ Kiện",
      icon: "🎒",
      description: "Phụ kiện tập luyện đa dạng",
      count: "80+ sản phẩm",
    },
    {
      id: 4,
      name: "Thiết Bị",
      icon: "⚽",
      description: "Dụng cụ thể thao chuyên nghiệp",
      count: "100+ sản phẩm",
    },
  ];

  const features = [
    {
      icon: "🚚",
      title: "Miễn Phí Vận Chuyển",
      description: "Đơn hàng từ 500,000 VND",
    },
    {
      icon: "🔄",
      title: "Đổi Trả Dễ Dàng",
      description: "Trong vòng 30 ngày",
    },
    {
      icon: "✅",
      title: "Hàng Chính Hãng",
      description: "100% authentic",
    },
    {
      icon: "💳",
      title: "Thanh Toán An Toàn",
      description: "Bảo mật tuyệt đối",
    },
  ];

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="shop-hero-content">
          <h1 className="shop-hero-title">Khám Phá Bộ Sưu Tập</h1>
          <p className="shop-hero-subtitle">
            Sản phẩm thể thao chất lượng cao cho mọi nhu cầu của bạn
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="shop-categories">
        <h2 className="shop-section-title">Danh Mục Sản Phẩm</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <span className="category-count">{category.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="shop-features">
        <h2 className="shop-section-title">Tại Sao Chọn Chúng Tôi?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
