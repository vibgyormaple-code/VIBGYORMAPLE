import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/GlobalStyles.css"; // Importing the global styles
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import EnhancedProductPage from "./components/EnhancedProductPage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Success from "./components/success";
import Cancel from "./components/cancel";
import Contact from "./components/Contact";
import MoleTrapInstructions from "./components/MoleTrapInstructions";
import FrenchContent from "./components/FrenchContent";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [language, setLanguage] = useState("en");

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const updateQuantity = (name, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <Router>
      <Navbar
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        language={language}
        setLanguage={setLanguage}
      />

      <Routes>
        <Route
          path="/"
          element={
            language === "fr" ? (
              <FrenchContent />
            ) : (
              <>
                <Hero />
                <About />

                <EnhancedProductPage
                  addToCart={addToCart}
                  cartItems={cartItems}
                />
                <Cart
                  items={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                />
                <Contact />
              </>
            )
          }
        />
        <Route
          path="/product"
          element={
            <EnhancedProductPage addToCart={addToCart} cartItems={cartItems} />
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
