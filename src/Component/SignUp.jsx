import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundCarousel from './BackgroundCarousel';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const existing = localStorage.getItem('user');
    if (existing) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Registration failed');
        return;
      }

      localStorage.setItem('user_temp', JSON.stringify({ email }));
      navigate('/login');
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundCarousel>
      <div className="auth-page">
        <div className="auth-card signup-card">
        <h2>Create account</h2>
        <p className="muted">Join React Js Assignment No 3 - just a quick signup.</p>
        {error && (
          <p style={{ color: '#f87171', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
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
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-hint">Already have an account? <Link to="/login">Login</Link></p>
      </div>
      </div>
    </BackgroundCarousel>
  );
};

export default SignUp;