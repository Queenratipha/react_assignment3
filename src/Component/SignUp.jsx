import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundCarousel from './BackgroundCarousel';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple mock signup: save user and redirect to login
    localStorage.setItem('user_temp', JSON.stringify({ name, email }));
    // after sign up we send user to login to authenticate
    navigate('/login');
  };

  return (
    <BackgroundCarousel>
      <div className="auth-page">
        <div className="auth-card signup-card">
        <h2>Create account</h2>
        <p className="muted">Join React Js Assignment No 3 — just a quick signup.</p>
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
          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-hint">Already have an account? <Link to="/login">Login</Link></p>
      </div>
      </div>
    </BackgroundCarousel>
  );
};

export default SignUp; 
