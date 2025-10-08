// import { useState, useEffect } from "react";

// export const Banner = () => {
//   const [countdown, setCountdown] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const updateCountdown = () => {
//       const now = new Date();
//       const tomorrow = new Date(now);
//       tomorrow.setDate(tomorrow.getDate() + 1);
//       tomorrow.setHours(0, 0, 0, 0); // Đặt về 00:00:00 ngày mai

//       const diff = tomorrow.getTime() - now.getTime(); // Khoảng cách mili giây đến 00:00

//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       setCountdown({
//         hours,
//         minutes,
//         seconds,
//       });
//     };

//     updateCountdown(); // Chạy ngay lần đầu
//     const interval = setInterval(updateCountdown, 1000); // Cập nhật mỗi giây

//     return () => clearInterval(interval); // Cleanup khi component unmount
//   }, []);

//   return (
//     <div>
//       <section className="hero-banner">
//         <div className="hero-content">
//           <span className="hero-badge">🔥 HOT SALE</span>
//           <h1 className="hero-title">Mega Sale Mùa Hè 2025</h1>
//           <p className="hero-subtitle">
//             Giảm giá lên đến 70% cho tất cả sản phẩm thể thao
//           </p>
//           <div className="hero-countdown">
//             <div className="countdown-item">
//               <span className="countdown-value">
//                 {countdown.hours.toString().padStart(2, "0")}
//               </span>
//               <span className="countdown-label">Giờ</span>
//             </div>
//             <span className="countdown-separator">:</span>
//             <div className="countdown-item">
//               <span className="countdown-value">
//                 {countdown.minutes.toString().padStart(2, "0")}
//               </span>
//               <span className="countdown-label">Phút</span>
//             </div>
//             <span className="countdown-separator">:</span>
//             <div className="countdown-item">
//               <span className="countdown-value">
//                 {countdown.seconds.toString().padStart(2, "0")}
//               </span>
//               <span className="countdown-label">Giây</span>
//             </div>
//           </div>
//         </div>
//         <div className="hero-decoration">
//           <div className="floating-icon icon-1">🎉</div>
//           <div className="floating-icon icon-2">⚡</div>
//           <div className="floating-icon icon-3">🏃</div>
//           <div className="floating-icon icon-4">🎯</div>
//         </div>
//       </section>
//       {/* Promotional Banner */}
//       <div className="promo-banner">
//         <div className="promo-scroll">
//           <span className="promo-text">
//             🚀 FREESHIP TOÀN QUỐC • GIẢM GIÁ ĐẾN 70% • MUA 1 TẶNG 1 • HOÀN TIỀN
//             100% NẾU KHÔNG HÀI LÒNG •
//           </span>
//           <span className="promo-text">
//             🚀 FREESHIP TOÀN QUỐC • GIẢM GIÁ ĐẾN 70% • MUA 1 TẶNG 1 • HOÀN TIỀN
//             100% NẾU KHÔNG HÀI LÒNG •
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";

export const Banner = () => {
  return (
    <section className="banner-section">
      <div className="banner-image-container">
        <img
          className="banner-background-image"
          src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=2400&h=1000&fit=crop&q=80"
          alt="Football Banner"
        />
        <div className="banner-overlay"></div>
      </div>

      <div className="banner-content-wrapper">
        <div className="banner-content">
          <span className="banner-subtitle">Bộ Sưu Tập Mới 2025</span>
          <h1 className="banner-title">
            Mọi Thứ Về
            <br />
            <span className="banner-title-highlight">Bóng Đá</span>
          </h1>
          <p className="banner-description">
            Khám phá bộ sưu tập đồ thể thao bóng đá chính hãng với thiết kế
            chuyên nghiệp, chất liệu cao cấp và phong cách của những ngôi sao.
          </p>

          <div className="banner-buttons">
            <button className="banner-btn banner-btn-primary">
              Tìm Hiểu Thêm
            </button>
            <button className="banner-btn banner-btn-secondary">
              Mua Ngay
            </button>
          </div>

          <div className="banner-features">
            <div className="banner-feature-item">
              <svg
                className="banner-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Miễn phí vận chuyển</span>
            </div>
            <div className="banner-feature-item">
              <svg
                className="banner-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Chính hãng 100%</span>
            </div>
            <div className="banner-feature-item">
              <svg
                className="banner-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>Thanh toán an toàn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
