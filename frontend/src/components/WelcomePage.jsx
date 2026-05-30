import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import moletrapImage from "../assets/moletrap.png";
import trapImage from "../assets/trap.png";
import moleTrapHeroImage from "../assets/mole-trap-hero.jpg";

const WelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    // Create floating particles
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: Math.random() * 10 + 10,
      });
    }
    setParticles(particleArray);
  }, []);

  const handleExploreProducts = () => {
    setShowProducts(true);
    // Scroll to products section
    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const products = [
    {
      id: 1,
      name: "Mole Trap Basic",
      price: 799,
      originalPrice: 999,
      description:
        "Perfect for small gardens and first-time users. Our basic mole trap provides effective protection for your lawn.",
      features: [
        "1 Mole Trap Unit",
        "Detailed Manual Guide",
        "Email Support",
        "30-Day Money Back",
      ],
      image: moletrapImage,
      badge: "Best Value",
    },
    {
      id: 2,
      name: "Mole Trap Pro",
      price: 1499,
      originalPrice: 1899,
      description:
        "Professional solution for larger areas. Advanced technology for maximum mole control.",
      features: [
        "2 Mole Trap Units",
        "Installation Support",
        "Priority Email Support",
        "60-Day Money Back",
        "Video Tutorials",
      ],
      image: trapImage,
      badge: "Most Popular",
    },
    {
      id: 3,
      name: "Mole Trap Family Pack",
      price: 2499,
      originalPrice: 3199,
      description:
        "Complete solution for large properties. Protect your entire garden with our premium pack.",
      features: [
        "4 Mole Trap Units",
        "Personal Installation Support",
        "Phone & Email Support",
        "90-Day Money Back",
        "Lifetime Updates",
      ],
      image: moleTrapHeroImage,
      badge: "Best Deal",
    },
  ];

  const calculateSavings = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="welcome-container">
      {/* Animated Background */}
      <div className="animated-bg">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Image Section */}
      <section className="hero-image-section">
        <img src={moleTrapHeroImage} alt="Mole Trap Hero" className="hero-image" />
      </section>

      {/* Main Content */}
      <div className={`welcome-content ${isVisible ? "visible" : ""}`}>
        <div className="logo-section">
          <div className="logo-animation">
            <div className="hawk-icon">🦅</div>
            <div className="grass-icon">🌱</div>
          </div>
        </div>

        <h1 className="main-title animated-title">
          <span className="grass-text">Welcome to</span>
          <span className="grasshawk-text animated-text">Grass Hawk</span>
        </h1>

        <p className="tagline animated-tagline">
          <span className="tagline-part">
            Revolutionary Mole Control Solutions
          </span>
          <span className="tagline-part">
            Protect Your Garden with Precision
          </span>
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Ultimate Protection</h3>
            <p>Advanced mole trap technology for your garden</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3>Eco-Friendly</h3>
            <p>Safe for pets and environment</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Setup</h3>
            <p>Easy to use with instant results</p>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button" onClick={handleExploreProducts}>
            <span>Explore Products</span>
            <div className="button-ripple"></div>
          </button>
          <button className="cta-button secondary">
            <span>Learn More</span>
          </button>
        </div>

        {/* Animated Elements */}
        <div className="floating-elements">
          <div className="floating-mole">🦔</div>
          <div className="floating-grass">🌾</div>
          <div className="floating-flower">🌸</div>
          <div className="floating-sun">☀️</div>
          <div className="floating-cloud">☁️</div>
        </div>
      </div>

      {/* Products Section */}
      {showProducts && (
        <section id="products-section" className="products-section">
          <h2>Our Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {product.badge && (
                  <div className="product-badge">{product.badge}</div>
                )}
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="pricing">
                  <span className="current-price">${product.price}</span>
                  <span className="original-price">
                    ${product.originalPrice}
                  </span>
                  <span className="savings">
                    Save{" "}
                    {calculateSavings(product.originalPrice, product.price)}%
                  </span>
                </div>
                <ul className="features">
                  {product.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </div>
  );
};

export default WelcomePage;
