import React, { useState } from 'react';
import { useCart } from "../contexts/CartContext";
import { translations } from "../utils/translations";
import "./Products.css";
import MoleTrapInstructions from "./MoleTrapInstructions";
import moletrapImage from "../assets/new_moletrap.jpg";
import trapImage from "../assets/trap.png";
import moleTrapHeroImage from "../assets/mole-trap-hero.jpg";
import easySetupIcon from "../assets/easytosetup.png";
import petFriendlyIcon from "../assets/petfriendly.png";
import weatherResistantIcon from "../assets/weatherresistance.png";
import durableIcon from "../assets/durableandheavyduty.png";
import ecoFriendlyIcon from "../assets/reusableandecofriendly.png";

const ProductDetailsPage = ({ language = 'en' }) => {
  const t = translations[language] || translations.en;
  const { addToCart: addToCartContext } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('grasshawk'); // 'grasshawk' or 'vibgyormaple'

  // Product data for Grasshawk
  const grasshawkProduct = {
    name: t.products.grasshawk.name,
    price: 20,
    description: t.products.grasshawk.description,
    available: true,
    company: "VibgyorMaple",
    productLine: "Grasshawk Series",
    image: moletrapImage
  };

  // Default to the main Grasshawk product
  const currentProduct = grasshawkProduct;

  // Add to cart function
  const addToCartBackend = async (product) => {
    if (!product || !product.available) {
      setMessage(t.products.comingSoon);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const result = await addToCartContext({
        id: product.name.toLowerCase().replace(/\s+/g, '-'),
        name: product.name,
        price: product.price,
        image: '/api/placeholder/300/200'
      });

      if (result.success) {
        setMessage(t.products.addedToCart);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(result.message || t.products.errorAddingToCart);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage(t.products.errorAddingToCart);
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="product-section" id="product">
      <div className="product-container">
        <div className="fullscreen-content">
          {/* Brand Selection Buttons */}
          <div className="brand-selector">
            <button 
              className={`brand-button ${selectedBrand === 'grasshawk' ? 'active' : ''}`}
              onClick={() => setSelectedBrand('grasshawk')}
            >
              <span className="brand-icon">🦅</span>
              Grasshawk
              {selectedBrand === 'grasshawk' && <span className="checkmark">✓</span>}
            </button>
            <button 
              className={`brand-button ${selectedBrand === 'vibgyormaple' ? 'active' : ''}`}
              onClick={() => setSelectedBrand('vibgyormaple')}
            >
              <span className="brand-icon">🍁</span>
              VibgyorMaple
              {selectedBrand === 'vibgyormaple' && <span className="checkmark">✓</span>}
            </button>
          </div>

          {/* Conditional Content Based on Selected Brand */}
          {selectedBrand === 'grasshawk' ? (
            <>
              <div className="fullscreen-header">
                <h2>{t.products.ourProduct}: {currentProduct.name}</h2>
              </div>

          {/* ==== Product Row (Image + Info) ==== */}
          <div className="product-main-row">
            <div className="product-main-image-col">
              <div className="product-main-image-card">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="product-center-image"
                />
              </div>
            </div>

            <div className="product-main-info-col">
              <div className="product-main-info-card">
                <div className="product-company-info" style={{ display: 'flex', gap: '8px' }}>
                  <span className="company-name">{currentProduct.company}</span>
                  <span className="product-line">{currentProduct.productLine}</span>
                </div>
                <div className="product-title-with-logo">
                  <div className="product-logo">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="maple-leaf-small">
                      <defs>
                        <filter id="small-shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#888" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      <path d="M20 3 L23 8 L28 6 L26 12 L32 13 L28 18 L30 22 L23 20 L20 28 L17 20 L10 22 L12 18 L8 13 L14 12 L12 6 L17 8 Z" 
                            fill="black" stroke="red" strokeWidth="1" filter="url(#small-shadow)"/>
                    </svg>
                  </div>
                  <h3>{currentProduct.name}</h3>
                </div>
                <p>{currentProduct.description}</p>
                
                <div className="product-specifications" style={{ margin: '15px 0', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'left', color: '#333' }}>
                  <h4 style={{ marginBottom: '10px', fontSize: '1.1rem', fontWeight: 'bold' }}>Product Specifications</h4>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.95rem' }}>
                    <li style={{ marginBottom: '5px' }}><strong>Material:</strong> Heavy-duty galvanized steel</li>
                    <li style={{ marginBottom: '5px' }}><strong>Finish:</strong> Rust-resistant outdoor coating</li>
                    <li style={{ marginBottom: '5px' }}><strong>Dimensions:</strong> 12" x 4" x 5"</li>
                    <li style={{ marginBottom: '5px' }}><strong>Care:</strong> Rinse with water after use</li>
                    <li><strong>Delivery:</strong> 3-5 business days (Canada-wide)</li>
                  </ul>
                </div>

                {currentProduct.available ? (
                  <>
                    <p>
                      <strong>${currentProduct.price}</strong>
                    </p>
                    <button 
                      onClick={() => addToCartBackend(currentProduct)}
                      disabled={loading}
                      className="add-to-cart-btn"
                    >
                      {loading ? t.products.adding || 'Adding...' : t.products.addToCart}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="coming-soon-price">{t.products.comingSoon}</p>
                    <button disabled className="coming-soon-btn">
                      {t.products.comingSoon}
                    </button>
                  </>
                )}
                {message && (
                  <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ==== END Product Row ==== */}

          {/* ==== Instructions Section ==== */}
          <div className="instructions-section">
            <MoleTrapInstructions />
          </div>

          {/* ==== Features Section ==== */}
          <div className="features-section">
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t.products.features}</h3>
            <div className="features-grid">
              <div className="feature-card" style={{
                borderRadius: '0px',
                width: '250px',
                height: '250px',
                minWidth: '250px',
                maxWidth: '250px',
                minHeight: '250px',
                maxHeight: '250px'
              }}>
                <img src={easySetupIcon} alt={t.products.easyToSetUp} style={{ width: '120px', height: '120px' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '15px' }}>{t.products.easyToSetUp}</p>
              </div>
              <div className="feature-card" style={{
                borderRadius: '0px',
                width: '250px',
                height: '250px',
                minWidth: '250px',
                maxWidth: '250px',
                minHeight: '250px',
                maxHeight: '250px'
              }}>
                <img src={petFriendlyIcon} alt={t.products.petFriendly} style={{ width: '120px', height: '120px' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '15px' }}>{t.products.petFriendly}</p>
              </div>
              <div className="feature-card" style={{
                borderRadius: '0px',
                width: '250px',
                height: '250px',
                minWidth: '250px',
                maxWidth: '250px',
                minHeight: '250px',
                maxHeight: '250px'
              }}>
                <img src={weatherResistantIcon} alt={t.products.weatherResistant} style={{ width: '120px', height: '120px' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '15px' }}>{t.products.weatherResistant}</p>
              </div>
              <div className="feature-card" style={{
                borderRadius: '0px',
                width: '250px',
                height: '250px',
                minWidth: '250px',
                maxWidth: '250px',
                minHeight: '250px',
                maxHeight: '250px'
              }}>
                <img src={durableIcon} alt={t.products.durableAndHeavyDuty} style={{ width: '120px', height: '120px' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '15px' }}>{t.products.durableAndHeavyDuty}</p>
              </div>
              <div className="feature-card" style={{
                borderRadius: '0px',
                width: '250px',
                height: '250px',
                minWidth: '250px',
                maxWidth: '250px',
                minHeight: '250px',
                maxHeight: '250px'
              }}>
                <img src={ecoFriendlyIcon} alt={t.products.reusableAndEcoFriendly} style={{ width: '120px', height: '120px' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '15px' }}>{t.products.reusableAndEcoFriendly}</p>
              </div>
            </div>
          </div>

          {/* ==== Customer Reviews Section ==== */}
          <div className="reviews-section">
            <h3>{t.products.reviews}</h3>
            <div className="reviews-grid">
              <div className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">Sarah J.</span>
                  <span className="review-rating">★★★★★</span>
                </div>
                <p className="review-text">
                  "This mole trap saved my garden! After trying everything, the
                  Grass Hawk worked on the first try. Easy to set up and very
                  effective."
                </p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">Mike T.</span>
                  <span className="review-rating">★★★★★</span>
                </div>
                <p className="review-text">
                  "Professional quality at an affordable price. The instructions
                  were clear and I caught 3 moles in the first week. Highly
                  recommend!"
                </p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">Lisa M.</span>
                  <span className="review-rating">★★★★☆</span>
                </div>
                <p className="review-text">
                  "Great product! It took a couple of days to figure out the best
                  placement, but once I did, it worked perfectly. Customer service
                  was very helpful too."
                </p>
              </div>
            </div>
          </div>
            </>
          ) : (
            /* VIBGYOR Maple Coming Soon Section */
            <div className="coming-soon-section">
              <div className="coming-soon-container">
                <div className="coming-soon-icon">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="maple-leaf-large">
                    <defs>
                      <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#cc0000', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#8b0000', stopOpacity: 1 }} />
                      </linearGradient>
                      <filter id="leaf-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    <path 
                      d="M60 10 L69 28 L88 22 L82 42 L102 46 L86 58 L92 74 L72 66 L60 90 L48 66 L28 74 L34 58 L18 46 L38 42 L32 22 L51 28 Z" 
                      fill="url(#leaf-gradient)" 
                      stroke="#8b0000" 
                      strokeWidth="2" 
                      filter="url(#leaf-shadow)"
                    />
                  </svg>
                </div>
                <h2 className="coming-soon-title">VibgyorMaple Products</h2>
                <h3 className="coming-soon-subtitle">{t.products.comingSoon || 'Coming Soon'}</h3>
                <p className="coming-soon-description">
                  We're excited to bring you a complete range of premium backyard protection and garden care solutions. 
                  Stay tuned for innovative products designed specifically for Canadian homes.
                </p>
                <div className="coming-soon-features">
                  <div className="coming-soon-feature">
                    <span className="feature-emoji">🌱</span>
                    <span>EcoSeed Pro - Premium Grass Seeds</span>
                  </div>
                  <div className="coming-soon-feature">
                    <span className="feature-emoji">❄️</span>
                    <span>WinterShield - Winter Protection</span>
                  </div>
                  <div className="coming-soon-feature">
                    <span className="feature-emoji">🌿</span>
                    <span>NatureFeed - Organic Fertilizer</span>
                  </div>
                  <div className="coming-soon-feature">
                    <span className="feature-emoji">🛡️</span>
                    <span>GardenPro Shield - Advanced Protection</span>
                  </div>
                  <div className="coming-soon-feature">
                    <span className="feature-emoji">🌾</span>
                    <span>SoilMaster Pro - Soil Enhancement</span>
                  </div>
                </div>
                <div className="coming-soon-cta">
                  <p className="notify-text">Want to be notified when we launch?</p>
                  <button className="notify-button" onClick={() => window.location.href = '/contact'}>
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
