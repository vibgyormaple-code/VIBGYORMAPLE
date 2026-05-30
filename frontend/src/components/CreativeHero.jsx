import React, { useEffect, useState } from 'react';
import './CreativeHero.css';

const CreativeHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="creative-hero">
      <div className="hero-background">
        <div className="red-orb"></div>
        <div className="gray-orb"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-title">
          <span className="title-line">Innovative</span>
          <span className="title-line red-text">Solutions</span>
          <span className="title-line">Redefined</span>
        </h1>
        
        <p className="hero-subtitle">
          Experience the perfect blend of bold red passion and sophisticated gray elegance
        </p>
        
        <div className="hero-buttons">
          <button className="btn-primary-hero">
            Get Started
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-secondary-hero">
            Learn More
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default CreativeHero;
