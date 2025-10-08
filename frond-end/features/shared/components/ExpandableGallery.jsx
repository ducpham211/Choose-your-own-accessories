// ExpandableGallery.jsx
import React, { useState } from "react";

export const ExpandableGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Cristiano Ronaldo",
      subtitle: "Ronnie",
      image:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/2/4/1458351/Ronaldo-1.jpg",
      description: "Huyền thoại bóng đá với 5 Quả Bóng Vàng",
    },
    {
      id: 2,
      title: "Lionel Messi",
      subtitle: "La Pulga",
      image:
        "https://cdn.langsontv.vn/upload/news/9_2025/1758447825306_16434521092025.jpg",
      description: "Thiên tài Argentina, 8 lần đoạt Quả Bóng Vàng",
    },
    {
      id: 3,
      title: "Désiré Doué",
      subtitle: "Rising Star",
      image:
        "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_0,w_4000,h_2250/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/503/01jrmx0r2qzvgc007h10.jpg",
      description: "Tài năng trẻ xuất sắc của bóng đá Pháp",
    },
    {
      id: 4,
      title: "Lamine Yamal",
      subtitle: "Wonder Kid",
      image:
        "https://top10nhomkinh.vn/wp-content/uploads/2025/09/lamine-yamal.jpg",
      description: "Thần đồng 17 tuổi của Barcelona",
    },
    {
      id: 5,
      title: "Ousmane Dembélé",
      subtitle: "Speed Demon",
      image:
        "https://vcdn1-thethao.vnecdn.net/2025/09/16/dembele-1757988646-2715-1757988756.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=5y4jc_pPA3R-U4-uALDxlg",
      description: "Siêu tốc độ của PSG và tuyển Pháp",
    },
  ];

  return (
    <section className="expandable-gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">
          ⚡ Bứt Phá Phong Cách - Thăng Hoa Đẳng Cấp
        </h2>
        <p className="gallery-subtitle">
          Sở hữu phong cách của những cầu thủ chuyên nghiệp
        </p>
      </div>

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
            <div className="gallery-content">
              <span className="gallery-number">0{item.id}</span>
              <h3 className="gallery-item-title">{item.title}</h3>
              <p className="gallery-item-subtitle">{item.subtitle}</p>
              <p className="gallery-item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
