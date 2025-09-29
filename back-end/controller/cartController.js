import { supabase } from "../config/supabase.js";
import { getCartByUserId, updateCartPrice } from "../model/cartModel.js";
import { createCartItem, getCartItemByCartId } from "../model/cartItemModel.js";
import { getProductById } from "../model/productModel.js";
export const getCart = async (req, res) => {
  const userId = req.userId;
  try {
    const cart = await getCartByUserId(userId);
    console.log(cart);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  const userId = req.userId;
  console.log("id user : ", userId);
  try {
    const cart = await getCartByUserId(userId);
    console.log("cart of user : ", cart);
    const cartItems = await getCartItemByCartId(cart[0].id);
    console.log("cart items :", cartItems);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCartItem = async (req, res) => {
  const accessToken = req.accessToken;
  const userId = req.userId;
  const { product_id, quantity } = req.body;
  console.log("product_id: ", product_id);
  console.log("quantity : ", quantity);
  try {
    const cart = await getCartByUserId(userId);
    console.log("Current total : ", cart[0].total);
    console.log(cart);
    const currentTotal = cart[0].total;
    console.log("current total : ", currentTotal);
    const product = await getProductById(product_id);
    console.log("current product : ", product);
    const newTotal = product.price * quantity;
    console.log("new total :", newTotal);
    const finallyTotal = currentTotal + newTotal;
    console.log("finally total :", finallyTotal);
    const cartId = cart[0].id; // trả về mảng nên phải dùng [0]
    console.log("id of cart : ", cartId);
    const cartItem = await createCartItem(cartId, product_id, quantity);
    await updateCartPrice(cartId, finallyTotal, accessToken);
    const updatedCart = await getCartByUserId(userId);
    console.log("total price after update : ", updatedCart[0].total);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/// Create card được tự động tạo khi user được tạo ( Trigger trong supabase )

//cartController
