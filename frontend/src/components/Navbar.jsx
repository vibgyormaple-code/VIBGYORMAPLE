// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import LanguageToggle from "./LanguageToggle";
// // import "./Navbar.css";

// // // Simple SVG icons to replace lucide-react
// // const MenuIcon = () => (
// //   <svg
// //     className="mobile-menu-icon"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="2"
// //   >
// //     <line x1="3" y1="12" x2="21" y2="12"></line>
// //     <line x1="3" y1="6" x2="21" y2="6"></line>
// //     <line x1="3" y1="18" x2="21" y2="18"></line>
// //   </svg>
// // );

// // const XIcon = () => (
// //   <svg
// //     className="mobile-menu-icon"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="2"
// //   >
// //     <line x1="18" y1="6" x2="6" y2="18"></line>
// //     <line x1="6" y1="6" x2="18" y2="18"></line>
// //   </svg>
// // );

// // const Navbar = ({ language, setLanguage }) => {
// //   const [menuVisible, setMenuVisible] = useState(false);

// //   const navItems = [
// //     { id: 1, label: language === "fr" ? "Accueil" : "Home", route: "/" },
// //     { id: 2, label: language === "fr" ? "À propos" : "About", route: "/about" },
// //     {
// //       id: 3,
// //       label: language === "fr" ? "Product" : "Product",
// //       route: "/Product",
// //     },
// //     {
// //       id: 4,
// //       label: language === "fr" ? "Contact" : "Contact",
// //       route: "/contact",
// //     },
// //   ];

// //   const toggleMenu = () => {
// //     setMenuVisible((prev) => !prev);
// //   };

// //   return (
// //     <header className="navbar">
// //       <div className="navbar-container">
// //         {/* Logo Section */}
// //         <Link to="/" className="navbar-logo">
// //           GrassHawk
// //         </Link>

// //         {/* Desktop Navigation */}
// //         <nav className="navbar-nav">
// //           {navItems.map((item) => (
// //             <Link key={item.id} to={item.route} className="navbar-link">
// //               {item.label}
// //             </Link>
// //           ))}
// //           <div className="language-toggle-container">
// //             <LanguageToggle language={language} setLanguage={setLanguage} />
// //           </div>
// //         </nav>

// //         {/* Mobile Menu Toggle */}
// //         <button onClick={toggleMenu} className="mobile-menu-toggle">
// //           {menuVisible ? <XIcon /> : <MenuIcon />}
// //         </button>
// //       </div>

// //       {/* Mobile Dropdown Menu */}
// //       <div className={`mobile-menu ${menuVisible ? "active" : ""}`}>
// //         <nav className="mobile-nav">
// //           {navItems.map((item) => (
// //             <Link
// //               key={item.id}
// //               to={item.route}
// //               onClick={() => setMenuVisible(false)}
// //               className="mobile-nav-link"
// //             >
// //               {item.label}
// //             </Link>
// //           ))}
// //           <div className="mobile-language-toggle">
// //             <LanguageToggle language={language} setLanguage={setLanguage} />
// //           </div>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Navbar;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import LanguageToggle from "./LanguageToggle";
// import "./Navbar.css";

// // Simple SVG icons to replace lucide-react
// const MenuIcon = () => (
//   <svg
//     className="mobile-menu-icon"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <line x1="3" y1="12" x2="21" y2="12"></line>
//     <line x1="3" y1="6" x2="21" y2="6"></line>
//     <line x1="3" y1="18" x2="21" y2="18"></line>
//   </svg>
// );

// const XIcon = () => (
//   <svg
//     className="mobile-menu-icon"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <line x1="18" y1="6" x2="6" y2="18"></line>
//     <line x1="6" y1="6" x2="18" y2="18"></line>
//   </svg>
// );

// const Navbar = ({ language, setLanguage }) => {
//   const [menuVisible, setMenuVisible] = useState(false);

//   const navItems = [
//     { id: 1, label: language === "fr" ? "Accueil" : "Home", route: "/" },
//     { id: 2, label: language === "fr" ? "À propos" : "About", route: "/about" },
//     {
//       id: 3,
//       label: language === "fr" ? "Produits" : "Products",
//       route: "/mole-trap", // Link to the new mole trap product page
//     },
//     {
//       id: 4,
//       label: language === "fr" ? "Contact" : "Contact",
//       route: "/contact",
//     },
//   ];

//   const toggleMenu = () => {
//     setMenuVisible((prev) => !prev);
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-container">
//         {/* Logo Section */}
//         <Link to="/" className="navbar-logo">
//           GrassHawk
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="navbar-nav">
//           {navItems.map((item) => (
//             <Link key={item.id} to={item.route} className="navbar-link">
//               {item.label}
//             </Link>
//           ))}
//           <div className="language-toggle-container">
//             <LanguageToggle language={language} setLanguage={setLanguage} />
//           </div>
//         </nav>

//         {/* Mobile Menu Toggle */}
//         <button onClick={toggleMenu} className="mobile-menu-toggle">
//           {menuVisible ? <XIcon /> : <MenuIcon />}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       <div className={`mobile-menu ${menuVisible ? "active" : ""}`}>
//         <nav className="mobile-nav">
//           {navItems.map((item) => (
//             <Link
//               key={item.id}
//               to={item.route}
//               onClick={() => setMenuVisible(false)}
//               className="mobile-nav-link"
//             >
//               {item.label}
//             </Link>
//           ))}
//           <div className="mobile-language-toggle">
//             <LanguageToggle language={language} setLanguage={setLanguage} />
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import Login from "./Login";
import Register from "./Register";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/logo.png";
import logoVibgyor from "../assets/logo_vibgyor.png";
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


const Navbar = ({ language, setLanguage }) => {
  const { cartCount } = useCart();
  // API base URL (will use environment variable in production)
  const API_BASE = process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4242';
  const [menuVisible, setMenuVisible] = useState(false);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Debug modal state changes
  useEffect(() => {
    console.log('Login modal state changed:', showLoginModal);
  }, [showLoginModal]);

  useEffect(() => {
    console.log('Register modal state changed:', showRegisterModal);
  }, [showRegisterModal]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [user, setUser] = useState(() => {
    // Load user from localStorage on component mount
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in based on localStorage
    return !!localStorage.getItem('token');
  });

  // Import translations at the top of the file if not already imported
  const t = require('../utils/translations').translations[language] || require('../utils/translations').translations.en;
  
  const navItems = [
    { id: 1, label: t.nav.home, route: "/" },
    { id: 2, label: t.nav.about, route: "/about" },
    {
      id: 3,
      label: t.nav.products,
      route: "/products",
      hasDropdown: false
    },
    {
      id: 4,
      label: t.nav.certificateTrust,
      route: "/certificate-trust",
    },
    {
      id: 5,
      label: t.nav.testimonials,
      route: "/testimonials",
    },
    {
      id: 6,
      label: t.nav.contact,
      route: "/contact",
    },
  ];

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Authentication functions
  const handleLogin = async (email, password) => {
    try {
      console.log('Attempting login with:', { email, password });
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (response.ok && data.success && data.data) {
        // Store in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        setUser(data.data.user);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        console.log('Login successful, user set:', data.data.user);
        return { success: true, message: data.message || 'Login successful!' };
      } else {
        console.log('Login failed:', data.message);
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success && data.data) {
        // Store in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        setUser(data.data.user);
        setIsLoggedIn(true);
        setShowRegisterModal(false);
        return { success: true, message: data.message || 'Registration successful!' };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Check if user is logged in on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
        setIsLoggedIn(true);
        
        // Verify token with backend
        fetch(`${API_BASE}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(data => {
          if (data.success && data.data) {
            setUser(data.data.user);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false);
          }
        })
        .catch(error => {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsLoggedIn(false);
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Removed legacy cart event listener

  // Close profile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-container">
            <div className="navbar-logo-icon">
              <img src={logoVibgyor} alt="VIBGYOR Maple Logo" className="navbar-logo-image" />
            </div>
            <span className="navbar-logo-text">VibgyorMaple</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav">
          {navItems.map((item) => (
            <div key={item.id} className="navbar-item-container">
              <Link to={item.route} className="navbar-link">
                {item.label}
              </Link>
            </div>
          ))}
          
          {/* Cart Icon */}
          <Link to="/cart-backend" className="navbar-cart" title={`${t.nav.cart} (${cartCount} ${cartCount === 1 ? 'item' : 'items'})`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 4 13 0 3 8-13 0"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Profile Icon - Always visible */}
          <div className="profile-menu-container">
            <div className="profile-icon" onClick={() => {
              console.log('Profile icon clicked!');
              setShowProfileMenu(!showProfileMenu);
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="profile-dropdown">
                {isLoggedIn ? (
                  <>
                    <div className="profile-user-info">
                      <div className="profile-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="profile-details">
                        <div className="profile-name">{user?.name || 'User'}</div>
                        <div className="profile-email">{user?.email}</div>
                      </div>
                    </div>
                    <div className="profile-divider"></div>
                    <button onClick={handleLogout} className="profile-menu-item logout-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      {t.nav.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        console.log('Login button clicked!');
                        setShowLoginModal(true);
                        setShowProfileMenu(false);
                      }} 
                      className="profile-menu-item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10,17 15,12 10,7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                      {t.nav.login}
                    </button>
                    <button 
                      onClick={() => {
                        setShowRegisterModal(true);
                        setShowProfileMenu(false);
                      }} 
                      className="profile-menu-item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                      {t.nav.register}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

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
          
          {/* Mobile Cart Link */}
          <Link
            to="/cart-backend"
            onClick={() => setMenuVisible(false)}
            className="mobile-nav-link mobile-cart-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 4 13 0 3 8-13 0"></path>
            </svg>
            {t.nav.cart} {cartCount > 0 && `(${cartCount})`}
          </Link>

          {/* Mobile Profile Section */}
          <div className="mobile-profile-section">
            {isLoggedIn ? (
              <>
                <div className="mobile-user-info">
                  <div className="mobile-user-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="mobile-user-details">
                    <div className="mobile-user-name">{user?.name || 'User'}</div>
                    <div className="mobile-user-email">{user?.email}</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMenuVisible(false);
                  }} 
                  className="mobile-nav-link mobile-logout-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16,17 21,12 16,7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                      {t.nav.logout}
                    </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setShowLoginModal(true);
                    setMenuVisible(false);
                  }} 
                  className="mobile-nav-link mobile-auth-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10,17 15,12 10,7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  {t.nav.login}
                </button>
                <button 
                  onClick={() => {
                    setShowRegisterModal(true);
                    setMenuVisible(false);
                  }} 
                  className="mobile-nav-link mobile-auth-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  {t.nav.register}
                </button>
              </>
            )}
          </div>

          <div className="mobile-language-toggle">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
        </nav>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <Login 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
          onLogin={handleLogin}
          language={language}
        />
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <Register 
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
          onRegister={handleRegister}
          language={language}
        />
      )}
    </header>
  );
};

export default Navbar;
