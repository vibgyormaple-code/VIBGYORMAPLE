import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import EnhancedAbout from "./components/EnhancedAbout";
import Contact from "./components/Contact";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Pricing from "./components/Pricing";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Success from "./components/success";
import Cancel from "./components/cancel";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import CertificateAndTrust from "./components/CertificateAndTrust";
import { translations } from "./utils/translations";
import "./styles/EnhancedStyles.css";
import "./styles/ResponsiveLayout.css";
import "./styles/AppFinalStyles.css";

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
  const [language, setLanguage] = useState('en'); // Language state: 'en' or 'fr'

  console.log('AppFinal component loaded');

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
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="app-container">
          <Navbar 
            cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
            language={language}
            setLanguage={setLanguage}
          />
          <div style={{ paddingTop: '75px' }}>
          <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <Hero language={language} />
                <Footer language={language} />
              </div>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/contact" element={
            <div>
              <Contact language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/about" element={
            <div>
              <About language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/products" element={
            <div>
              <Products addToCart={addToCart} language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/pricing" element={
            <div>
              <Pricing language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/testimonials" element={
            <div>
              <Testimonials language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/certificate-trust" element={
            <div>
              <CertificateAndTrust language={language} />
              <Footer language={language} />
            </div>
          } />
        </Routes>
        </div>
          {/* Sticky CTAs */}
          <div className="sticky-ctas" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            zIndex: 9999
          }}>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" style={{
              background: '#25D366',
              color: 'white',
              padding: '14px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              textDecoration: 'none',
              transition: 'transform 0.3s'
            }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} title="WhatsApp Us">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.435 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a href="tel:+1234567890" style={{
              background: '#007BFF',
              color: 'white',
              padding: '14px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              textDecoration: 'none',
              transition: 'transform 0.3s'
            }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} title="Call Now">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
