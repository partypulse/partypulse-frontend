// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicNav from './components/TopbarPublic';
import PrivateNav from './components/TopbarLoggedIn';
import LoginPage from './pages/login/loginpage';
import HomePage from './pages/start/StartPage';
import RegisterPage from './pages/register/registerpage';
import SettingsPage from './pages//settings/settingspage';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { isAuthenticated } from './utils/auth';
import "./css/App.css";
import Navigation from './components/Navigation';
import StartPage from "./pages/start/StartPage";
import ProductPage from './pages/productdetail/ProductPage';
import CartPage from './pages/cart/CartPage';
import FavoritesPage from './pages/favorites/FavoritesPage';
import Footer from "./components/Footer";
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FaqPage from './pages/FaqPage';


function App() {
    return (
        <Router>
            <div className="App">
            <Navigation/>
                {isAuthenticated() ? <PrivateNav /> : <PublicNav />}

                <div style={{marginTop:'5rem'}}>

                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/settings" element={
                        <AuthenticatedRoute>
                            <SettingsPage />
                        </AuthenticatedRoute>  }/>

                    <Route path="/" element={<StartPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage/>} />
                    <Route path="/favorites" element={<FavoritesPage/>} />

                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/faq" element={<FaqPage />} />


                </Routes>

                    <Footer />
                </div>


            </div>
        </Router>
    );
}

export default App;