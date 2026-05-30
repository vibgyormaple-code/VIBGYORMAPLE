import React, { useState } from 'react';
import './EnhancedProductPage.css';
import MoleTrapInstructions from './MoleTrapInstructions';

const EnhancedProductPage = ({ addToCart, cartItems }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: 'Mole Trap Basic',
      price: 799,
      originalPrice: 999,
      description: 'Perfect for small gardens and first-time users',
      features: [
        '1 Mole Trap Unit',
        'Detailed Manual Guide',
        'Email Support',
        '30-Day Money Back'
      ],
      image: '/api/placeholder/300/200',
      badge: 'Best Value'
    },
    {
      id: 2,
      name: 'Mole Trap Pro',
      price: 1499,
      originalPrice: 1899,
      description: 'Professional solution for larger areas',
      features: [
        '2 Mole Trap Units',
        'Installation Support',
        'Priority Email Support',
        '60-Day Money Back',
        'Video Tutorials'
      ],
      image: '/api/placeholder/300/200',
      badge: 'Most Popular'
    },
    {
      id: 3,
      name: 'Mole Trap Family Pack',
      price: 2499,
      originalPrice: 3199,
      description: 'Complete solution for large properties',
      features: [
        '4 Mole Trap Units',
        'Personal Installation Support',
        'Phone & Email Support',
        '90-Day Money Back',
        'Lifetime Updates'
      ],
      image: '/api/placeholder/300/200',
      badge: 'Best Deal'
    }
  ];

  const handleAddToCart = (product) => {
    const item = {
      ...product,
      quantity: quantity
    };
    addToCart(item);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const calculateSavings = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="enhanced-product-section" id="product">
      <div className="enhanced-product-container">
        
        {/* Header Section */}
        <div className="product-header">
          <h1>Grass Hawk Mole Trap</h1>
          <p className="product-subtitle">Professional-grade mole control solution</p>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card-enhanced">
              {product.badge && (
                <div className="product-badge">{product.badge}</div>
              )}
              
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="pricing-info">
                  <div className="current-price">${product.price}</div>
                  <div className="original-price">${product.originalPrice}</div>
                  <div className="savings">
                    Save {calculateSavings(product.originalPrice, product.price)}%
                  </div>
                </div>

                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>

                <div className="product-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="quick-buy-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Use Section */}
        <div className="how-to-use-section">
          <h2>How to Use Your Mole Trap</h2>
          <MoleTrapInstructions />
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Shopping Cart</h3>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <strong>Total: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</strong>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How long does it take to catch a mole?</h4>
              <p>Most customers see results within 24-48 hours when traps are properly placed in active tunnels.</p>
            </div>
            <div className="faq-item">
              <h4>Is it safe for pets and children?</h4>
              <p>Yes, our traps are designed to be safe when used as directed. Always place in areas inaccessible to pets and children.</p>
            </div>
            <div className="faq-item">
              <h4>What's your return policy?</h4>
              <p>We offer 30-90 day money-back guarantee depending on your selected package. No questions asked!</p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="support-section">
          <h3>Need Help Choosing?</h3>
          <p>Contact our experts for personalized recommendations</p>
          <button className="contact-support-btn">Chat with Expert</button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedProductPage;
