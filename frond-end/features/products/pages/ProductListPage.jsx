// ProductList.jsx
import { ProductList } from "../../products/components/ProductList";
import { Banner } from "../../shared/Banner";
import { FilterNav } from "../../shared/FilterNav";
import { Carousel } from "../../shared/Carousel";
import { ExpandableGallery } from "../../shared/ExpandableGallery";
import { fetchProductList } from "../services/productApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [navigate]);
  return (
    <div className="product-list-container">
      <Banner />
      <Carousel />
      <ExpandableGallery />

      <FilterNav />
      <h2 className="product-title">Tất Cả Sản Phẩm</h2>
      <ProductList products={products} loading={loading} />
    </div>
  );
};
//pages
