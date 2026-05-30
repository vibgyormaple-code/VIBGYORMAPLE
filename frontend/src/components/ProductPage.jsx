import React, { useState } from 'react';
import './ProductPage.css';
import MoleTrapInstructions from './MoleTrapInstructions';
import Products from './Products';
import Pricing from './Pricing';
import Cart from './Cart';
import moletrapImage from '../assets/moletrap.png';
import trapImage from '../assets/trap.png';
import moleTrapHeroImage from '../assets/mole-trap-hero.jpg';

const ProductPage = ({ addToCart, cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Mole Trap Basic',
      price: 799,
      originalPrice: 999,
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
      price: 1499,
      originalPrice: 1899,
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
      price: 2499,
      originalPrice: 3199,
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
                onClick={() => addToCart({ ...product, quantity: 1 })}
              >
                Add to Cart
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
        <Cart
          items={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
        />
      </section>
    </div>
  );
};

export default ProductPage;
