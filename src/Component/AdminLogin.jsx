import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundCarousel from './BackgroundCarousel';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const existing = localStorage.getItem('user');
    if (existing) navigate('/admin');
    emailRef.current?.focus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Login failed');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/admin');
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundCarousel>
      <div className="auth-page">
        <div className="auth-card login-card">
        <h2>Admin Login</h2>
        <p className="muted">Sign in with admin credentials</p>
        {error && (
          <p style={{ color: '#f87171', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login as Admin'}
          </button>
        </form>


      </div>
      </div>
    </BackgroundCarousel>
  );
};

export default AdminLogin;
