// ProductList.jsx
import { ProductList } from "../../products/components/ProductList";
import { Banner } from "../../shared/components/Banner";
import { FilterNav } from "../../shared/components/FilterNav";
import { Carousel } from "../../shared/components/Carousel";
import { ExpandableGallery } from "../../shared/components/ExpandableGallery";
import { fetchProductList } from "../services/productApi";
import { useState, useEffect } from "react";
export const ProductListPage = () => {
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
      <Carousel />
      <ExpandableGallery />

      <FilterNav />
      <h2 className="product-title">Tất Cả Sản Phẩm</h2>
      <ProductList products={products} loading={loading} />
    </div>
  );
};
