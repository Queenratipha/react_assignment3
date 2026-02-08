import React, { useState, useEffect } from 'react';

// Array of MORE INTERACTIVE & ATTRACTIVE background images
const backgroundImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop&q=80', // Mountain peak
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop&q=80', // Ocean waves
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&h=900&fit=crop&q=80', // Aurora borealis
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&h=900&fit=crop&q=80', // Neon city
  'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1600&h=900&fit=crop&q=80', // Digital art
  'https://images.unsplash.com/photo-1462332420958-a05d1e7413413?w=1600&h=900&fit=crop&q=80', // Purple galaxy
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&h=900&fit=crop&q=80', // Blue tech
];

const BackgroundCarousel = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 6 seconds for more dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="background-carousel"
      style={{
        backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      {/* Dark overlay to make content readable */}
      <div className="background-overlay"></div>
      
      {/* Content on top */}
      <div className="background-content">
        {children}
      </div>

      {/* Image indicators */}
      <div className="carousel-indicators">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            title={`Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
