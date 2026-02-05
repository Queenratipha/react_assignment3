import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundCarousel from './BackgroundCarousel';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, go to dashboard
    const existing = localStorage.getItem('user');
    if (existing) navigate('/dashboard');

    // Pre-fill email when coming from signup
    const temp = localStorage.getItem('user_temp');
    if (temp) {
      const parsed = JSON.parse(temp);
      if (parsed?.email) setEmail(parsed.email);
    }

    // Focus the email field
    emailRef.current?.focus();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple mock auth: store a "user" in localStorage and redirect
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.removeItem('user_temp');
    navigate('/dashboard');
  };

  return (
    <BackgroundCarousel>
      <div className="auth-page">
        <div className="auth-card login-card">
        <h2>Welcome back</h2>
        <p className="muted">Please sign in to continue to React Js Assignment No 3</p>
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
          <button type="submit">Login</button>
        </form>

        <p className="auth-hint">Don't have an account? <Link to="/signup">Create an account</Link></p>
      </div>
      </div>
    </BackgroundCarousel>
  );
};

export default Login; 