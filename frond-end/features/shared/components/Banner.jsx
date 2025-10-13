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
            chuyên nghiệp, chất liệu cao cấp chuẩn phong cách của những ngôi
            sao.
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
