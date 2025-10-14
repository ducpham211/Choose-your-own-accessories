// EmailConfirmedPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EmailConfirmedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động quay lại trang chủ sau 3 giây
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "1.2rem",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2>✅ Xác nhận email thành công!</h2>
      <p>Bạn đã xác minh địa chỉ email của mình.</p>
      <p>Đang chuyển hướng về trang chủ...</p>
    </div>
  );
};
