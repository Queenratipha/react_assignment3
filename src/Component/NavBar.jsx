import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  // Hide nav on auth pages or if not logged in
  if (location.pathname === '/login' || location.pathname === '/admin-login' || location.pathname === '/signup' || location.pathname === '/admin' || !user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('seenWelcome');
    setIsOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen);
    document.body.classList.toggle('nav-lock', isOpen);
    return () => {
      document.body.classList.remove('nav-open');
      document.body.classList.remove('nav-lock');
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Left Sidebar Navigation */}
      <nav className={`sidebar-nav ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h2>Menu</h2>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            X
          </button>
        </div>

        <ul className="nav-links">
          <li><Link to="/landing" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

    </>
  );
}

export default NavBar; 
