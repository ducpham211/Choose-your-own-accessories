import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AuthForm from "../features/auth/components/AuthenticationForm";
import { ProductListPage } from "../features/products/pages/ProductListPage";
import { ProductCard } from "../features/products/components/ProductCard";
import { CartListPage } from "../features/cart/pages/CartListPage";
import { Header } from "../features/shared/components/Header";
import { Footer } from "../features/shared/components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { OrderListPage } from "../features/orders/pages/OrderListPage";
import { UserPage } from "../features/auth/pages/UserPage";
import { ChatPage } from "../features/chat/pages/ChatPage";
import { Shop } from "../features/shared/components/Shop";
import { About } from "../features/shared/components/About";
import { Contact } from "../features/shared/components/Contact";
import { ShoesListPage } from "../features/products/pages/ShoesListPage";
import { AccessoriesListPage } from "../features/products/pages/AccessoriesListPage";
import { ShirtListPage } from "../features/products/pages/ShirtListPage";
import { AdminDashboardPage } from "../features/admin/pages/AdminDashboardPage";
import { ShippingPage } from "../features/shipping/pages/ShippingPage";
import { MomoPage } from "../features/momo/pages/momoPage";
import { AuthCallback } from "../features/auth/components/AuthCallback";
import { EmailConfirmedPage } from "../features/auth/components/EmailConfirmed";
const AppContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/" element={user ? <ProductListPage /> : <AuthForm />} />
        <Route
          path="/products/:id"
          element={user ? <ProductCard /> : <AuthForm />}
        />
        <Route path="/user" element={user ? <UserPage /> : <AuthForm />} />
        <Route
          path="/cart/items"
          element={user ? <CartListPage /> : <AuthForm />}
        />
        <Route
          path="/orders"
          element={user ? <OrderListPage /> : <AuthForm />}
        />
        <Route path="/auth/callback" element={<EmailConfirmedPage />} />
        <Route path="/shop" element={user ? <Shop /> : <AuthForm />} />
        <Route path="/about" element={user ? <About /> : <AuthForm />} />
        <Route path="/contact" element={user ? <Contact /> : <AuthForm />} />
        <Route
          path="/shoes"
          element={user ? <ShoesListPage /> : <AuthForm />}
        />
        <Route
          path="/shirts"
          element={user ? <ShirtListPage /> : <AuthForm />}
        />
        <Route
          path="/accessories"
          element={user ? <AccessoriesListPage /> : <AuthForm />}
        />
        <Route
          path="/admin"
          element={user ? <AdminDashboardPage /> : <AuthForm />}
        />
        <Route
          path="/order/:id"
          element={user ? <ShippingPage /> : <AuthForm />}
        />
        <Route
          path="/momo-redirect"
          element={user ? <MomoPage /> : <AuthForm />}
        />
      </Routes>
      {user && <Footer />}
      {user && <ChatPage />}
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
//app.jsx
