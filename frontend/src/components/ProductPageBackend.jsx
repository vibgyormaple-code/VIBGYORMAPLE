import React, { useState } from 'react';
import './ProductPage.css';
import MoleTrapInstructions from './MoleTrapInstructions';
import Pricing from './Pricing';
import CartBackend from './CartBackend';
import moletrapImage from '../assets/moletrap.png';
import trapImage from '../assets/trap.png';
import moleTrapHeroImage from '../assets/mole-trap-hero.jpg';

const ProductPageBackend = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const products = [
    {
      id: 1,
      name: 'Mole Trap Basic',
      price: 29.99,
      originalPrice: 39.99,
      description: 'Perfect for small gardens and first-time users. Our basic mole trap provides effective protection for your lawn.',
      features: [
        '1 Mole Trap Unit',
        'Detailed Manual Guide',
        'Email Support',
        '30-Day Money Back'
      ],
      image: moletrapImage,
      badge: 'Best Value'
    },
    {
      id: 2,
      name: 'Mole Trap Pro',
      price: 49.99,
      originalPrice: 69.99,
      description: 'Professional solution for larger areas. Advanced technology for maximum mole control.',
      features: [
        '2 Mole Trap Units',
        'Installation Support',
        'Priority Email Support',
        '60-Day Money Back',
        'Video Tutorials'
      ],
      image: trapImage,
      badge: 'Most Popular'
    },
    {
      id: 3,
      name: 'Mole Trap Family Pack',
      price: 89.99,
      originalPrice: 119.99,
      description: 'Complete solution for large properties. Protect your entire garden with our premium pack.',
      features: [
        '4 Mole Trap Units',
        'Personal Installation Support',
        'Phone & Email Support',
        '90-Day Money Back',
        'Lifetime Updates'
      ],
      image: moleTrapHeroImage,
      badge: 'Best Deal'
    }
  ];

  const calculateSavings = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const addToCart = async (product) => {
    try {
      setLoading(true);
      setMessage('');
      
      const response = await fetch('http://localhost:4242/api/cart/session123/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id.toString(),
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }),
      });

      if (response.ok) {
        setMessage(`${product.name} added to cart successfully!`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to add item to cart');
      }
    } catch (error) {
      setMessage('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-page-container">
      {/* Hero Section with Image */}
      <section className="product-hero">
        <div className="hero-content">
          <h1>Grass Hawk Mole Trap</h1>
          <p className="hero-subtitle">Professional-grade mole control solution</p>
          <div className="hero-image">
            <img src={moleTrapHeroImage} alt="Grass Hawk Mole Trap" />
          </div>
        </div>
      </section>

      {/* MoleTrap Instructions */}
      <section className="instructions-section">
        <MoleTrapInstructions />
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Our Products</h2>
        
        {message && (
          <div className="message" style={{ 
            padding: '10px', 
            margin: '20px 0', 
            backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
            color: message.includes('successfully') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

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
                <span className="original-price">${product.originalPrice}</span>
                <span className="savings">Save {calculateSavings(product.originalPrice, product.price)}%</span>
              </div>
              <ul className="features">
                {product.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#ccc' : '#007bff',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <Pricing />
      </section>

      {/* Cart Section */}
      <section className="cart-section">
        <h2>Shopping Cart</h2>
        <CartBackend />
      </section>
    </div>
  );
};

export default ProductPageBackend;
