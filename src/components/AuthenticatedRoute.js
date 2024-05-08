/*
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import the function to check authentication status

// This file is responsible for defining a custom route component
// that ensures certain routes are only accessible to authenticated users.
// define as a functional component
// takes components and ...rest as props
// render the provided component (Component) if the user is authenticated.
// If the user is not authenticated, we redirect them to the login page using the Redirect component.

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }} // Redirect to login page if not authenticated
                />
            )
        }
    />
);

export default AuthenticatedRoute;
*/
// src/components/AuthenticatedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const AuthenticatedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default AuthenticatedRoute;