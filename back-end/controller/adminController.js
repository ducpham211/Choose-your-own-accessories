// src/controllers/adminController.js
import {
  getTotalProducts,
  getTotalUsers,
  getTotalOrders,
  getTotalRevenue,
  getCurrentMonthRevenue,
  getRecentOrders,
  getRevenueLast6Months,
  getOrdersByDay,
  getRevenueByCategory,
  getTopSpendingCustomers,
} from "../model/adminModel.js";
import { getAllOrder } from "../model/orderModel.js";
export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await getTotalProducts();
    const totalUsers = await getTotalUsers();
    const totalOrders = await getTotalOrders();
    const totalRevenue = await getTotalRevenue();
    const currentMonthRevenue = await getCurrentMonthRevenue();
    const recentOrders = await getRecentOrders();
    const revenueLast6Months = await getRevenueLast6Months();
    const ordersByDay = await getOrdersByDay();
    const revenueByCategory = await getRevenueByCategory();
    const topSpendingCustomers = await getTopSpendingCustomers();
    res.status(200).json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      currentMonthRevenue,
      recentOrders,
      revenueLast6Months,
      ordersByDay,
      revenueByCategory,
      topSpendingCustomers,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllOfOrders = async (req, res) => {
  try {
    const AllOrders = await getAllOrder();
    res.status(200).json(AllOrders);
  } catch (error) {
    console.error("get all orders error:", error);
    res.status(500).json({ error: error.message });
  }
};
//adminController
