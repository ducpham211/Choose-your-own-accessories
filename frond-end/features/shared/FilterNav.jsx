import { useState } from "react";
import { Link } from "react-router-dom";
export const FilterNav = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  return (
    <div>
      <section className="filter-section">
        <div className="filter-wrapper">
          <div className="filter-group">
            <Link to={"/"}>
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                Tất Cả
              </button>
            </Link>
            <Link to={"/shoes"}>
              {" "}
              <button
                className={`filter-btn ${filter === "shoes" ? "active" : ""}`}
                onClick={() => setFilter("shoes")}
              >
                👟 Giày
              </button>
            </Link>
            <Link to={"/shirts"}>
              <button
                className={`filter-btn ${filter === "clothes" ? "active" : ""}`}
                onClick={() => setFilter("clothes")}
              >
                👕 Quần Áo
              </button>
            </Link>
            <Link to={"/accessories"}>
              <button
                className={`filter-btn ${
                  filter === "accessories" ? "active" : ""
                }`}
                onClick={() => setFilter("accessories")}
              >
                🎒 Phụ Kiện
              </button>
            </Link>
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Nổi Bật</option>
            <option value="newest">Mới Nhất</option>
            <option value="price-low">Giá: Thấp → Cao</option>
            <option value="price-high">Giá: Cao → Thấp</option>
          </select>
        </div>
      </section>
    </div>
  );
};
