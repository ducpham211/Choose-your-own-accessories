// OrderList.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutCart } from "../services/ordersApi.jsx";

export const OrderList = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processCheckout = async () => {
      try {
        const orderData = await checkoutCart();
        setOrder(orderData);
      } catch (err) {
        alert("Checkout failed: " + err.message);
        navigate("/cart/items");
      } finally {
        setLoading(false);
      }
    };

    processCheckout();
  }, [navigate]);

  if (loading)
    return <p className="order-loading">Đang tiến hành thanh toán ...</p>;
  if (!order) return null;

  return (
    <div className="order-bill">
      <div className="order-summary">
        <h2>Thanh toán thành công</h2>
        <p>Cảm ơn vì sự ủng hộ của quỷ khách</p>
        <h3>Đơn hàng #{order.id}</h3>
        <p>
          <strong>Tổng cộng :</strong> {order.total_price.toLocaleString()} VND
        </p>
        <h4>Món hàng:</h4>
        <ul>
          {order.order_items.map((item) => (
            <li key={item.id}>
              <span>
                {item.products.name} × {item.quantity}
              </span>
              <span>{item.products.price.toLocaleString()} VND</span>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/")}>Tiếp tục mua sắm</button>
    </div>
  );
};

// OrderList.jsx
