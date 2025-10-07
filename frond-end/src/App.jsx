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
import { ChatFeature } from "../features/chat/pages/chatFeatures";
import { Shop } from "../features/shared/components/Shop";
import { About } from "../features/shared/components/About";
import { Contact } from "../features/shared/components/Contact";
import { ShoesList } from "../features/products/components/ShoesList";
import { AccessoriesList } from "../features/products/components/AccessoriesList";
import { ShirtList } from "../features/products/components/ShirtList";
import { AdminDashboardPage } from "../features/admin/pages/AdminDashboardPage";
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
        <Route path="/shop" element={user ? <Shop /> : <AuthForm />} />
        <Route path="/about" element={user ? <About /> : <AuthForm />} />
        <Route path="/contact" element={user ? <Contact /> : <AuthForm />} />
        <Route path="/shoes" element={user ? <ShoesList /> : <AuthForm />} />
        <Route path="/shirts" element={user ? <ShirtList /> : <AuthForm />} />
        <Route
          path="/accessories"
          element={user ? <AccessoriesList /> : <AuthForm />}
        />
        <Route
          path="/admin"
          element={user ? <AdminDashboardPage /> : <AuthForm />}
        />
      </Routes>
      {user && <Footer />}
      {user && <ChatFeature />}
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
