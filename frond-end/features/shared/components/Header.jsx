// src/shared/components/Header.jsx (hoặc đường dẫn của bạn)
import React, { useContext, useState, useEffect } from "react";
import { getUserInfo } from "../../auth/services/userApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ShoppingCart, LogOut, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "../../products/components/SearchBar";

export const Header = () => {
  const navigate = useNavigate(); // 👈 PHẢI KHAI BÁO TRƯỚC useEffect

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Thêm state loading
  const [error, setError] = useState(null); // 👈 Thêm state error
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { signOut } = useContext(AuthContext);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch (err) {
        console.error("Failed to load user info:", err);
        setError(err.message || "Không thể tải thông tin người dùng");
        if (
          err.message?.includes("Please log in") ||
          err.message?.includes("Not authenticated")
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsUserMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  // 👇 Trong lúc loading, có thể ẩn dropdown hoặc hiển thị skeleton
  if (loading) {
    return (
      <header className="header">
        <div className="logo">Fit Zone</div>
        <SearchBar />
        <nav className="nav">
          <Link to="/">Trang Chủ</Link>
          <Link to="/shop">Cửa Hàng</Link>
          <Link to="/about">Giới Thiệu</Link>
          <Link to="/contact">Liên Hệ</Link>
        </nav>
        <div className="header-actions">
          <div className="user-icon skeleton"></div>
          <div className="cart-icon skeleton"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        Fit Zone
      </Link>
      <SearchBar />
      <nav className="nav">
        <Link to="/">Trang Chủ</Link>
        <Link to="/shop">Cửa Hàng</Link>
        <Link to="/about">Giới Thiệu</Link>
        <Link to="/contact">Liên Hệ</Link>
      </nav>
      <div className="header-actions">
        {/* Dropdown User Menu */}
        <div className="user-menu-container">
          <button
            onClick={toggleUserMenu}
            className="user-icon"
            aria-label="User menu"
          >
            <User />
            <ChevronDown size={14} className="chevron-down" />
          </button>

          {isUserMenuOpen && (
            <div className="user-dropdown">
              <Link
                to="/user"
                className="dropdown-item"
                onClick={closeUserMenu}
              >
                <User size={16} />
                <span>Tài Khoản</span>
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="dropdown-item"
                  onClick={closeUserMenu}
                >
                  <span>📊 Quản Trị</span>
                </Link>
              )}

              <button
                className="dropdown-item sign-out-item"
                onClick={handleSignOut}
              >
                <LogOut size={16} />
                <span>Đăng Xuất</span>
              </button>
            </div>
          )}
        </div>

        <Link to="/cart/items" className="cart-icon">
          <ShoppingCart />
        </Link>
      </div>
    </header>
  );
};
