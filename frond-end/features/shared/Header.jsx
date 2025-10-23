// src/shared/components/Header.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ShoppingCart, LogOut, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "../products/components/SearchBar";
import { getUserInfo } from "../user/services/usersApi";
export const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeUserMenu = () => setIsUserMenuOpen(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserRole(userData);
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

  return (
    <header className="header">
      <Link to="/" className="logo">
        Academy Sports
      </Link>
      <SearchBar />
      <nav className="nav">
        <Link to="/">Trang Chủ</Link>
        <Link to="/shop">Cửa Hàng</Link>
        <Link to="/about">Giới Thiệu</Link>
        <Link to="/contact">Liên Hệ</Link>
      </nav>
      <div className="header-actions">
        {/* 👇 Hiển thị nút đăng nhập/đăng ký nếu chưa đăng nhập */}
        {!user ? (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">
              Đăng Nhập
            </Link>
            <Link to="/register" className="btn-register">
              Đăng Ký
            </Link>
          </div>
        ) : (
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

                {userRole?.role === "admin" && (
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
            <Link to="/cart/items" className="cart-icon">
              <ShoppingCart />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
