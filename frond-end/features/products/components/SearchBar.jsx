// src/features/products/components/SearchBar.jsx
import { useState, useEffect, useRef } from "react";
import { searchProducts } from "../services/productApi.jsx";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");

  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setError("");
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const results = await searchProducts(query);
        console.log(`Suggestions set: ${JSON.stringify(results)}`);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        setError("Không tìm thấy sản phẩm.");
        console.error(`SearchBar error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div
      className="search-bar"
      ref={searchBarRef}
      style={{ position: "relative", width: "300px" }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowSuggestions(true)}
        placeholder="Tìm sản phẩm..."
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {loading && (
        <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
          Đang tìm...
        </div>
      )}
      {error && (
        <div style={{ fontSize: "12px", color: "red", marginTop: "4px" }}>
          {error}
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginTop: "4px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug || product.id}`}
              style={{
                display: "flex",
                padding: "10px",
                textDecoration: "none",
                color: "black",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => {
                setQuery("");
                setShowSuggestions(false);
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              )}
              <div>
                <div>{product.name}</div>
                <div style={{ color: "green", fontSize: "14px" }}>
                  {product.price.toLocaleString()} VND
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
