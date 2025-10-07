export const Banner = () => {
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
              <span className="countdown-value">02</span>
              <span className="countdown-label">Giờ</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">45</span>
              <span className="countdown-label">Phút</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">30</span>
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
      ;{/* Promotional Banner */}
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
      ;
    </div>
  );
};
