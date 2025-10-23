// Shop.jsx
import React from "react";
import { SplitText } from "../components/SplitText";
import { TextType } from "../components/TextType";
import Stepper, { Step } from "../components/Stepper";
export const Shop = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  const categories = [
    {
      id: 1,
      name: "Giày Thể Thao",
      icon: "👟",
      description: "Bộ sưu tập giày thể thao mới nhất",
      count: "150+ sản phẩm",
    },
    {
      id: 2,
      name: "Quần Áo",
      icon: "👕",
      description: "Thời trang thể thao cao cấp",
      count: "200+ sản phẩm",
    },
    {
      id: 3,
      name: "Phụ Kiện",
      icon: "🎒",
      description: "Phụ kiện tập luyện đa dạng",
      count: "80+ sản phẩm",
    },
    {
      id: 4,
      name: "Thiết Bị",
      icon: "⚽",
      description: "Dụng cụ thể thao chuyên nghiệp",
      count: "100+ sản phẩm",
    },
  ];

  const features = [
    {
      icon: "🚚",
      title: "Miễn Phí Vận Chuyển",
      description: "Đơn hàng từ 500,000 VND",
    },
    {
      icon: "🔄",
      title: "Đổi Trả Dễ Dàng",
      description: "Trong vòng 30 ngày",
    },
    {
      icon: "✅",
      title: "Hàng Chính Hãng",
      description: "100% authentic",
    },
    {
      icon: "💳",
      title: "Thanh Toán An Toàn",
      description: "Bảo mật tuyệt đối",
    },
  ];

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="shop-hero-content">
          <div>
            <SplitText
              text="Welcome to Academy Sports!"
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
              text={[
                "Sản phẩm thể thao",
                "chất lượng cao",
                "cho mọi nhu cầu của bạn",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="shop-categories">
        <h2 className="shop-section-title">Danh Mục Sản Phẩm</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <span className="category-count">{category.count}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="shop-process">
        <h2 className="shop-section-title">Quy Trình Mua Hàng</h2>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <h2>Chào mừng bạn đến với Academy Sports!</h2>
            <p>Đăng nhập / Đăng kí để sử dụng dịch vụ</p>
          </Step>
          <Step>
            <h2>Tiếp Theo</h2>
            <img
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center -20px",
                borderRadius: "15px",
                marginTop: "1em",
                paddingBottom: "10px",
              }}
              src="data:image/jpeg;base64,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"
            />
            <p>"Lượn" 1 vòng, "Tia" món đồ mình thích</p>
          </Step>
          <Step>
            <h2>Sau đó ?</h2>
            <img
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center -20px",
                borderRadius: "15px",
                marginTop: "1em",
                paddingBottom: "10px",
              }}
              src="https://studybreaks.com/wp-content/uploads/2020/08/dollar-store-shopper-scaled-e1596726537905.jpg"
            />
            <p>Thêm vào giỏ hàng</p>
          </Step>
          <Step>
            <h2>Cuối cùng ?</h2>
            <img
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center -10px",
                borderRadius: "15px",
                marginTop: "1em",
                paddingBottom: "10px",
              }}
              src="https://www.clio.com/wp-content/uploads/2022/11/Illustration_Blog_Lawyer-Payment-Methods.png"
            />
            <p>Tiến hành thanh toán để hoàn tất !</p>
          </Step>
        </Stepper>
      </section>
      {/* Features Section */}
      <section className="shop-features">
        <h2 className="shop-section-title">Tại Sao Chọn Chúng Tôi?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
