import axios from "axios";

export const fetchProductCard = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );
    return response.data.product;
  } catch (error) {
    throw new Error(`Failed to get cart product ${error.message}`);
  }
};

export const fetchProductList = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get list of productW ${error.message}`);
  }
};

export const searchProducts = async (query) => {
  try {
    console.log(`Frontend search query: ${query}`);
    const response = await axios.get(
      `http://localhost:3000/api/products/search?q=${encodeURIComponent(query)}`
    );
    console.log(`Frontend received: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error(`Frontend search error: ${error.message}`);
    throw new Error(`Failed to search products: ${error.message}`);
  }
};
//productApi.jsx
