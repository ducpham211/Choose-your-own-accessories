import { supabase } from "../config/supabase.js";
import { createOrder, getOrderById } from "../model/orderModel.js";
import { createOrderItem } from "../model/orderItemModel.js";
import {
  getCartItemByCartId,
  deleteCartItemsByCartId,
} from "../model/cartItemModel.js";
import { getCartByUserId } from "../model/cartModel.js";
import { updateCartPrice } from "../model/cartModel.js";
import { createSupabaseClient } from "../utils/supabaseClient.js";
export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id of order : ", id);
    const order = await getOrderById(id);
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

export const addOrder = async (req, res) => {
  const accessToken = req.accessToken;
  const userId = req.userId;

  try {
    // 1. Lấy cart của user
    const cart = await getCartByUserId(userId);
    if (!cart || cart.length === 0) {
      return res.status(404).json({ error: "Cart not found for this user" });
    }
    const cartId = cart[0].id;

    // 2. Lấy cart items với product info
    const cartItems = await getCartItemByCartId(cartId);
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 3. Tính tổng tiền từ cartItems (đã có product.price)
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += Number(item.products.price) * Number(item.quantity);
    }

    // ✅ 4. TẠO ORDER MỚI (không dùng lại order cũ!)
    const newOrder = await createOrder(userId, totalAmount, accessToken);
    console.log("New order created:", newOrder);
    const orderId = newOrder.id;
    console.log("Order ID:", orderId);
    const temp = await getOrderById(orderId);
    console.log("Temp order fetched:", temp);
    // ✅ 5. Tạo order_items từ cartItems
    for (const item of cartItems) {
      const orderItem = await createOrderItem(
        orderId,
        item.product_id,
        item.quantity,
        item.products.price, // đã có từ join
        accessToken
      );
      console.log("Order item created:", orderItem);
    }

    // 6. Xóa cart items sau khi thanh toán
    await deleteCartItemsByCartId(cartId, accessToken);

    // 7. Cập nhật lại cart total = 0 (tuỳ chọn)
    await updateCartPrice(cartId, 0, accessToken);

    // 8. Trả về order đầy đủ
    const supabaseClient = createSupabaseClient(accessToken);
    const { data: fullOrder, error: fetchError } = await supabaseClient
      .from("orders")
      .select(
        `
        *,
        order_items(
          *,
          products(name, price, image_url)
        )
      `
      )
      .eq("id", orderId)
      .single();

    if (fetchError) {
      console.error("Failed to fetch order with items:", fetchError);
    }

    res.status(201).json({ order: fullOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};
//order controller.js
