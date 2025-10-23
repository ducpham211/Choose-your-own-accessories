// src/App.jsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import AuthForm from "../features/auth/components/AuthenticationForm";
import { ProductListPage } from "../features/products/pages/ProductListPage";
import { ProductCard } from "../features/products/components/ProductCard";
import { CartListPage } from "../features/cart/pages/CartListPage";
import { Header } from "../features/shared/Header";
import { Footer } from "../features/shared/Footer";
import { UsersPage } from "../features/user/pages/UsersPage";
import { ChatPage } from "../features/chat/pages/ChatPage";
import { Shop } from "../features/shared/Shop/pages/Shop";
import { About } from "../features/shared/About/pages/About";
import { Contact } from "../features/shared/Contact/pages/Contact";
import { ShoesListPage } from "../features/products/pages/ShoesListPage";
import { AccessoriesListPage } from "../features/products/pages/AccessoriesListPage";
import { ShirtListPage } from "../features/products/pages/ShirtListPage";
import { AdminDashboardPage } from "../features/admin/pages/AdminDashboardPage";
import { ShippingPage } from "../features/shipping/pages/ShippingPage";
import { MomoPage } from "../features/momo/pages/momoPage";
import { EmailConfirmedPage } from "../features/auth/components/EmailConfirmed";
import { OrderListPage } from "../features/orders/pages/OrderListPage";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatPage />
    </>
  );
};

// Component bảo vệ route — chỉ render nếu đã đăng nhập
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Đang xác thực...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Nội dung ứng dụng
const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Đang khởi tạo...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <ProductListPage />
          </AppLayout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <AppLayout>
            <ProductCard />
          </AppLayout>
        }
      />
      <Route
        path="/shop"
        element={
          <AppLayout>
            <Shop />
          </AppLayout>
        }
      />
      <Route
        path="/about"
        element={
          <AppLayout>
            <About />
          </AppLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <AppLayout>
            <Contact />
          </AppLayout>
        }
      />
      <Route
        path="/shoes"
        element={
          <AppLayout>
            <ShoesListPage />
          </AppLayout>
        }
      />
      <Route
        path="/shirts"
        element={
          <AppLayout>
            <ShirtListPage />
          </AppLayout>
        }
      />
      <Route
        path="/accessories"
        element={
          <AppLayout>
            <AccessoriesListPage />
          </AppLayout>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <AppLayout>
              <UsersPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart/items"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CartListPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <AppLayout>
              <OrderListPage />
              <div>Đơn hàng của bạn</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ShippingPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AdminDashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/momo-redirect"
        element={
          <ProtectedRoute>
            <AppLayout>
              <MomoPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* ===== Trang xác thực ===== */}
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/register" element={<AuthForm mode="register" />} />
      <Route path="/auth/callback" element={<EmailConfirmedPage />} />

      {/* Redirect 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// App root
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
