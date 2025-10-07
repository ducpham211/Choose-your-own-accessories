// About.jsx
import React from "react";

export const About = () => {
  const stats = [
    { icon: "👥", value: "10,000+", label: "Khách Hàng" },
    { icon: "🏆", value: "5+", label: "Năm Kinh Nghiệm" },
    { icon: "📦", value: "50,000+", label: "Đơn Hàng" },
    { icon: "⭐", value: "4.9/5", label: "Đánh Giá" },
  ];

  const values = [
    {
      icon: "💎",
      title: "Chất Lượng",
      description: "Cam kết 100% sản phẩm chính hãng, chất lượng cao",
    },
    {
      icon: "🤝",
      title: "Uy Tín",
      description: "Xây dựng niềm tin qua từng sản phẩm và dịch vụ",
    },
    {
      icon: "💡",
      title: "Đổi Mới",
      description: "Luôn cập nhật xu hướng và công nghệ mới nhất",
    },
    {
      icon: "❤️",
      title: "Tận Tâm",
      description: "Đặt khách hàng làm trung tâm trong mọi hoạt động",
    },
  ];

  const team = [
    {
      name: "Nguyễn Văn A",
      role: "CEO & Founder",
      image: "👨‍💼",
    },
    {
      name: "Trần Thị B",
      role: "Marketing Director",
      image: "👩‍💼",
    },
    {
      name: "Lê Văn C",
      role: "Product Manager",
      image: "👨‍💻",
    },
    {
      name: "Phạm Thị D",
      role: "Customer Support",
      image: "👩‍💻",
    },
  ];

  return (
    <div className="about-container">
      {/* Hero */}
      <section className="about-hero">
        <h1 className="about-hero-title">Về Chúng Tôi</h1>
        <p className="about-hero-subtitle">
          Đồng hành cùng đam mê thể thao của bạn
        </p>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="about-story-content">
          <h2 className="about-section-title">Câu Chuyện Của Chúng Tôi</h2>
          <p className="about-story-text">
            Fit Zone được thành lập vào năm 2019 với sứ mệnh mang đến những sản
            phẩm thể thao chất lượng cao, giúp mọi người có thể dễ dàng tiếp cận
            và theo đuổi đam mê thể thao của mình.
          </p>
          <p className="about-story-text">
            Chúng tôi tin rằng thể thao không chỉ là hoạt động rèn luyện sức
            khỏe, mà còn là lối sống tích cực, giúp con người phát triển toàn
            diện cả về thể chất lẫn tinh thần.
          </p>
          <p className="about-story-text">
            Với đội ngũ chuyên nghiệp và tâm huyết, Fit Zone cam kết mang đến
            trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <h2 className="about-section-title">Giá Trị Cốt Lõi</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2 className="about-section-title">Đội Ngũ Của Chúng Tôi</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">{member.image}</div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
