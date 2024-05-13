// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicNav from './components/TopbarPublic';
import PrivateNav from './components/TopbarLoggedIn';
import LoginPage from './pages/login/loginpage';
import HomePage from './pages/start/startpage';
import RegisterPage from './pages/register/registerpage';
import SettingsPage from './pages//settings/settingspage';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { isAuthenticated } from './utils/auth';
import "./css/App.css";
import Navigation from './components/Navigation';




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
                        </AuthenticatedRoute>
                    } />
                </Routes>

                </div>

            </div>
        </Router>
    );
}

export default App;