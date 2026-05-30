import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LanguageToggle from "./LanguageToggle";
import Login from "./Login";
import Register from "./Register";
import logo from "../assets/logo.png";
import "./Navbar.css";

// Simple SVG icons
const MenuIcon = () => (
  <svg
    className="mobile-menu-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg
    className="mobile-menu-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const NavbarAuth = ({ language, setLanguage, cartCount = 0 }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { id: 1, label: language === "fr" ? "Accueil" : "Home", route: "/" },
    { id: 2, label: language === "fr" ? "À propos" : "About", route: "/about" },
    {
      id: 3,
      label: language === "fr" ? "Produits" : "Products",
      route: "/products",
    },
    {
      id: 4,
      label: language === "fr" ? "Certificats et Confiance" : "Certificate and Trust",
      route: "/certificate-trust",
    },
    {
      id: 5,
      label: language === "fr" ? "Témoignages" : "Testimonials",
      route: "/testimonials",
    },
    {
      id: 6,
      label: language === "fr" ? "Contact" : "Contact",
      route: "/contact",
    },
  ];

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
  };

  const handleSwitchAuth = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo Section */}
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Vibgyor Maple Logo" className="navbar-logo-image" />
            <span className="navbar-logo-text">VibgyorMaple</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-nav">
            {navItems.map((item) => (
              <Link key={item.id} to={item.route} className="navbar-link">
                {item.label}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link to="/cart" className="navbar-cart">
              <CartIcon />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="user-menu-container">
                <button 
                  className="user-menu-trigger"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <UserIcon />
                  <span>{user?.name || 'User'}</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-menu">
                    <div className="user-info">
                      <p className="user-name">{user?.name}</p>
                      <p className="user-email">{user?.email}</p>
                    </div>
                    <div className="user-menu-actions">
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                        Profile
                      </Link>
                      <Link to="/orders" onClick={() => setShowUserMenu(false)}>
                        Orders
                      </Link>
                      <button onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  className="auth-btn login-btn"
                  onClick={() => handleAuthClick('login')}
                >
                  Login
                </button>
                <button 
                  className="auth-btn register-btn"
                  onClick={() => handleAuthClick('register')}
                >
                  Sign Up
                </button>
              </div>
            )}

            <div className="language-toggle-container">
              <LanguageToggle language={language} setLanguage={setLanguage} />
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className={`mobile-menu-toggle ${menuVisible ? "active" : ""}`}>
            <div className="hamburger-icon">
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`mobile-menu ${menuVisible ? "active" : ""}`}>
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.route}
                onClick={() => setMenuVisible(false)}
                className="mobile-nav-link"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Cart */}
            <Link 
              to="/cart" 
              className="mobile-nav-link"
              onClick={() => setMenuVisible(false)}
            >
              <CartIcon />
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>

            {/* Mobile Authentication */}
            {isAuthenticated ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <p className="mobile-user-name">{user?.name}</p>
                  <p className="mobile-user-email">{user?.email}</p>
                </div>
                <Link 
                  to="/profile" 
                  className="mobile-nav-link"
                  onClick={() => setMenuVisible(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="mobile-nav-link"
                  onClick={() => setMenuVisible(false)}
                >
                  Orders
                </Link>
                <button 
                  className="mobile-logout-btn"
                  onClick={() => {
                    handleLogout();
                    setMenuVisible(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-auth-section">
                <button 
                  className="mobile-auth-btn"
                  onClick={() => {
                    handleAuthClick('login');
                    setMenuVisible(false);
                  }}
                >
                  Login
                </button>
                <button 
                  className="mobile-auth-btn"
                  onClick={() => {
                    handleAuthClick('register');
                    setMenuVisible(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}

            <div className="mobile-language-toggle">
              <LanguageToggle language={language} setLanguage={setLanguage} />
            </div>
          </nav>
        </div>
      </header>

      {/* Authentication Modal */}
      {showAuthModal && (
        <>
          {authMode === 'login' ? (
            <Login 
              onClose={handleAuthClose}
              onSwitchToRegister={handleSwitchAuth}
            />
          ) : (
            <Register 
              onClose={handleAuthClose}
              onSwitchToLogin={handleSwitchAuth}
            />
          )}
        </>
      )}
    </>
  );
};

export default NavbarAuth;

