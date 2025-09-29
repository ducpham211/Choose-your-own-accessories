user:

Lưu thông tin người dùng (khách hàng).
Cột ví dụ: id, email, name, password, created_at.
Ý nghĩa: Quản lý tài khoản, xác thực, và liên kết với giỏ hàng/đơn hàng.

product:

Lưu thông tin sản phẩm bán trong cửa hàng.
Cột ví dụ: id, name, price, description, stock, image_url.
Ý nghĩa: Cung cấp dữ liệu sản phẩm để hiển thị và xử lý trong giỏ hàng/đơn hàng.

cart:

Lưu thông tin giỏ hàng của người dùng.
Cột ví dụ: id, user_id (khóa ngoại liên kết với user), created_at.
Ý nghĩa: Đại diện cho giỏ hàng của một người dùng, chứa các mục sản phẩm (cart_item).

cart_item:

Lưu chi tiết các sản phẩm trong giỏ hàng.
Cột ví dụ: id, cart_id (khóa ngoại liên kết với cart), product_id (khóa ngoại liên kết với product), quantity.
Ý nghĩa: Quản lý số lượng và sản phẩm cụ thể trong giỏ hàng.

order:

Lưu thông tin đơn hàng khi người dùng đặt mua.
Cột ví dụ: id, user_id (khóa ngoại liên kết với user), total_price, status (pending, completed, cancelled), created_at.
Ý nghĩa: Đại diện cho một đơn hàng hoàn chỉnh, lưu tổng giá và trạng thái.

order_item:

Lưu chi tiết các sản phẩm trong đơn hàng.
Cột ví dụ: id, order_id (khóa ngoại liên kết với order), product_id (khóa ngoại liên kết với product), quantity, unit_price.
Ý nghĩa: Lưu thông tin sản phẩm và số lượng trong đơn hàng, giúp theo dõi chi tiết đơn hàng.

Mối quan hệ:

Một-nhiều:

Một user có thể có một cart và nhiều order.
Một cart có nhiều cart_item.
Một order có nhiều order_item.

Khóa ngoại:

cart.user_id liên kết với user.id.
cart_item.cart_id liên kết với cart.id, cart_item.product_id liên kết với product.id.
order.user_id liên kết với user.id.
order_item.order_id liên kết với order.id, order_item.product_id liên kết với product.id.

Quy trình e-commerce:

Người dùng (user) thêm sản phẩm (product) vào giỏ hàng (cart, cart_item).
Khi đặt hàng, giỏ hàng chuyển thành đơn hàng (order, order_item).
Dữ liệu từ các bảng được dùng để hiển thị sản phẩm, tính tổng giá, và theo dõi trạng thái đơn hàng.

bây giờ tôi sẽ gửi cho bạn đầy đủ phần backend của tôi ( ở dưới mỗi file tôi có kèm theo tên cho bạn dễ phân biệt )
import { supabase } from "../config/supabase";

export const createCartItem = async (cartId, productId, quantity) => {
try {
const { data, error } = await supabase
.from("cart_items")
.insert([{ cart_id: cartId, product_id: productId, quantity }])
.select()
.single();
if (error) throw new Error(error.message);
return data;
} catch (error) {
throw new Error(`Failed to create Cart item: ${error.message}`);
}
};
export const getCartItemByCartId = async (cartId) => {
try {
const { data, error } = await supabase
.from("cart-items")
.select()
.eq("cart_id", cartId);
if (error) throw new Error(error.message);
} catch (error) {
throw new Error(`Failed to create Cart item: ${error.message}`);
}
};

export const deleteCartItemsByCartId = async (cartId) => {
const { error } = await supabase
.from("cart_item")
.delete()
.eq("cart_id", cartId);
if (error) throw new Error(error.message);
};

//cartItemModel
import { supabase } from "../config/supabase";

export const getCartByUserId = async (id) => {
try {
const { data, error } = await supabase
.from("cart")
.select("_,cart_items(_,products(\*))")
.eq("user_id", id)
.single();
if (error) throw new Error(error.message);
return data;
} catch {
throw new Error(`Failed to get Cart by user id ${error.message}`);
}
};

export const createCart = async (id) => {
try {
const { data, error } = await supabase
.from("cart")
.insert({ user_id: id })
.select()
.single();
if (error) throw new Error(error.message);
return data;
} catch (error) {
if (error) throw new Error(`failed to create cart ${error.message}`);
}
};

//cartModel
import { supabase } from "../config/supabase";

export const getProductById = async (id) => {
try {
const { data, error } = await supabase
.from("products")
.select("\*")
.eq("id", id)
.single();
if (error) throw new Error(error.message);
return data;
} catch (error) {
throw new Error(`Failed to get products by id : ${error.message}`);
}
};

export const getAllProducts = async () => {
try {
const { data, error } = await supabase.from("products").select("\*");
if (error) throw new Error(error.message);
return data;
} catch (error) {
throw new Error(`Failed to get all products ${error.messageS}`);
}
};

export const createProduct = async (
name,
description,
price,
image_url,
stock,
category
) => {
try {
const { data, error } = await supabase
.from("products")
.insert([{ name, description, price, image_url, stock, category }])
.select()
.single();
if (error) throw new Error(error.message);
return data;
} catch (error) {
throw new Error(`Failed to get all products ${error.messageS}`);
}
};

//productModel

import { supabase } from "../config/supabase";

export const createOrderItem = async (orderId, productId, quantity, price) => {
try {
const { data, error } = await supabase
.from("order_items")
.insert([{ order_id: orderId, product_id: productId, quantity, price }])
.select()
.single();
if (error) throw new Error(error.message);
return data;
} catch (error) {
throw new Error(`Failed to create order item: ${error.message}`);
}
};

//orderItemModel

import { supabase } from "../config/supabase";

export const getUserById = async (id) => {
try {
const { data, error } = await supabase
.from("users")
.select("\*")
.eq("id", id)
.single();
if (error) throw new Error(error.message);
return data;
} catch (error) {
throw new Error(`Faili to get user :${error.message}`);
}
};

//userModel

import { supabase } from "../config/supabase";

export const getUserIdFromSession = async (req, res, next) => {
try {
// Lấy token từ header (Authorization: Bearer <token>)
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith("Bearer ")) {
return res
.status(401)
.json({ error: "Authorization header missing or invalid" });
}

    const token = authHeader.split(" ")[1];

    // Verify token và lấy user info từ Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Gắn user ID vào request để dùng ở các phần sau
    req.userId = user.id;
    next(); // Chuyển tiếp nếu thành công

} catch (err) {
console.error("Error in getUserIdFromSession:", err);
return res.status(500).json({ error: "Internal server error" });
}
};

//authMiddlewares

import {
getAllProducts,
getProductById,
createProduct,
} from "../model/productModel";

export const getProducts = async (req, res) => {
try {
const products = await getAllProducts();
console.log(products);
res.json(products);
} catch {
res.status(500).json({ error: error.message });
}
};

export const getProduct = async (req, res) => {
try {
const { id } = req.params;
const product = await getProductById(id);
console.log(product);
res.json({ product });
} catch {
res.status(500).json({ error: error.message });
}
};

export const createNewProduct = async (req, res) => {
try {
const { name, description, price, image_url, stock, category } = req.body;
console.log(req.body);
const products = await createProduct(
name,
description,
price,
image_url,
stock,
category
);
res.status(201).json(products);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

//product controller

import { supabase } from "../config/supabase";
import { getCartItemByCartId } from "../model/cartItemModel";
import { getCartByUserId } from "../model/cartModel";
import { getOrderById } from "../model/orderModel";

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
const userId = req.userId;
try {
const cart = await getCartByUserId(userId);
if (!cart)
return res.status(404).json({ error: "Cart not found for this user" });
const cartId = cart.id;
const cartItems = await (cartId);
if (!cartItems)
return res
.status(404)
.json({ error: "Cart item not found for this user" });
let totalAmount = 0;
for (const item of cartItems) {
const { data: product } = await supabase
.from("products")
.select("price")
.eq("id", item.product_id)
.single();
if (product) {
totalAmount += product.price \* item.quantity;
}
}
const order = await createOrder(userId, totalAmount);
const orderId = order.id;

    for (const item of cartItems) {
      const { data: product } = await supabase
        .from("product")
        .select("price")
        .eq("id", item.product_id)
        .single();
      await createOrderItem(
        orderId,
        item.product_id,
        item.quantity,
        product.price
      );
    }

    await deleteCartItemsByCartId(cartId);

    res.status(201).json({ message: "Order created successfully", order });

} catch (error) {
console.error("Error creating order:", error);
res.status(500).json({ error: error.message });
}
};

//orderController
import { supabase } from "../config/supabase";
import { getCartByUserId } from "../model/cartModel";
import { createCartItem } from "../model/cartItemModel";
export const getCart = async (req, res) => {
const { id } = req.params;
try {
const cart = await getCartByUserId(id);
console.log(cart);
res.status(201).json(cart);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

export const addCartItem = async (req, res) => {
const userId = req.userId;
const { product_id, quantity } = req.body;
console.log("product_id: ", product_id);
console.log("quantity : ", quantity);
try {
const cart = await getCartByUserId(userId);
console.log(cart);
const cartId = cart.id;
const cartItem = await createCartItem(cartId, product_id, quantity);
res.status(201).json(cartItem);
} catch (error) {
res.status(500).json({ error: error.message });
}
};
/// Create card được tự động tạo khi user được tạo ( Trigger trong supabase )
//cartController
import { supabase } from "../config/supabase";
import { getUser } from "../controller/authController";
import express from "express";

const router = express.Router();

router.get("/auth/user", getUser);

module.exports = router;

//authRoutes
import express from "express";
import { getCart, addCartItem } from "../controller/cartController";
import { getUserIdFromSession } from "../middlewares/authMiddlewares";

const router = express.Router();

router.get("/cart/:id", getUserIdFromSession, getCart);
router.post("/cart/add", getUserIdFromSession, addCartItem);

module.exports = router;
//cartRoutes
import express from "express";
import { getOrder, addOrder } from "../controller/orderController";
import { getUserIdFromSession } from "../middlewares/authMiddlewares";
const router = express.Router();

router.get("/order", getUserIdFromSession, getOrder);
router.post("/order/add", getUserIdFromSession, addOrder);

module.exports = router;
//orderRoutes

import express from "express";
import {
getProduct,
getProducts,
createNewProduct,
} from "../controller/productController";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/createProduct", createNewProduct);

module.exports = router;
//productRoutes

cần chỉnh sửa chỗ nào không, nếu có sửa thì hãy sửa theo hướng làm của
Module of Frond End : feature-based

// axios
// .get("http://localhost:3000/api/products")
// .then((response) => {
setProducts(response);
setLoading(false);
})
.catch((error) => {
console.error("Lỗi khi lấy sản phẩm:", error);
setLoading(false);
});
}, []);
Đây là thông tin cơ bản về trang web tôi đang code, back end làm bằng node js, express còn frond end làm bằng react js
