// auth.js

import api from "../api/api.js";

// isAuthenticated: A function to check if the user is authenticated, usually by verifying if a JWT token is present in the browser's local storage or session storage.
// login: A function to handle user login requests. This function will typically make a POST request to your backend API endpoint /login with the user's credentials (email and password), and handle the response, storing the JWT token in local storage upon successful login.
// logout: A function to handle user logout. This function will typically remove the JWT token from local storage or session storage and redirect the user to the login page.

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

// Function to handle user login
export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        return true; // Return true upon successful login
    } catch (error) {
        console.error('Login failed:', error);
        return false; // Return false if login fails
    }
};

// Function to handle user logout
export const logout = () => {
    localStorage.removeItem('token');
    // Redirect the user to the login page
    // You can use React Router for this purpose
};
