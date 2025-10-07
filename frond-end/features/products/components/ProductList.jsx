// ProductList.jsx
import { Product } from "../../shared/components/Products";
import { Banner } from "../../shared/components/Banner";
import { FilterNav } from "../../shared/components/FilterNav";
import { fetchProductList } from "../services/productApi";
import { useState, useEffect } from "react";
export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductList();
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="product-list-container">
      <Banner />
      <FilterNav />
      <Product products={products} loading={loading} />
    </div>
  );
};
