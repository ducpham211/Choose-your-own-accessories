// About.jsx
import React from "react";
import InfiniteScroll from "../components/InfiniteScroll";
import { TextType } from "../../Shop/components/TextType";
import { SplitText } from "../../Shop/components/SplitText";
export const About = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
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

  return (
    <>
      <style>
        {`
    .product-card {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      box-sizing: border-box;
      background: #fff; 
      border-radius: 16px; 
      overflow: hidden; 
    }

    .product-card img {
      width: 100%;
      height: 80%;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .product-card .content-text {
      width: 100%;
      height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      padding: 0.5rem;
      box-sizing: border-box;
      text-align: center;
    }

    .product-card p,
    .product-card span {
      margin: 0;
      font-size: 1rem;
      line-height: 1.3;
      color: #333;
    }

    .product-card span {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
    }
  `}
      </style>
      <div className="about-container">
        {/* Hero */}
        <section className="about-hero">
          <div>
            <SplitText
              text="Về chúng tôi"
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
              text={["Luôn đồng hành cùng đam mê thể thao của bạn"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="about-story-content">
            <h2 className="about-section-title">Câu Chuyện Của Chúng Tôi</h2>
            <p className="about-story-text">
              Academy Sports được thành lập vào năm 2019 với sứ mệnh mang đến
              những sản phẩm thể thao chất lượng cao, giúp mọi người có thể dễ
              dàng tiếp cận và theo đuổi đam mê thể thao của mình.
            </p>
            <p className="about-story-text">
              Chúng tôi tin rằng thể thao không chỉ là hoạt động rèn luyện sức
              khỏe, mà còn là lối sống tích cực, giúp con người phát triển toàn
              diện cả về thể chất lẫn tinh thần.
            </p>
            <p className="about-story-text">
              Với đội ngũ chuyên nghiệp và tâm huyết, Academy Sports cam kết
              mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
            </p>
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
      </div>
    </>
  );
};
