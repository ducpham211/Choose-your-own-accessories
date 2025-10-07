import { useEffect, useState } from "react";
import {
  fetchCartItems,
  removeCartItem,
  updateCartQuantity,
} from "../services/cartApi";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

export const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetchCartItems();
        setCartItems(response);
      } catch (error) {
        setError("Không thể tải giỏ hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await removeCartItem(itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      setSuccess("Đã xóa sản phẩm khỏi giỏ hàng");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleUpdateCartQuantity = async (itemId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    try {
      await updateCartQuantity(itemId, newQty);

      const response = await fetchCartItems();
      setCartItems(response);
    } catch (err) {
      setError(err.message || "Lỗi cập nhật số lượng");
      setTimeout(() => setError(""), 5000);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.products?.price * item.quantity || 0);
  }, 0);

  const handlePayment = () => {
    setSuccess("Thanh toán thành công! 🎉");
    setTimeout(() => setSuccess(""), 3000);
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
            <Link to="/products" className="cart-continue-shopping-btn">
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
                    <div className="cart-item-quantity">
                      <button
                        onClick={() =>
                          handleUpdateCartQuantity(item.id, item.quantity, -1)
                        }
                        disabled={item.quantity <= 1}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateCartQuantity(item.id, item.quantity, 1)
                        }
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="cart-item-delete-btn"
                      aria-label="Xóa sản phẩm"
                    >
                      <Trash size={18} />
                    </button>
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
              <p className="cart-total">
                Tổng: {total.toLocaleString("vi-VN")} VND
              </p>
              <Link to="/checkout" className="cart-payment-link">
                <button onClick={handlePayment} className="cart-payment-btn">
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
