import { useState, useEffect } from "react";

export const Banner = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // Đặt về 00:00:00 ngày mai

      const diff = tomorrow.getTime() - now.getTime(); // Khoảng cách mili giây đến 00:00

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown(); // Chạy ngay lần đầu
    const interval = setInterval(updateCountdown, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval); // Cleanup khi component unmount
  }, []);

  return (
    <div>
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">🔥 HOT SALE</span>
          <h1 className="hero-title">Mega Sale Mùa Hè 2025</h1>
          <p className="hero-subtitle">
            Giảm giá lên đến 70% cho tất cả sản phẩm thể thao
          </p>
          <div className="hero-countdown">
            <div className="countdown-item">
              <span className="countdown-value">
                {countdown.hours.toString().padStart(2, "0")}
              </span>
              <span className="countdown-label">Giờ</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">
                {countdown.minutes.toString().padStart(2, "0")}
              </span>
              <span className="countdown-label">Phút</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">
                {countdown.seconds.toString().padStart(2, "0")}
              </span>
              <span className="countdown-label">Giây</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-icon icon-1">🎉</div>
          <div className="floating-icon icon-2">⚡</div>
          <div className="floating-icon icon-3">🏃</div>
          <div className="floating-icon icon-4">🎯</div>
        </div>
      </section>
      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="promo-scroll">
          <span className="promo-text">
            🚀 FREESHIP TOÀN QUỐC • GIẢM GIÁ ĐẾN 70% • MUA 1 TẶNG 1 • HOÀN TIỀN
            100% NẾU KHÔNG HÀI LÒNG •
          </span>
          <span className="promo-text">
            🚀 FREESHIP TOÀN QUỐC • GIẢM GIÁ ĐẾN 70% • MUA 1 TẶNG 1 • HOÀN TIỀN
            100% NẾU KHÔNG HÀI LÒNG •
          </span>
        </div>
      </div>
    </div>
  );
};
