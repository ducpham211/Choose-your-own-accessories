import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../model/productModel.js";

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

//product controller
