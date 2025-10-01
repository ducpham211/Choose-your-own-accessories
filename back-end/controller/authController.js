import { supabase } from "../config/supabase.js";
import { getUserById } from "../model/userModel.js";
import { getOrdersById } from "../model/orderModel.js";
export const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user)
      return res.status(401).json({ error: "Invalid or expired token" });

    let dbUser = await getUserById(user.id);
    if (!dbUser) {
      dbUser = await createUser(user.id, user.email);
    }
    const orders = await getOrdersById(user.id);
    if (!orders) {
      console.log("No existing order found for user.");
    }
    let totalAmounts = 0;
    for (const ord of orders) {
      totalAmounts += ord.total_price;
    }
    console.log("Total spent calculated:", totalAmounts);
    const totalOrders = orders.length;
    console.log("Total orders calculated:", totalOrders);
    res.json({
      user: {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
        totalAmounts,
        totalOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};
