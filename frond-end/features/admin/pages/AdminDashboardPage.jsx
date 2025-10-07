// src/features/admin/pages/AdminDashboardPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdminStats } from "../services/adminApi";
import { StatCard } from "../components/StatCard";
import { RevenueChart } from "../components/RevenueChart";
import { OrdersLineChart } from "../components/OrdersLineChart";
import { RevenuePieChart } from "../components/RevenuePieChart";
import { TopCustomersChart } from "../components/TopCustomersChart";
import { OrdersList } from "../components/OrderList";
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
      <h1 className="dashboard-title">📊 Bảng Điều Khiển</h1>

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

      <div className="charts-container">
        {/* Biểu đồ Doanh Thu - Full Width */}
        <div className="chart-section revenue-chart-wrapper">
          <h2 className="chart-title">📈 Doanh Thu 6 Tháng Gần Nhất</h2>
          <RevenueChart data={stats.revenueLast6Months} />
        </div>

        {/* Biểu đồ Orders và Pie - Side by Side */}
        <div className="charts-row">
          <div className="chart-section orders-chart-wrapper">
            <h2 className="chart-title">📊 Xu Hướng Đơn Hàng</h2>
            <OrdersLineChart data={stats.ordersByDay} />
          </div>

          <div className="chart-section pie-chart-wrapper">
            <h2 className="chart-title">📉 Phân Bổ Theo Danh Mục</h2>
            <RevenuePieChart data={stats.revenueByCategory} />
          </div>
        </div>
      </div>
      <div className="top-customers-section">
        <TopCustomersChart data={stats.topSpendingCustomers} />
      </div>
      <OrdersList />
    </div>
  );
};
