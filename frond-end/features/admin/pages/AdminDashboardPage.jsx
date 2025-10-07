// src/features/admin/pages/AdminDashboardPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdminStats } from "../services/adminApi";
import { StatCard } from "../components/StatCard";
import { RevenueChart } from "../components/RevenueChart";

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
        if (err.message.includes("403") || err.message.includes("401")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [navigate]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">❌ {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">📊 Bảng Điều Khiển Quản Trị</h1>

      {/* Thống kê nhanh */}
      <div className="stats-grid">
        <StatCard title="Tổng Sản Phẩm" value={stats.totalProducts} icon="👟" />
        <StatCard title="Tổng Người Dùng" value={stats.totalUsers} icon="👥" />
        <StatCard title="Tổng Đơn Hàng" value={stats.totalOrders} icon="📦" />
        <StatCard
          title="Tổng Doanh Thu"
          value={
            new Intl.NumberFormat("vi-VN").format(stats.totalRevenue) + " ₫"
          }
          icon="💰"
        />
        <StatCard
          title="Doanh Thu Tháng Này"
          value={
            new Intl.NumberFormat("vi-VN").format(stats.currentMonthRevenue) +
            " ₫"
          }
          icon="📈"
        />
      </div>

      {/* Biểu đồ */}
      <div className="chart-section">
        <h2 className="chart-title">Doanh Thu Gần Đây</h2>
        <RevenueChart data={stats.revenueLast6Months} />
      </div>
    </div>
  );
};
