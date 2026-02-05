import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundCarousel from './BackgroundCarousel.jsx';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <BackgroundCarousel>
      <div className="landing-page-content">
        <div className="landing-content">
          <h1>Welcome to Dashboard Pro</h1>
          <p>
            Experience a modern, animated dashboard with professional design and smooth transitions. 
            Sign up or log in to access your personalized dashboard.
          </p>
          <div className="landing-buttons">
            <button 
              className="landing-btn primary" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="landing-btn secondary" 
              onClick={() => navigate('/signup')}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </BackgroundCarousel>
  );
};

export default LandingPage;
