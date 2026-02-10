import React from 'react';
import BackgroundCarousel from './BackgroundCarousel';

export default function About() {
  return (
    <BackgroundCarousel>
      <div style={{ minHeight: '100vh', padding: '3rem 2rem', paddingBottom: '6rem' }}>
      <div className="view-panel">
        <h2>About This Project</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Welcome to our modern, professionally designed dashboard application. This project showcases 
          advanced React development techniques with beautiful animations and a modern user interface.
        </p>
        
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginTop: '2rem', 
          marginBottom: '1rem',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Features
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          paddingLeft: 0,
          marginBottom: '2rem'
        }}>
          <li style={{ 
            padding: '0.8rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ 
              color: 'var(--accent-color)',
              marginRight: '1rem',
              fontSize: '1.3rem'
            }}>OK</span>
            Smooth animations and transitions
          </li>
          <li style={{ 
            padding: '0.8rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ 
              color: 'var(--accent-color)',
              marginRight: '1rem',
              fontSize: '1.3rem'
            }}>OK</span>
            Animated gradient backgrounds
          </li>
          <li style={{ 
            padding: '0.8rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ 
              color: 'var(--accent-color)',
              marginRight: '1rem',
              fontSize: '1.3rem'
            }}>OK</span>
            Protected authentication system
          </li>
          <li style={{ 
            padding: '0.8rem 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ 
              color: 'var(--accent-color)',
              marginRight: '1rem',
              fontSize: '1.3rem'
            }}>OK</span>
            Responsive design for all devices
          </li>
        </ul>

        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginTop: '2rem', 
          marginBottom: '1rem',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          About The Developer
        </h3>
        <p>
          This project was created by Queen Latifa as part of a React.js assignment (Assignment No 3). 
          It demonstrates proficiency in modern React development, CSS animations, and UI/UX design principles.
        </p>
      </div>
      </div>
    </BackgroundCarousel>
  );
}
