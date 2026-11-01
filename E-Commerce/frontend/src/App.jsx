import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// 404 Component
const NotFoundPage = () => (
  <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
    <span className="text-4xl font-black text-brand-600">404</span>
    <h1 className="text-2xl font-black text-slate-900">Page Not Found</h1>
    <p className="text-sm text-slate-500">
      The page you requested could not be located.
    </p>
    <Link
      to="/"
      className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition shadow-sm"
    >
      Return to Storefront
    </Link>
  </div>
);

export const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-600 selection:text-white">
              {/* Sticky Navigation Bar */}
              <Navbar />

              {/* Slide-Over Quick Cart Drawer */}
              <CartDrawer />

              {/* Main Routing Outlet */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/orders" element={<MyOrdersPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Professional Footer */}
              <Footer />
            </div>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
