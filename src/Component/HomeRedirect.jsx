import React from 'react';
import { Navigate } from 'react-router-dom';

const HomeRedirect = () => {
  const user = localStorage.getItem('user');
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default HomeRedirect;
