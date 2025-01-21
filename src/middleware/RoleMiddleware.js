import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleMiddleware = ({ children, requiredRole }) => {
  const { role } = useContext(AuthContext);

  // Jika role tidak sesuai, arahkan ke halaman login
  if (role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  // Jika role sesuai, render children
  return children;
};

export default RoleMiddleware;