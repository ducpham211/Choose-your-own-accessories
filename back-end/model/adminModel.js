// src/models/adminModel.js
import { supabase } from "../config/supabase.js";

// Lấy tổng số sản phẩm
export const getTotalProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw new Error(error.message);
    console.log("total of products : ", data.length);
    return data.length;
  } catch (error) {
    throw new Error(`Failed to get total products: ${error.message}`);
  }
};

// Lấy tổng số người dùng
export const getTotalUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw new Error(error.message);
    console.log("total of Users : ", data.length);
    return data.length;
  } catch (error) {
    throw new Error(`Failed to get total users: ${error.message}`);
  }
};

// Lấy tổng số đơn hàng
export const getTotalOrders = async () => {
  try {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) throw new Error(error.message);
    console.log("total of orders : ", data.length);
    return data.length;
  } catch (error) {
    throw new Error(`Failed to get total orders: ${error.message}`);
  }
};

// Lấy tổng doanh thu (chỉ đơn không bị huỷ)
export const getTotalRevenue = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("total_price, status");
    if (error) throw new Error(error.message);

    // Lọc bỏ đơn bị huỷ, rồi tính tổng
    const validOrders = data.filter((order) => order.status !== "cancelled");
    const total = validOrders.reduce(
      (sum, order) => sum + (order.total_price || 0),
      0
    );
    console.log("total of revenue : ", total);
    return total;
  } catch (error) {
    throw new Error(`Failed to get total revenue: ${error.message}`);
  }
};

//  Lấy tổng doanh thu của THÁNG HIỆN TẠI

export const getCurrentMonthRevenue = async () => {
  try {
    // 1. Xác định ngày đầu và cuối của tháng hiện tại
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const startOfMonth = new Date(currentYear, currentMonth, 1); // Ngày 1
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0); // Ngày cuối tháng

    const startDateISO = startOfMonth.toISOString();
    const endDateISO = new Date(endOfMonth.getTime() + 86399999).toISOString();

    // 2. Lấy đơn hàng trong tháng hiện tại
    const { data, error } = await supabase
      .from("orders")
      .select("total_price, status, created_at")
      .gte("created_at", startDateISO)
      .lte("created_at", endDateISO);
    console.log("data from current month : ", data);
    console.log("Date ISO : ", startDateISO);
    console.log("Date ISO : ", endDateISO);
    console.log("now : ", now);
    console.log("current month : ", currentMonth);
    if (error) throw new Error(error.message);

    // 3. Lọc đơn hợp lệ và tính tổng
    const validOrders = data.filter((order) => order.status !== "cancelled");
    console.log("valid order from current month revenue : ", validOrders);
    const totalRevenue = validOrders.reduce(
      (sum, order) => sum + (order.total_price || 0),
      0
    );
    console.log("total of revenue : ", totalRevenue);
    return totalRevenue;
  } catch (error) {
    throw new Error(
      `Failed to get revenue for current month: ${error.message}`
    );
  }
};

export const getRecentOrders = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    console.log("total of products : ", data.slice(0, 5));
    return data.slice(0, 5);
  } catch (error) {
    throw new Error(`Failed to get recent orders: ${error.message}`);
  }
};
// src/models/adminModel.js

export const getRevenueLast6Months = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("created_at, total_price, status");
    if (error) throw new Error(error.message);

    const validOrders = data.filter((order) => order.status !== "cancelled");

    // Tạo mảng 6 tháng gần nhất (có thể có tháng không có đơn → doanh thu = 0)
    const now = new Date();
    const labels = [];
    const revenueMap = {};

    // Khởi tạo 6 tháng gần nhất
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(now.getMonth() - i);
      const key = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      labels.push(key);
      revenueMap[key] = 0;
    }

    // Cộng dồn doanh thu
    validOrders.forEach((order) => {
      const monthKey = new Date(order.created_at).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (revenueMap.hasOwnProperty(monthKey)) {
        revenueMap[monthKey] += order.total_price || 0;
      }
    });

    const values = labels.map((label) => revenueMap[label]);

    return { labels, values };
  } catch (error) {
    throw new Error(`Failed to get revenue last 6 months: ${error.message}`);
  }
};

//adminModel
