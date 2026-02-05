import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Dashboard = () => {
  const [view, setView] = useState('overview');
  const [cardsAnimate, setCardsAnimate] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!localStorage.getItem('seenWelcome'));
  const navigate = useNavigate();

  const menuItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
    { key: 'analytics', label: 'Analytics' },
  ];

  const handleMenuClick = (key) => {
    setView(key);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('seenWelcome');
    navigate('/login');
  };

  useEffect(() => {
    const t = setTimeout(() => setCardsAnimate(true), 120);
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

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard-layout">
      <NavBar />
      
      {/* Dashboard Header */}
      <header className={`dashboard-header ${isSticky ? 'sticky' : ''}`}>
        <div className="header-content">
          <h1>React Js Assignment No 3</h1>
          <p style={{ marginBottom: 0, color: 'rgba(255, 255, 255, 0.8)' }}>Welcome, {userData.email || 'User'}</p>
        </div>
      </header>

      <main className="content-area">
        {showWelcome && (
          <div className="welcome-banner">
            <div>
              <strong>🎉 Welcome back!</strong> Glad to see you again. Enjoy exploring your dashboard with beautiful animations.
            </div>
            <button className="dismiss" onClick={dismissWelcome}>Got it</button>
          </div>
        )}

        <h2 style={{ marginBottom: '1.5rem' }}>Dashboard</h2>

        <section className={`cards-row top ${cardsAnimate ? 'animate' : ''}`}>
          <div className="card">
            <h3>📊 Users</h3>
            <p>1,234</p>
          </div>
          <div className="card">
            <h3>💰 Revenue</h3>
            <p>$45,678</p>
          </div>
          <div className="card">
            <h3>📦 Orders</h3>
            <p>567</p>
          </div>
        </section>

        <section className="view-panel">
          {view === 'overview' && (
            <div>
              <h2>📈 Overview</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Welcome to your professional dashboard! This is your central hub for monitoring key metrics and managing your account.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(102, 126, 234, 0.3)'
                }}>
                  <h4 style={{ marginBottom: '0.5rem', color: '#667eea' }}>Performance</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Your dashboard is performing optimally with smooth animations and responsive design.
                  </p>
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(102, 126, 234, 0.3)'
                }}>
                  <h4 style={{ marginBottom: '0.5rem', color: '#667eea' }}>Security</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Your account is protected with secure authentication and encrypted data storage.
                  </p>
                </div>
              </div>
            </div>
          )}
          {view === 'profile' && (
            <div>
              <h2>👤 Profile</h2>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '0.5rem' }}>
                    {userData.email || 'user@example.com'}
                  </p>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Account Status</label>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    marginTop: '0.5rem',
                    color: '#10b981'
                  }}>
                    ✓ Active
                  </p>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Member Since</label>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '0.5rem' }}>
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <button style={{
                  padding: '0.8rem 1.5rem',
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginTop: '1rem'
                }}>
                  Edit Profile
                </button>
              </div>
            </div>
          )}
          {view === 'settings' && (
            <div>
              <h2>⚙️ Settings</h2>
              <div style={{ marginTop: '2rem' }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Dark Mode</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Enable dark theme</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Notifications</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Receive email notifications</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Two-Factor Auth</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Enhanced security</p>
                  </div>
                  <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          )}
          {view === 'analytics' && (
            <div>
              <h2>📊 Analytics</h2>
              <p style={{ marginBottom: '2rem' }}>
                Track your dashboard usage and performance metrics.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '2rem', fontWeight: '900', color: '#667eea', marginBottom: '0.5rem' }}>
                    1.2K
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Page Views</p>
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '2rem', fontWeight: '900', color: '#667eea', marginBottom: '0.5rem' }}>
                    98%
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Uptime</p>
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '2rem', fontWeight: '900', color: '#667eea', marginBottom: '0.5rem' }}>
                    256ms
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Avg Response</p>
                </div>
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
