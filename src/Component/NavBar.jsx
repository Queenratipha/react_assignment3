import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  // Top navigation with a few site-level links
  return (
    <div className="NavBar">
      <nav aria-label="main navigation">
        <h1 className="app-title">React Js Assignment No 3</h1>
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ol>
      </nav>
    </div>
  );
}

export default NavBar; 
