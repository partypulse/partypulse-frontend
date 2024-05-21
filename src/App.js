// src/App.js
import React from "react";
import "./css/App.css";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import FaqPage from "./pages/FaqPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import CartPage from "./pages/cart/CartPage";
import ProductPage from "./pages/productdetail/ProductPage";
import ProductList from "./pages/productlist/ProductList";
import Settingspage from "./pages/settings/settingspage";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/start/StartPage";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/login/loginpage";
import { LoginLayout } from "./layout/LoginLayout";
import { PublicLayout } from "./layout/PublicLayout";
import ProtectedLayout from "./layout/ProtectedLayout";

function App() {
  const { tid, logout } = useAuth();

  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path={"/"} element={<StartPage />} />

        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="faq" element={<FaqPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path={"/start"} element={<StartPage />} />

        <Route path="settings" element={<Settingspage />} />
        <Route path="dashboard" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
