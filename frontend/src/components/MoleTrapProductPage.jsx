import React from 'react';
import './MoleTrapProductPage.css';
import { Link } from 'react-router-dom';

const MoleTrapProductPage = () => {
  return (
    <div className="mole-trap-product-container">
      {/* Hero Section with Creative Product Display */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-elements">
            <div className="grass-blade grass-1"></div>
            <div className="grass-blade grass-2"></div>
            <div className="grass-blade grass-3"></div>
            <div className="mole-silhouette"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="product-showcase">
            <div className="product-frame">
              <div className="frame-decoration top-left"></div>
              <div className="frame-decoration top-right"></div>
              <div className="frame-decoration bottom-left"></div>
              <div className="frame-decoration bottom-right"></div>
              
              <img 
                src="/api/placeholder/800/600" 
                alt="Grass Hawk Mole Trap - Professional Grade"
                className="product-image-enhanced"
              />
              
              <div className="product-glow"></div>
              <div className="product-reflection"></div>
            </div>
            
            <div className="product-info-overlay">
              <h1 className="product-title">
                <span className="title-highlight">Grass Hawk</span>
                <br />
                Professional Mole Trap
              </h1>
              <p className="product-tagline">
                The Ultimate Solution for Garden Protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Mole Trap?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Precision Targeting</h3>
              <p>Advanced mechanism ensures accurate mole detection and capture</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Garden Safe</h3>
              <p>Designed to protect your lawn without harming other wildlife</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Setup</h3>
              <p>Ready to use in minutes with our detailed instructions</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Durable Build</h3>
              <p>Weather-resistant materials for long-lasting performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">Product Gallery</h2>
          
          <div className="gallery-grid">
            <div className="gallery-item main-image">
              <img src="/api/placeholder/600/400" alt="Mole Trap in Garden" />
              <div className="gallery-overlay">
                <span>Professional Grade Design</span>
              </div>
            </div>
            
            <div className="gallery-item">
              <img src="/api/placeholder/300/200" alt="Close-up of trap mechanism" />
              <div className="gallery-overlay">
                <span>Precision Mechanism</span>
              </div>
            </div>
            
            <div className="gallery-item">
              <img src="/api/placeholder/300/200" alt="Trap in action" />
              <div className="gallery-overlay">
                <span>Effective Results</span>
              </div>
            </div>
            
            <div className="gallery-item">
              <img src="/api/placeholder/300/200" alt="Easy installation" />
              <div className="gallery-overlay">
                <span>Easy Installation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Protect Your Garden?</h2>
            <p>Join thousands of satisfied customers who trust Grass Hawk for their garden protection needs.</p>
            
            <div className="cta-buttons">
              <Link to="/products" className="btn-primary">
                View All Products
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoleTrapProductPage;
