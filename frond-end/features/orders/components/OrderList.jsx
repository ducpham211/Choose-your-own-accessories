// OrderList.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutCart } from "../services/ordersApi.jsx";

export const OrderList = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasProcessed = useRef(false); // 👈 cờ để đảm bảo chỉ chạy 1 lần

  useEffect(() => {
    if (hasProcessed.current) return; // 👈 đã xử lý rồi thì thoát
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
  if (loading) return <p>Processing your order...</p>;
  if (!order) return null;

  return (
    <div
      className="order-bill"
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <h2>✅ Order Confirmed!</h2>
      <p>Thank you for your purchase!</p>

      <div>
        <h3>Order #{order.id}</h3>
        <p>
          <strong>Total:</strong> {order.total_price.toLocaleString()} VND
        </p>
        <h4>Items:</h4>
        <ul>
          {order.order_items.map((item) => (
            <li key={item.id}>
              {item.products.name} × {item.quantity} —{" "}
              {item.products.price.toLocaleString()} VND
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#88c9a1",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

// OrderList.jsx
