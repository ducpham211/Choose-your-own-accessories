import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const MomoRedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const resultCode = searchParams.get("resultCode");
    console.log("Kết quả MoMo:", {
      resultCode,
      ...Object.fromEntries(searchParams),
    });

    // Dù thành công hay không, đều chuyển về trang đơn hàng
    navigate("/orders", { replace: true });
  }, [searchParams, navigate]);

  return <div>Đang chuyển hướng...</div>; // hoặc null
};
