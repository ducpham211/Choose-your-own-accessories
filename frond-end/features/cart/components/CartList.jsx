import { useEffect, useState } from "react";
import { fetchCartItems } from "../services/cartApi";
import { Link } from "react-router-dom";

export const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetchCartItems();
        setLoading(false);
        setCartItems(response);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.products?.price * item.quantity || 0);
  }, 0);

  const handlePayment = async () => {
    try {
      setSuccess("Thanh toán thành công! 🎉");
      setError("");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Failed to create order:", error);
      setError(error.message || "Có lỗi xảy ra khi thanh toán");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="cart-main-layout">
          <p className="cart-loading">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-main-layout">
        <h2 className="cart-title">Giỏ Hàng Của Bạn</h2>

        {error && <div className="cart-error">⚠️ {error}</div>}
        {success && <div className="cart-success">✅ {success}</div>}

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p className="cart-empty-text">Giỏ hàng trống</p>
            <p className="cart-empty-subtext">
              Hãy thêm một số sản phẩm để bắt đầu mua sắm!
            </p>
            <Link to="/products" className="cart-payment-btn">
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.products.name}</h3>
                    <p className="cart-item-price">
                      Đơn giá: {item.products.price.toLocaleString("vi-VN")} VND
                    </p>
                    <p className="cart-item-quantity">
                      Số lượng: {item.quantity}
                    </p>
                  </div>

                  <div className="cart-item-total">
                    <p className="cart-item-total-price">
                      {(item.products.price * item.quantity).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      VND
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p className="cart-total">{total.toLocaleString("vi-VN")} VND</p>

              <Link to="/checkout" className="cart-payment-btn">
                <button
                  onClick={handlePayment}
                  className="cart-payment-btn"
                  id="payment"
                >
                  💳 Thanh Toán Ngay
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
// CartList.jsx
