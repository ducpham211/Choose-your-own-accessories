// ExpandableGallery.jsx
import React, { useState } from "react";

export const ExpandableGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Nike Tiempo 9",
      subtitle: "Made in Italy",
      image:
        "https://bizweb.dktcdn.net/thumb/1024x1024/100/352/697/products/z4076403424367-ac4f2e7552c1a8c10f670b6314aab28b.jpg?v=1675249846667",
      description: "Đẳng cấp vượt trội từ nghệ nhân Ý",
    },
    {
      id: 2,
      title: "Nike Tiempo 10",
      subtitle: "Emerald",
      image:
        "https://product.hstatic.net/1000061481/product/nms05177_1e49ba3d8eac4f13ae004dadb6fab8a2_1024x1024.jpg",
      description: "Sắc xanh ngọc lục bảo đầy mê hoặc",
    },
    {
      id: 3,
      title: "Nike Tiempo 10",
      subtitle: "White/Pink",
      image:
        "https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/zoom/1028990-1100V1.jpg",
      description: "Phối màu trắng hồng tối giản, tinh tế",
    },
    {
      id: 4,
      title: "Nike Tiempo 10",
      subtitle: "Blast Pack",
      image:
        "https://ash.vn/cdn/shop/files/snapedit_1708423503717.jpg?v=1708423604",
      description: "Sẵn sàng bùng nổ mọi khoảnh khắc trận đấu",
    },
    {
      id: 5,
      title: "Nike Tiempo 10",
      subtitle: "Golden Touch",
      image:
        "https://bizweb.dktcdn.net/100/352/697/products/z5144300799571-a71f6fac69614582f249f53af7a0694c.jpg?v=1707299032650",
      description: "Tỏa sáng sân cỏ với ánh vàng rực rỡ",
    },
  ];

  return (
    <section className="expandable-gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">⚡ Bộ Sưu Tập Mới Của Nike</h2>
      </div>
      <p className="gallery-subtitle">Chạm vào để xem chi tiết</p>
      <div className="expandable-gallery">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className={`gallery-item ${activeIndex === index ? "active" : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="gallery-overlay"></div>
            {activeIndex === index && (
              <div className="gallery-content">
                <span className="gallery-number">0{item.id}</span>
                <h3 className="gallery-item-title">{item.title}</h3>
                <p className="gallery-item-subtitle">{item.subtitle}</p>
                <p className="gallery-item-description">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
