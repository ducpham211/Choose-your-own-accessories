import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../../src/App.css";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { SearchBar } from "../../products/components/SearchBar";
import { User } from "lucide-react";
export const Header = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Fit Zone
      </Link>
      <SearchBar />
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="header-actions">
        <Link to="/user" className="user-icon">
          <User />
        </Link>
        <Link to="/cart/items" className="cart-icon">
          <ShoppingCart />
        </Link>
        <button onClick={handleSignOut} className="sign-out-btn">
          <LogOut />
        </button>
      </div>
    </header>
  );
};
//header.jsx
