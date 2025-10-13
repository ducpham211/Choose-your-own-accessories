import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  Leaf,
} from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Info Section */}
        <div className="footer-section">
          <h3>
            <Leaf size={20} style={{ marginRight: "8px", display: "inline" }} />
            AcademySports
          </h3>
          <p>Chuyên cung cấp các sản phẩm thể thao đặc biệt là bóng đá.</p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              className="social-link"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              className="social-link"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="social-link"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              className="social-link"
              aria-label="Youtube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}

        {/* Contact & Newsletter Section */}
        <div className="footer-section">
          <h3>Liên hệ & Đăng ký</h3>
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.8rem",
              }}
            >
              <MapPin
                size={16}
                style={{ marginRight: "8px", color: "#7fb3d3" }}
              />
              123 Đường Xanh, Quận Thủ Đức , TP.HCM
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.8rem",
              }}
            >
              <Phone
                size={16}
                style={{ marginRight: "8px", color: "#7fb3d3" }}
              />
              +84 123 456 789
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.8rem",
              }}
            >
              <Mail
                size={16}
                style={{ marginRight: "8px", color: "#7fb3d3" }}
              />
              hello@AcademySports shop.vn
            </p>
          </div>

          <p
            style={{
              marginBottom: "1rem",
              fontWeight: "600",
              color: "#5a9fd4",
            }}
          >
            Đăng ký nhận tin khuyến mãi
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Nhập email của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="newsletter-btn"
              disabled={subscribed}
            >
              {subscribed ? <Heart size={16} /> : <Send size={16} />}
            </button>
          </form>
          {subscribed && (
            <p
              style={{
                marginTop: "0.5rem",
                color: "#5a9fd4",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              ✨ Cảm ơn bạn đã đăng ký!
            </p>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © 2024 Academy Sports. Tất cả quyền được bảo lưu. |
          <Link to="/privacy" style={{ marginLeft: "8px", marginRight: "8px" }}>
            Chính sách bảo mật
          </Link>{" "}
          |
          <Link to="/terms" style={{ marginLeft: "8px" }}>
            Điều khoản sử dụng
          </Link>
        </p>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.85rem",
            opacity: "0.8",
            fontStyle: "italic",
          }}
        >
          Được thiết kế với{" "}
          <Heart
            size={14}
            style={{
              display: "inline",
              color: "#ff6b6b",
              margin: "0 4px",
            }}
          />{" "}
          tại Việt Nam
        </p>
      </div>
    </footer>
  );
};
