// Contact.jsx
import React, { useState } from "react";
import { TextType } from "../../Shop/components/TextType";
import { SplitText } from "../../Shop/components/SplitText";
export const Contact = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
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
      content: "support@AcademySports.vn",
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
        <div>
          <SplitText
            text="Liên hệ với chúng tôi"
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
        <div>
          <TextType
            text={["Luôn hỗ trợ mọi lúc mọi nơi"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
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
