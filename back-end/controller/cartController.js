import {
  getCartByUserId,
  updateCartPrice,
  getCartById,
} from "../model/cartModel.js";
import {
  createCartItem,
  getCartItemByCartId,
  updateCartItemQuantity,
  deleteCartItemById,
  getCartItemById,
} from "../model/cartItemModel.js";
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

export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  console.log("id of cart item : ", id);
  const accessToken = req.accessToken;
  try {
    await deleteCartItemById(id, accessToken);
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//cartController

export const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const accessToken = req.accessToken;
  console.log("id of cart item to update quantity: ", id);
  console.log("new quantity: ", quantity);
  const temp = await getCartItemById(id);
  console.log("Temp cart item: ", temp);
  try {
    const updatedItemArray = await updateCartItemQuantity(
      id,
      quantity,
      accessToken
    );
    console.log("Updated item array after update:", updatedItemArray);

    if (!updatedItemArray || updatedItemArray.length === 0) {
      return res.status(404).json({
        error: "Cart item not found or no permission to update (check RLS)",
      }); // Thêm hint về RLS
    }

    const cartItem = updatedItemArray[0];
    const { product_id, cart_id } = cartItem;
    console.log("Updated cart item:", cartItem);
    console.log("Product ID:", product_id);
    console.log("Cart ID:", cart_id);

    if (!product_id) {
      return res.status(400).json({ error: "Missing product_id in cart item" });
    }

    const product = await getProductById(product_id);
    console.log("Product details:", product);

    const allItems = await getCartItemByCartId(cart_id);
    console.log("All items in cart:", allItems);
    let newTotal = 0;
    for (const item of allItems) {
      const itemProduct = await getProductById(item.product_id);
      newTotal += itemProduct.price * item.quantity;
    }
    console.log("New total for cart:", newTotal);

    await updateCartPrice(cart_id, newTotal, accessToken);

    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Update quantity error:", error);
    res.status(500).json({ error: error.message });
  }
};
