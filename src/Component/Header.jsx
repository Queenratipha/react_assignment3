import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const user = localStorage.getItem('user');

  // Hide header on auth pages or if not logged in
  if (location.pathname === '/login' || location.pathname === '/signup' || !user) {
    return null;
  }

  return (
    <header>
      <h1>React Js Assignment No 3</h1>
    </header>
  );
}

export default Header;
