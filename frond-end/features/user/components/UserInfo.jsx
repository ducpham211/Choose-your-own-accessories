// src/features/user/components/UserInfo.jsx
import React, { useEffect, useState } from "react";
import { getUserInfo, updateUser } from "../services/usersApi";
import { useNavigate } from "react-router-dom";
import { UserOrderList } from "./UserOrderList";
export const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
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

  const handleUpdateSuccess = async () => {
    try {
      const userData = await getUserInfo();
      setUser(userData);
      setIsEditing(false);
    } catch (err) {
      setError("Không thể tải lại thông tin sau khi cập nhật");
    }
  };

  if (loading) {
    return (
      <div className="user-loading-wrapper">
        <p className="user-loading-message">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  if (error) {
    return <div className="user-error-wrapper"></div>;
  }

  if (isEditing) {
    return (
      <div className="user-page-container">
        <UpdateForm
          initialData={{ full_name: user.full_name, address: user.address }}
          onUpdateSuccess={handleUpdateSuccess}
          onCancel={() => setIsEditing(false)}
        />
        <div className="user-back-wrapper">
          <button
            onClick={() => setIsEditing(false)}
            className="user-back-button"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (showOrders) {
    return (
      <div className="user-page-container">
        <UserOrderList />
        <div className="user-back-wrapper">
          <button
            onClick={() => setShowOrders(false)}
            className="user-back-button"
          >
            ← Quay lại thông tin tài khoản
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page-container">
      <h1 className="user-page-title">Thông tin tài khoản</h1>

      <div className="user-info-card">
        <div className="user-info-field">
          <label className="user-info-label">Họ và tên</label>
          <p className="user-info-value">{user.full_name || "Chưa cập nhật"}</p>
        </div>

        <div className="user-info-field">
          <label className="user-info-label">Địa chỉ</label>
          <p className="user-info-value">{user.address || "Chưa cập nhật"}</p>
        </div>

        <div className="user-info-field">
          <label className="user-info-label">Vai trò</label>
          <p className="user-info-value capitalize">{user.role || "user"}</p>
        </div>

        <div className="user-stats-divider">
          <h2 className="user-stats-title">Thống kê mua sắm</h2>
          <div className="user-stats-grid">
            <div className="user-stat-card">
              <p className="user-stat-label">Tổng chi tiêu</p>
              <p className="user-stat-value">
                {user.totalAmounts?.toLocaleString("vi-VN") || "0"} ₫
              </p>
            </div>
            <div className="user-stat-card">
              <p className="user-stat-label">Số đơn hàng</p>
              <p className="user-stat-value">{user.totalOrders || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="user-actions">
        <button onClick={() => setIsEditing(true)} className="user-edit-button">
          Chỉnh sửa thông tin
        </button>
        <button
          onClick={() => setShowOrders(true)}
          className="user-orders-button"
        >
          Xem đơn hàng
        </button>
      </div>

      <div className="user-back-wrapper">
        <button onClick={() => navigate("/")} className="user-back-button">
          ← Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

const UpdateForm = ({ initialData, onUpdateSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: initialData.full_name || "",
    address: initialData.address || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await updateUser(formData.full_name, formData.address);
      setSuccess("Cập nhật thông tin thành công!");
      setTimeout(() => {
        onUpdateSuccess();
      }, 1000);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message || "Có lỗi xảy ra khi cập nhật");
      setSubmitting(false);
    }
  };

  return (
    <div className="update-form-card">
      <h2 className="update-form-title">Chỉnh sửa thông tin</h2>

      {error && <p className="update-error">{error}</p>}
      {success && <p className="update-success">{success}</p>}

      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="full_name">Họ và tên</label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting} className="btn-submit">
            {submitting ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};
