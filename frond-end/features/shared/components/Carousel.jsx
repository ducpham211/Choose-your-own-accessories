// ImageCarousel.jsx
import React, { useState } from "react";

export const Carousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    {
      url: "https://intphcm.com/data/upload/poster-giay-typograhy.jpg",
      title: "Puma",
      subtitle: "Khám Phá Bộ Sưu Tập mới của Puma ",
    },
    {
      url: "https://file.hstatic.net/1000061481/file/11_8154f8635bdd4cfd9b7a6ce3e84c3f45.jpg",
      title: "Predator",
      subtitle: "Khám Phá Bộ Sưu Tập mới của Predator",
    },
    {
      url: "https://sport365.com.vn/wp-content/uploads/2024/08/zocker-banner-pc_1040-1-1400x535.jpg",
      title: "Zocker",
      subtitle: "Khám Phá Bộ Sưu Tập mới của Zocker",
    },
    {
      url: "https://file.hstatic.net/1000061481/file/giay_da_bong_puma_faster_football__16__bf1d18bd8a0949a1ad585c6fdbca3e69.jpg",
      title: "Puma Wild",
      subtitle: "Khám Phá Bộ Sưu Tập mới của Puma",
    },
    {
      url: "https://bizweb.dktcdn.net/100/458/331/themes/866920/assets/banner_product_noibat.jpg?1743156871883",
      title: "Wika",
      subtitle: "Khám Phá Bộ Sưu Tập mới của Wika",
    },
  ];

  return (
    <div className="carousel-container">
      <h1 className="carousel-title">Bộ Sưu Tập Mới</h1>
      <div className="carousel-wrapper">
        <div className="carousel-gradient-overlay carousel-gradient-left"></div>
        <div className="carousel-gradient-overlay carousel-gradient-right"></div>

        <div
          className={`carousel-track ${isPaused ? "paused" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...images, ...images, ...images].map((image, index) => (
            <div key={index} className="carousel-item">
              <div className="carousel-image-wrapper">
                <img src={image.url} alt={image.title} />
                <div className="carousel-image-overlay">
                  <div className="carousel-shimmer"></div>
                </div>
                <div className="carousel-image-content">
                  <h3 className="carousel-image-title">{image.title}</h3>
                  <p className="carousel-image-subtitle">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span key={index} className="carousel-indicator"></span>
        ))}
      </div>
    </div>
  );
};
