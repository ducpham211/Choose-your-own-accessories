import React, { useEffect, useState } from "react";
import { getUserInfo } from "../services/userApi";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch (err) {
        console.error("Failed to load user info:", err);
        setError(err.message || "Không thể tải thông tin người dùng");
        if (err.message?.includes("Not authenticated")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return (
      <div className="user-loading-wrapper">
        <p className="user-loading-message">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-error-wrapper">
        <p className="user-error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="user-page-container">
      <h1 className="user-page-title">Thông tin tài khoản</h1>

      <div className="user-info-card">
        <div className="user-info-field">
          <label className="user-info-label">Tên Tài Khoản</label>
          <p className="user-info-value">{user.email}</p>
        </div>

        <div className="user-info-field">
          <label className="user-info-label">Vai trò</label>
          <p className="user-info-value capitalize">{user.role || "user"}</p>
        </div>

        <div className="user-stats-divider">
          <h2 className="user-stats-title">Thống kê mua sắm</h2>

          <div className="user-stats-grid">
            <div className="user-stat-card total-spent">
              <p className="user-stat-label">Tổng chi tiêu</p>
              <p className="user-stat-value">
                {user.totalAmounts?.toLocaleString("vi-VN") || "0"} ₫
              </p>
            </div>

            <div className="user-stat-card total-orders">
              <p className="user-stat-label">Số đơn hàng</p>
              <p className="user-stat-value">{user.totalOrders || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="user-back-wrapper">
        <button onClick={() => navigate("/")} className="user-back-button">
          ← Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};
