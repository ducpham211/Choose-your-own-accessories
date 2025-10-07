import { useState, useEffect } from "react";
import { fetchShirts } from "../services/productApi";
import { Banner } from "../../shared/components/Banner";
import { FilterNav } from "../../shared/components/FilterNav";
import { Product } from "../../shared/components/Products";
export const ShirtList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchShirts();
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
