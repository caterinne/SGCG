import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginService from './services/LoginService';

const ProtectedRoute = ({ component: Component }) => {
    return LoginService.isAuthenticated() ? (
        <Component />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;