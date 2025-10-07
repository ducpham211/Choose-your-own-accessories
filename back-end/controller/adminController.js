// src/controllers/adminController.js
import {
  getTotalProducts,
  getTotalUsers,
  getTotalOrders,
  getTotalRevenue,
  getCurrentMonthRevenue,
  getRecentOrders,
  getRevenueLast6Months,
} from "../model/adminModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await getTotalProducts();
    const totalUsers = await getTotalUsers();
    const totalOrders = await getTotalOrders();
    const totalRevenue = await getTotalRevenue();
    const currentMonthRevenue = await getCurrentMonthRevenue();
    const recentOrders = await getRecentOrders();
    const revenueLast6Months = await getRevenueLast6Months();
    res.status(200).json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      currentMonthRevenue,
      recentOrders,
      revenueLast6Months,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: error.message });
  }
};
//adminController
