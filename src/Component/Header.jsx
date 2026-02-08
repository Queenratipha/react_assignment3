import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <header>
      <h1>React Js Assignment No 3</h1>
    </header>
  );
}

export default Header;
