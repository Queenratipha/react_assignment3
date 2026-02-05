import React from 'react';
import { Navigate } from 'react-router-dom';

const HomeRedirect = () => {
  const user = localStorage.getItem('user');
  // First time users go to login
  // Already logged in users go to dashboard
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default HomeRedirect;
