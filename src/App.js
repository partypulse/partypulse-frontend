// src/App.js
import React from "react";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import FaqPage from "./pages/FaqPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ProductPage from "./pages/productdetail/ProductPage";
import ProductList from "./pages/productlist/ProductList";
import Settingspage from "./pages/settings/settingspage";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/start/StartPage";
import { useAuth } from "./hooks/useAuth";
import Gateway from "./pages/gateway/Gateway";
import { PublicLayout } from "./layout/public/PublicLayout";
import ProtectedLayout from "./layout/authenticated/ProtectedLayout";
import CartPage from "./pages/cart/CartPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminOrdersPage from "./pages/admin/AdminOrders/AdminOrdersPage";
import AdminUsersPage from "./pages/admin/AdminUsers/AdminUsersPage";
import AdminCategoriesPage from "./pages/admin/AdminCategories/AdminCategoriesPage";
import AdminProductsPage from "./pages/admin/AdminProducts/AdminProductsPage";

import MyOrdersPage from "./pages/MyOrders/MyOrdersPage";

function App() {
  const { tid, logout } = useAuth();

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={"/"} element={<StartPage />} />
        <Route path="/login" element={<Gateway />} />
        <Route path="/register" element={<Gateway />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="faq" element={<FaqPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path={"/"} element={<StartPage />} />

        <Route path="settings" element={<Settingspage />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/myorders" element={<MyOrdersPage />} />

        <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
