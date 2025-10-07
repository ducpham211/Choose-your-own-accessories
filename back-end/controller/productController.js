import {
  getAllProducts,
  getProductById,
  createProduct,
  getShoes,
  getShirts,
  getAccessories,
} from "../model/productModel.js";
import { searchProducts } from "../model/productModel.js";
export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    console.log(product);
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, stock, category } = req.body;
    const accessToken = req.accessToken;

    const product = await createProduct(
      name,
      description,
      price,
      image_url,
      stock,
      category,
      accessToken
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchProductsHandler = async (req, res) => {
  const { q } = req.query;
  console.log(`Received search query: ${q}`);

  try {
    const products = await searchProducts(q || "");
    console.log(`Sending products: ${JSON.stringify(products)}`);
    res.json(products);
  } catch (error) {
    console.error(`Search handler error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const searchShoes = async (req, res) => {
  try {
    const shoes = await getShoes();
    console.log("Shoes fetched : ", shoes);
    res.status(201).json(shoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const searchShirts = async (req, res) => {
  try {
    const shirts = await getShirts();
    console.log("shirts fetched : ", shirts);
    res.status(201).json(shirts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const searchAccessories = async (req, res) => {
  try {
    const accessories = await getAccessories();
    console.log("accessories fetched : ", accessories);
    res.status(201).json(accessories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// productController.js
