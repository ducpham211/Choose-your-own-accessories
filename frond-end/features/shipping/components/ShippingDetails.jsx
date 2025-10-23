// src/order/pages/ShippingDetails.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderItems } from "../../orders/services/ordersApi";
import { updateStatus } from "../services/shippingApi";

export const ShippingDetails = () => {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderItems(id);

        const shippingData = data.shipping;
        setOrderItems(data.orderItemData || []);
        setShipping(shippingData);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadItems();
    }
  }, [id]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);
  const handleStatusChange = async (e) => {
    if (!shipping) return;

    const newStatus = e.target.value;
    console.log("new status : ", newStatus);
    setUpdating(true);
    setSuccess(false);

    try {
      await updateStatus(id, newStatus);

      setShipping((prev) => ({ ...prev, status: newStatus }));
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="shipping-container">
        <div className="shipping-loading">
          <div className="shipping-spinner"></div>
          <p>Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shipping-container">
        <div className="shipping-error">
          <h1 className="shipping-title">Đơn Hàng #{id}</h1>
          <div className="shipping-error-message">
            <span className="shipping-error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + (item.quantity * item.price || 0),
    0
  );

  return (
    <div className="shipping-container">
      <div className="shipping-header">
        <h1 className="shipping-title">Đơn Hàng #{id}</h1>
        <p className="shipping-subtitle">Chi tiết sản phẩm trong đơn hàng</p>

        {shipping && (
          <div className="shipping-status-section">
            <strong className="status-title">Trạng thái giao hàng: </strong>
            <select
              onChange={handleStatusChange}
              disabled={updating}
              className="shipping-status-select"
            >
              <option value={shipping[0]?.status}>
                {shipping[0]?.status === "Đã Giao" ? "Đã giao" : "Đang giao"}
              </option>

              <option
                value={
                  shipping[0]?.status === "Đã Giao" ? "Đang Giao" : "Đã Giao"
                }
              >
                {shipping[0]?.status === "Đã Giao" ? "Đang giao" : "Đã giao"}
              </option>
            </select>

            {success && (
              <div className="shipping-success-message">
                <span className="shipping-success-icon">✓</span>
                <span>Cập nhật trạng thái thành công!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {orderItems.length === 0 ? (
        <div className="shipping-content">
          <div className="shipping-empty">
            <div className="shipping-empty-icon">📦</div>
            <p className="shipping-empty-text">
              Không có sản phẩm nào trong đơn hàng này
            </p>
          </div>
        </div>
      ) : (
        <div className="shipping-content">
          <table className="shipping-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="shipping-image-wrapper">
                      <img
                        src={item.products?.image_url || "/placeholder.png"}
                        alt={item.products?.name || "Sản phẩm"}
                        className="shipping-product-image"
                      />
                    </div>
                  </td>
                  <td>
                    <span className="shipping-product-name">
                      {item.products?.name || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className="shipping-quantity">{item.quantity}</span>
                  </td>
                  <td>
                    <span className="shipping-price">
                      {new Intl.NumberFormat("vi-VN").format(item.price)} ₫
                    </span>
                  </td>
                  <td>
                    <span className="shipping-total">
                      {new Intl.NumberFormat("vi-VN").format(
                        item.quantity * item.price
                      )}{" "}
                      ₫
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="shipping-summary">
            <span className="shipping-summary-label">Tổng cộng:</span>
            <span className="shipping-summary-amount">
              {new Intl.NumberFormat("vi-VN").format(totalAmount)} ₫
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
