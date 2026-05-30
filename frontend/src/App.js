import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/GlobalStyles.css";
import "./styles/BubbleAnimation.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomePage from "./components/WelcomePage";
import Products from "./components/Products";
import ProductsBackend from "./components/ProductsBackend";
import ProductPage from "./components/ProductPage";
import ProductPageBackend from "./components/ProductPageBackend";
import ProductDetails from "./components/ProductDetails";
import ProductDetailsPage from "./components/ProductDetailsPage";
import Cart from "./components/Cart";
import CartBackend from "./components/CartBackend";
import CartEnhanced from "./components/CartEnhanced";
import Contact from "./components/Contact";
import Success from "./components/success";
import Cancel from "./components/cancel";
import About from "./components/About";
import MoleTrapInstructions from "./components/MoleTrapInstructions";
import Pricing from "./components/Pricing";
import Hero from "./components/Hero";
import CertificateAndTrust from "./components/CertificateAndTrust";
import Testimonials from "./components/Testimonials";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [language, setLanguage] = useState('en');

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === product.name);
      if (existingItem) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prev) => prev.filter((item) => item.name !== productName));
  };

  const updateQuantity = (productName, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
        <div className="bubble-animation">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <Navbar 
          language={language} 
          setLanguage={setLanguage}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                {/* Additional components can be added here */}
              </>
            }
          />
          <Route path="/products" element={<ProductDetailsPage language={language} />} />
          <Route
            path="/product-page"
            element={
              <ProductPage
                addToCart={addToCart}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/product-page-backend"
            element={<ProductPageBackend />}
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={
              <Cart
                items={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/cart-backend"
            element={<CartEnhanced />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/about" element={<About />} />
          <Route path="/instructions" element={<MoleTrapInstructions />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/certificate-trust" element={<CertificateAndTrust />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
