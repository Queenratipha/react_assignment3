import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundCarousel from './BackgroundCarousel';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const Login = () => {
  const [email, setEmail] = useState(() => {
    const temp = localStorage.getItem('user_temp');
    if (!temp) return '';
    const parsed = JSON.parse(temp);
    return parsed?.email || '';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const existing = localStorage.getItem('user');
    if (existing) navigate('/dashboard');
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
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Login failed');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      localStorage.removeItem('user_temp');
      navigate('/dashboard');
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
        <h2>Welcome back</h2>
        <p className="muted">Please sign in to continue to React Js Assignment No 3</p>
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
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="auth-hint">Don't have an account? <Link to="/signup">Create an account</Link></p>
      </div>
      </div>
    </BackgroundCarousel>
  );
};

export default Login;