import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Pricing from "./components/Pricing";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Success from "./components/success";
import Cancel from "./components/cancel";
import "./styles/EnhancedStyles.css";

// Scroll reveal animation hook
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollReveal();

  useEffect(() => {
    // Simulate loading for animation purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.name === product.name);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (name) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  const updateQuantity = (name, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  if (isLoading) {
    return (
      <div className="flex-center" style={{ height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p style={{ color: "white", marginTop: "20px", fontSize: "1.2rem" }}>Loading amazing experience...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <section className="hero-section section-enhanced">
                  <Hero />
                </section>
                
                <section className="about-section section scroll-reveal">
                  <div className="container">
                    <About />
                  </div>
                </section>
                
                <section className="products-section section scroll-reveal">
                  <div className="container">
                    <Products addToCart={addToCart} />
                  </div>
                </section>
                
                <section className="product-details-section section scroll-reveal">
                  <div className="container">
                    <ProductDetails />
                  </div>
                </section>
                
                <section className="pricing-section section scroll-reveal">
                  <div className="container">
                    <Pricing />
                  </div>
                </section>
                
                <section className="cart-section section scroll-reveal">
                  <div className="container">
                    <Cart
                      items={cartItems}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                      clearCart={clearCart}
                    />
                  </div>
                </section>
              </div>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
      
      <style>{`
        .app-container {
          min-height: 100vh;
          background: var(--background-primary);
        }
        
        .main-content {
          padding-top: 80px;
        }
        
        .loading-container {
          text-align: center;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .section {
          padding: 80px 0;
          position: relative;
        }
        
        .section:nth-child(even) {
          background: var(--background-secondary);
        }
        
        .section-enhanced {
          position: relative;
          overflow: hidden;
        }
        
        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </Router>
  );
}

export default App;
