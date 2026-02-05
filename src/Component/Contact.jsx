import React, { useState } from 'react';
import BackgroundCarousel from './BackgroundCarousel';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll get back to you at ${formData.email}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <BackgroundCarousel>
      <div style={{ minHeight: '100vh', padding: '3rem 2rem', paddingBottom: '6rem' }}>
      <div className="view-panel">
        <h2>Get in Touch</h2>
        <p style={{ marginBottom: '2rem' }}>
          Have questions or feedback? We'd love to hear from you. Reach out through any of these channels:
        </p>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
            <a href="mailto:irakozeratipha@gmail.com" style={{
              color: 'var(--accent-color)',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              irakozeratipha@gmail.com
            </a>
          </div>

          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Portfolio</h3>
            <a href="https://queenlatifa-portfolio.netlify.app" target="_blank" rel="noopener noreferrer" style={{
              color: 'var(--accent-color)',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              View Portfolio
            </a>
          </div>

          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Quick Response</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Response within 24 hours
            </p>
          </div>
        </div>

        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '1.5rem',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Send us a Message
        </h3>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '600px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                borderRadius: '10px',
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 15, 23, 0.8)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                borderRadius: '10px',
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 15, 23, 0.8)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                borderRadius: '10px',
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 15, 23, 0.8)',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                resize: 'vertical'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
            }}
          >
            Send Message
          </button>
        </form>
      </div>
      </div>
    </BackgroundCarousel>
  );
}
