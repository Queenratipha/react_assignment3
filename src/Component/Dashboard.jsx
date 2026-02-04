import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('overview');
  const [cardsAnimate, setCardsAnimate] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!localStorage.getItem('seenWelcome'));
  const navigate = useNavigate();

  const menuItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
  ];

  const handleMenuClick = (key) => {
    setView(key);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    // reset the 'seenWelcome' flag so welcome shows again next login
    localStorage.removeItem('seenWelcome');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  useEffect(() => {
    // animate cards shortly after mount
    const t = setTimeout(() => setCardsAnimate(true), 120);
    // add scroll listener to toggle sticky header shadow
    const onScroll = () => setIsSticky(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('seenWelcome', '1');
  };

  return (
    <div className="dashboard-layout">
      <button
        className={`hamburger-left ${sidebarOpen ? 'open' : ''}`}
        aria-label="Open navigation"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen((s) => !s)}
      >
        <span />
        <span />
        <span />
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <h3>Menu</h3>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        </div>
        <ul>
          {menuItems.map((it) => (
            <li key={it.key}>
              <button onClick={() => handleMenuClick(it.key)}>{it.label}</button>
            </li>
          ))}
          <li><button onClick={() => handleNavigate('/')}>Home</button></li>
          <li><a href="https://queenlatifa-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
          {!localStorage.getItem('user') ? (
            <>
              <li><button onClick={() => handleNavigate('/login')}>Login</button></li>
              <li><button onClick={() => handleNavigate('/signup')}>SignUp</button></li>
            </>
          ) : null}
        </ul>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout">Logout</button>
        </div>
      </aside>

      {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}

      <main className="content-area">
        {showWelcome && (
          <div className="welcome-banner">
            <div>
              <strong>Welcome!</strong> Thanks for joining — this message will show once.
            </div>
            <button className="dismiss" onClick={dismissWelcome}>Got it</button>
          </div>
        )}

        <header className={`dashboard-header ${isSticky ? 'sticky' : ''}`}>
          <h1>Dashboard</h1>
        </header>

        <section className={`cards-row top ${cardsAnimate ? 'animate' : ''}`}>
          <div className="card">
            <h3>Users</h3>
            <p>120</p>
          </div>
          <div className="card">
            <h3>Sales</h3>
            <p>$3,450</p>
          </div>
          <div className="card">
            <h3>Orders</h3>
            <p>85</p>
          </div>
        </section>

        <section className="view-panel dark">
          {view === 'overview' && (
            <div>
              <h2>Overview</h2>
              <p>Quick stats and summary appear here.</p>
            </div>
          )}
          {view === 'profile' && (
            <div>
              <h2>Profile</h2>
              <p>Profile details and edit controls.</p>
            </div>
          )}
          {view === 'settings' && (
            <div>
              <h2>Settings</h2>
              <p>Application settings and preferences.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
