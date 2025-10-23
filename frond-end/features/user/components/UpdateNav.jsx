// UpdateProfilePage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../services/usersApi";
import { updateUser } from "../services/usersApi";

const UpdateNav = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setFormData({
          full_name: userData.full_name || "",
          address: userData.address || "",
        });
      } catch (err) {
        console.error("Failed to load user info:", err);
        setError("Không thể tải thông tin người dùng");
        if (err.message?.includes("Not authenticated")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

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
      setTimeout(() => navigate("/user"), 1500);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message || "Có lỗi xảy ra khi cập nhật");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div
      className="update-profile-container"
      style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}
    >
      <h2>Cập nhật thông tin cá nhân</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Họ và tên</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Địa chỉ</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Đang cập nhật..." : "Cập nhật"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "1rem" }}
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default UpdateNav;
