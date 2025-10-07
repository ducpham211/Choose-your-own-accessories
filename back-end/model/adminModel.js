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
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Sử dụng định dạng thời gian không phụ thuộc múi giờ
    const startDateISO = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-01T00:00:00`;
    const endDateISO = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${endOfMonth.getDate()}T23:59:59.999`;

    console.log("Start of month:", startDateISO);
    console.log("End of month:", endDateISO);

    const { data, error } = await supabase
      .from("orders")
      .select("total_price, status, created_at")
      .gte("created_at", startDateISO)
      .lte("created_at", endDateISO);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    console.log("Raw orders data:", data);
    console.log("All status values:", [
      ...new Set(data.map((order) => order.status)),
    ]);

    const validOrders = data.filter(
      (order) => order.status && order.status.toLowerCase() !== "cancelled"
    );
    console.log("Valid orders:", validOrders);

    const totalRevenue = validOrders.reduce(
      (sum, order) => sum + (order.total_price || 0),
      0
    );
    console.log("Total revenue:", totalRevenue);

    return totalRevenue;
  } catch (error) {
    console.error("Error in getCurrentMonthRevenue:", error);
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
// Lấy xu hướng đơn hàng theo ngày (30 ngày gần nhất)
export const getOrdersByDay = async () => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 ngày trước
    const startDateISO = thirtyDaysAgo.toISOString();

    // Lấy đơn hàng không hủy, nhóm theo ngày
    const { data, error } = await supabase
      .from("orders")
      .select("created_at, status")
      .gte("created_at", startDateISO)
      .eq("status", "completed")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);

    // Nhóm theo ngày (YYYY-MM-DD)
    const ordersByDay = data.reduce((acc, order) => {
      const dateKey = new Date(order.created_at).toISOString().split("T")[0]; // Chỉ lấy ngày
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    // Tạo labels và values cho 30 ngày (thêm 0 nếu ngày không có đơn)
    const labels = [];
    const values = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split("T")[0];
      labels.unshift(dateKey);
      values.unshift(ordersByDay[dateKey] || 0);
    }

    console.log("Orders by day:", {
      labels: labels.slice(-7),
      values: values.slice(-7),
    });
    return { labels, values };
  } catch (error) {
    throw new Error(`Failed to get orders by day: ${error.message}`);
  }
};
export const getRevenueByCategory = async () => {
  try {
    // Join qua order_items với orders và products
    const { data, error } = await supabase
      .from("order_items")
      .select(
        `
        price,
        quantity,
        orders!inner(status),
        products!inner(category)
      `
      )
      .eq("orders.status", "completed")
      .order("price", { ascending: false });

    if (error) throw new Error(error.message);

    console.log("Raw order_items data:", data.slice(0, 5));

    // Tính tổng doanh thu theo category (price * quantity)
    const revenueByCategory = data.reduce((acc, item) => {
      const category = item.products?.category || "Khác"; // Xử lý nếu category null
      const revenueItem = (item.price || 0) * (item.quantity || 1); // Nhân price với quantity (mặc định 1 nếu null)
      acc[category] = (acc[category] || 0) + revenueItem;
      return acc;
    }, {});

    // Chuyển thành labels và values
    const labels = Object.keys(revenueByCategory);
    const values = Object.values(revenueByCategory);

    console.log("Revenue by category:", { labels, values });
    return { labels, values };
  } catch (error) {
    console.error("Error in getRevenueByCategory:", error);
    throw new Error(`Failed to get revenue by category: ${error.message}`);
  }
};

// Lấy top 5 khách hàng chi tiêu nhiều nhất (chỉ dùng email làm tên)
export const getTopSpendingCustomers = async () => {
  try {
    // Query join orders với users, chỉ select id và email, lọc status không phải "cancelled"
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        total_price,
        status,
        users (
          id,
          email
        )
      `
      )
      .neq("status", "cancelled") // Lọc đơn không hủy
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    console.log("Raw orders data for top customers:", orders.slice(0, 5)); // Log 5 đơn đầu để kiểm tra

    // Group theo user_id và tính tổng total_price
    const spendingByUser = orders.reduce((acc, order) => {
      const userId = order.users?.id;
      if (!userId) return acc; // Bỏ qua nếu không có user

      const email = order.users.email || "N/A";

      if (!acc[userId]) {
        acc[userId] = {
          email, // Sử dụng email làm tên chính
          total_spent: 0,
        };
      }
      acc[userId].total_spent += order.total_price || 0;
      return acc;
    }, {});

    // Chuyển thành array, sắp xếp giảm dần theo total_spent, lấy top 5
    const topCustomers = Object.values(spendingByUser)
      .sort((a, b) => b.total_spent - a.total_spent)
      .slice(0, 5)
      .map((customer) => ({
        ...customer,
        customer_name: customer.email, // Thêm field customer_name = email để frontend dùng
      }));

    console.log("Top spending customers:", topCustomers);
    return topCustomers;
  } catch (error) {
    console.error("Error in getTopSpendingCustomers:", error);
    throw new Error(`Failed to get top spending customers: ${error.message}`);
  }
};

//adminModel
