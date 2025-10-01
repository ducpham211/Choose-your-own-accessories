import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AuthForm from "../features/auth/components/AuthenticationForm";
import { ProductList } from "../features/products/components/ProductList";
import { ProductCard } from "../features/products/components/ProductCard";
import { CartList } from "../features/cart/components/CartList";
import { Header } from "../features/shared/components/Header";
import { Footer } from "../features/shared/components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { OrderList } from "../features/orders/components/OrderList";
import { UserPage } from "../features/auth/components/UserPage";
const AppContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/" element={user ? <ProductList /> : <AuthForm />} />
        <Route
          path="/products/:id"
          element={user ? <ProductCard /> : <AuthForm />}
        />
        <Route path="/user" element={user ? <UserPage /> : <AuthForm />} />
        <Route
          path="/cart/items"
          element={user ? <CartList /> : <AuthForm />}
        />
        <Route path="/checkout" element={user ? <OrderList /> : <AuthForm />} />
      </Routes>
      {user && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
