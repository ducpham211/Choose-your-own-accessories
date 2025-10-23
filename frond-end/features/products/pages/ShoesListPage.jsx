import { useState, useEffect } from "react";
import { fetchShoes } from "../services/productApi";
import { Banner } from "../../shared/Banner";
import { FilterNav } from "../../shared/FilterNav";
import { ProductList } from "../components/ProductList";
import { useNavigate } from "react-router-dom";
export const ShoesListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchShoes();
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [navigate]);
  return (
    <div className="product-list-container">
      <Banner />
      <FilterNav />
      <h2 className="product-title">Tất Cả Giày</h2>
      <ProductList products={products} loading={loading} />
    </div>
  );
};
