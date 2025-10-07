// Contact.jsx
import React, { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("success");
    setTimeout(() => {
      setStatus("");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Địa Chỉ",
      content: "123 Nguyễn Huệ, Q.1, TP.HCM",
    },
    {
      icon: "📞",
      title: "Điện Thoại",
      content: "(028) 1234 5678",
    },
    {
      icon: "📧",
      title: "Email",
      content: "support@fitzone.vn",
    },
    {
      icon: "🕒",
      title: "Giờ Làm Việc",
      content: "T2 - CN: 8:00 - 22:00",
    },
  ];

  return (
    <div className="contact-container">
      {/* Hero */}
      <section className="contact-hero">
        <h1 className="contact-hero-title">Liên Hệ Với Chúng Tôi</h1>
        <p className="contact-hero-subtitle">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-info-card">
              <div className="contact-info-icon">{info.icon}</div>
              <h3 className="contact-info-title">{info.title}</h3>
              <p className="contact-info-content">{info.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="contact-form-wrapper">
          <h2 className="contact-form-title">Gửi Tin Nhắn</h2>

          {status === "success" && (
            <div className="contact-success-message">
              ✅ Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Họ Tên *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Tiêu Đề *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Tiêu đề tin nhắn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Nội Dung *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Nhập nội dung tin nhắn..."
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">
              📩 Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
