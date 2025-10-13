// src/features/admin/components/OrdersList.jsx (Component mới để hiển thị danh sách orders)
import { useState, useEffect } from "react";
import { fetchAllOrders } from "../services/adminApi";
import { Link } from "react-router-dom";

export const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchAllOrders();
        setOrders(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading)
    return <div className="loading">Đang tải danh sách đơn hàng...</div>;
  if (error) return <div className="error">❌ {error}</div>;
  if (orders.length === 0)
    return <div className="no-data">Không có đơn hàng nào</div>;

  return (
    <div className="orders-list-section">
      <h2 className="section-title">Tất Cả Đơn Hàng</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID Đơn Hàng</th>
            <th>Người Dùng (Email)</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Ngày Tạo</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="order-id">#{order.id}</td>
              <td className="user-email">{order.users.email || "N/A"}</td>{" "}
              <td className="total-price">
                {new Intl.NumberFormat("vi-VN").format(order.total_price || 0)}{" "}
                ₫
              </td>
              <td className="status">
                <span className={`status-badge ${order.status}`}>
                  {order.status || "N/A"}
                </span>
              </td>
              <td className="created-at">
                {new Date(order.created_at).toLocaleDateString("vi-VN")}
              </td>
              <Link to={`/order/${order.id}`}>
                <td className="actions">
                  <button className="btn-view">Xem</button>
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
