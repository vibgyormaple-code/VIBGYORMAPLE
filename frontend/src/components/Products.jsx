// // import React from "react";
// // import "./Products.css";
// // import MoleTrapInstructions from "./MoleTrapInstructions";
// // import moletrapImage from "../assets/moletrap.png";
// // import easySetupIcon from "../assets/easytosetup.png"; // Corrected path
// // import petFriendlyIcon from "../assets/petfriendly.png"; // Corrected path
// // import weatherResistantIcon from "../assets/weatherresistance.png"; // Corrected path
// // import durableIcon from "../assets/durableandheavyduty.png"; // Corrected path
// // import ecoFriendlyIcon from "../assets/reusableandecofriendly.png"; // Corrected path

// // const Products = ({ addToCart }) => {
// //   const productList = [
// //     {
// //       name: "Mole Trap Basic",
// //       price: 799,
// //       description: "One unit with manual guide",
// //     },
// //   ];

// //   return (
// //     <section className="product-section" id="product">
// //       <div className="product-container">
// //         <h2>Our Product: Mole Trap</h2>

// //         {/* Central Image Section with Frame and Animation */}
// //         <div className="product-main-row">
// //           <div className="product-main-image-col">
// //             <div className="product-main-image-card">
// //               <img
// //                 src={moletrapImage}
// //                 alt="Grass Hawk Mole Trap"
// //                 className="product-center-image"
// //               />
// //             </div>
// //           </div>

// //           <div className="product-main-info-col">

// //         {/* Mole Trap Instructions Section */}
// //         <div className="instructions-section">
// //           <MoleTrapInstructions />
// //         </div>

// //         {/* Features Section */}
// //         <div className="features-section">
// //           <h3>Features</h3>
// //           <div className="features-grid">
// //             <div className="feature-card">
// //               <img src={easySetupIcon} alt="Easy to set up" />
// //               <p>Easy to set up</p>
// //             </div>
// //             <div className="feature-card">
// //               <img src={petFriendlyIcon} alt="Pet friendly" />
// //               <p>Pet friendly</p>
// //             </div>
// //             <div className="feature-card">
// //               <img src={weatherResistantIcon} alt="Weather resistant" />
// //               <p>Weather resistant</p>
// //             </div>
// //             <div className="feature-card">
// //               <img src={durableIcon} alt="Durable and heavy duty" />
// //               <p>Durable and heavy duty</p>
// //             </div>
// //             <div className="feature-card">
// //               <img src={ecoFriendlyIcon} alt="Reusable and eco-friendly" />
// //               <p>Reusable and eco-friendly</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Customer Reviews Section */}
// //         <div className="reviews-section">
// //           <h3>Customer Reviews</h3>
// //           <div className="reviews-grid">
// //             <div className="review-card">
// //               <div className="review-header">
// //                 <span className="reviewer-name">Sarah J.</span>
// //                 <span className="review-rating">★★★★★</span>
// //               </div>
// //               <p className="review-text">
// //                 "This mole trap saved my garden! After trying everything, the
// //                 Grass Hawk worked on the first try. Easy to set up and very
// //                 effective."
// //               </p>
// //             </div>

// //             <div className="review-card">
// //               <div className="review-header">
// //                 <span className="reviewer-name">Mike T.</span>
// //                 <span className="review-rating">★★★★★</span>
// //               </div>
// //               <p className="review-text">
// //                 "Professional quality at an affordable price. The instructions
// //                 were clear and I caught 3 moles in the first week. Highly
// //                 recommend!"
// //               </p>
// //             </div>

// //             <div className="review-card">
// //               <div className="review-header">
// //                 <span className="reviewer-name">Lisa M.</span>
// //                 <span className="review-rating">★★★★☆</span>
// //               </div>
// //               <p className="review-text">
// //                 "Great product! It took a couple of days to figure out the best
// //                 placement, but once I did, it worked perfectly. Customer service
// //                 was very helpful too."
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Products;
// import React from "react";
// import "./Products.css";
// import MoleTrapInstructions from "./MoleTrapInstructions";
// import moletrapImage from "../assets/moletrap.png";
// import easySetupIcon from "../assets/easytosetup.png";
// import petFriendlyIcon from "../assets/petfriendly.png";
// import weatherResistantIcon from "../assets/weatherresistance.png";
// import durableIcon from "../assets/durableandheavyduty.png";
// import ecoFriendlyIcon from "../assets/reusableandecofriendly.png";

// const Products = ({ addToCart }) => {
//   const productList = [
//     {
//       name: "Mole Trap Basic",
//       price: 799,
//       description: "One unit with manual guide",
//     },
//   ];

//   return (
//     <section className="product-section" id="product">
//       <div className="product-container">
//         <h2>Our Product: Mole Trap</h2>

//         {/* Central Image Section with Frame and Animation */}
//         <div className="product-main-row">
//           <div className="product-main-image-col">
//             <div className="product-main-image-card">
//               <img
//                 src={moletrapImage}
//                 alt="Grass Hawk Mole Trap"
//                 className="product-center-image"
//               />
//             </div>
//           </div>

//           <div className="product-main-info-col">
//             {/* Mole Trap Instructions Section */}
//             <div className="instructions-section">
//               <MoleTrapInstructions />
//             </div>

//             {/* Features Section */}
//             <div className="features-section">
//               <h3>Features</h3>
//               <div className="features-grid">
//                 <div className="feature-card">
//                   <img src={easySetupIcon} alt="Easy to set up" />
//                   <p>Easy to set up</p>
//                 </div>
//                 <div className="feature-card">
//                   <img src={petFriendlyIcon} alt="Pet friendly" />
//                   <p>Pet friendly</p>
//                 </div>
//                 <div className="feature-card">
//                   <img src={weatherResistantIcon} alt="Weather resistant" />
//                   <p>Weather resistant</p>
//                 </div>
//                 <div className="feature-card">
//                   <img src={durableIcon} alt="Durable and heavy duty" />
//                   <p>Durable and heavy duty</p>
//                 </div>
//                 <div className="feature-card">
//                   <img src={ecoFriendlyIcon} alt="Reusable and eco-friendly" />
//                   <p>Reusable and eco-friendly</p>
//                 </div>
//               </div>
//             </div>

//             {/* Customer Reviews Section */}
//             <div className="reviews-section">
//               <h3>Customer Reviews</h3>
//               <div className="reviews-grid">
//                 <div className="review-card">
//                   <div className="review-header">
//                     <span className="reviewer-name">Sarah J.</span>
//                     <span className="review-rating">★★★★★</span>
//                   </div>
//                   <p className="review-text">
//                     "This mole trap saved my garden! After trying everything, the
//                     Grass Hawk worked on the first try. Easy to set up and very
//                     effective."
//                   </p>
//                 </div>

//                 <div className="review-card">
//                   <div className="review-header">
//                     <span className="reviewer-name">Mike T.</span>
//                     <span className="review-rating">★★★★★</span>
//                   </div>
//                   <p className="review-text">
//                     "Professional quality at an affordable price. The instructions
//                     were clear and I caught 3 moles in the first week. Highly
//                     recommend!"
//                   </p>
//                 </div>

//                 <div className="review-card">
//                   <div className="review-header">
//                     <span className="reviewer-name">Lisa M.</span>
//                     <span className="review-rating">★★★★☆</span>
//                   </div>
//                   <p className="review-text">
//                     "Great product! It took a couple of days to figure out the best
//                     placement, but once I did, it worked perfectly. Customer service
//                     was very helpful too."
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div> {/* ✅ closing .product-main-info-col */}
//         </div> {/* ✅ closing .product-main-row */}
//       </div> {/* ✅ closing .product-container */}
//     </section>
//   );
// };

// export default Products;

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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

const Products = ({ addToCart, language = "en" }) => {
  const t = translations[language] || translations.en;
  const { addToCart: addToCartContext } = useCart();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState("grasshawk");
  const [selectedBrand, setSelectedBrand] = useState("grasshawk"); // State for brand selection
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // Handle URL parameters for product selection
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (
      productParam &&
      ["grasshawk", "ecoseed", "wintershield", "naturefeed"].includes(
        productParam
      )
    ) {
      setSelectedProduct(productParam);
    }
  }, [searchParams]);

  // Add to cart function that connects to backend
  const addToCartBackend = async (product) => {
    if (!product || !product.available) {
      setMessage(t.products.comingSoon);
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Use the cart context to add item
      const result = await addToCartContext({
        id: product.name.toLowerCase().replace(/\s+/g, "-"),
        name: product.name,
        price: product.price,
        image: "/api/placeholder/300/200",
      });

      if (result.success) {
        setMessage(t.products.addedToCart);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(result.message || t.products.errorAddingToCart);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage(t.products.errorAddingToCart);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const productList = {
    grasshawk: {
      name: t.products.grasshawk.name,
      price: 20,
      description: t.products.grasshawk.description,
      available: true,
      company: "VibgyorMaple",
      productLine: "Grasshawk Series",
      image: moletrapImage,
    },
    ecoseed: {
      name: t.products.ecoseed.name,
      price: 0,
      description: t.products.ecoseed.description,
      available: false,
      company: "VibgyorMaple",
      productLine: "EcoSeed Series",
      image: trapImage,
    },
    wintershield: {
      name: t.products.wintershield.name,
      price: 0,
      description: t.products.wintershield.description,
      available: false,
      company: "VibgyorMaple",
      productLine: "WinterShield Series",
      image: moleTrapHeroImage,
    },
    naturefeed: {
      name: t.products.naturefeed.name,
      price: 0,
      description: t.products.naturefeed.description,
      available: false,
      company: "VibgyorMaple",
      productLine: "NatureFeed Series",
      image: moletrapImage,
    },
  };

  const currentProduct = productList[selectedProduct] || productList.grasshawk;

  // Function to handle product card click
  const handleProductClick = (productKey) => {
    const product = productList[productKey];
    setModalProduct(product);
    setShowProductModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowProductModal(false);
    setModalProduct(null);
  };

  return (
    <section className="product-section" id="product">
      <div className="product-container">
        <h2>{t.products.title}</h2>

        {/* ==== Single Product Card with Brand Selection ==== */}
        <div className="product-cards-grid">
          <div className="product-card">
            {/* Brand Selection Buttons */}
            <div className="brand-selector">
              <button
                className={`brand-button ${
                  selectedBrand === "grasshawk" ? "active" : ""
                }`}
                onClick={() => setSelectedBrand("grasshawk")}
              >
                <span className="brand-icon">🦅</span>
                Grasshawk
                {selectedBrand === "grasshawk" && (
                  <span className="checkmark">✓</span>
                )}
              </button>
              <button
                className={`brand-button ${
                  selectedBrand === "vibgyormaple" ? "active" : ""
                }`}
                onClick={() => setSelectedBrand("vibgyormaple")}
              >
                <span className="brand-icon">🍁</span>
                VibgyorMaple
                {selectedBrand === "vibgyormaple" && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            </div>

            <div className="product-card-image">
              <img
                src={productList.grasshawk.image}
                alt={productList.grasshawk.name}
                className="product-card-img"
              />
            </div>
            <div className="product-card-content">
              <h3 className="product-card-title">Grasshawk KLAW</h3>

              <p className="product-card-description">
                {selectedBrand === "grasshawk"
                  ? productList.grasshawk.description
                  : "Coming soon with innovative backyard protection solutions designed for Canadian homes."}
              </p>

              <div className="product-card-price">
                {selectedBrand === "grasshawk" ? (
                  <span className="price">${productList.grasshawk.price}</span>
                ) : (
                  <span className="coming-soon">{t.products.comingSoon}</span>
                )}
              </div>

              <button
                className="know-more-btn"
                onClick={() => {
                  if (selectedBrand === "grasshawk") {
                    setModalProduct(productList.grasshawk);
                    setShowProductModal(true);
                  } else {
                    setShowProductModal(true);
                  }
                }}
              >
                {t.products.viewDetails}
              </button>
            </div>
          </div>
        </div>
        {/* ==== END Single Product Card ==== */}
      </div>

      {/* ==== Product Detail Modal ==== */}
      {showProductModal && (
        <div className="fullscreen-modal-overlay" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', zIndex: 99999, overflowY: 'auto' }}>
          <div
            className="fullscreen-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: 'white', minHeight: '100vh', width: '100%' }}
          >
            <button className="fullscreen-close-btn" onClick={closeModal} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 999999, width: '50px', height: '50px', fontSize: '28px', backgroundColor: '#cc0000', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(204,0,0,0.3)' }}>
              ×
            </button>

            <div className="fullscreen-content" style={{ backgroundColor: 'white', paddingBottom: '50px' }}>
              {/* Brand Selection Buttons in Modal */}
              <div className="brand-selector">
                <button
                  className={`brand-button ${
                    selectedBrand === "grasshawk" ? "active" : ""
                  }`}
                  onClick={() => setSelectedBrand("grasshawk")}
                >
                  <span className="brand-icon">🦅</span>
                  Grasshawk
                  {selectedBrand === "grasshawk" && (
                    <span className="checkmark">✓</span>
                  )}
                </button>
                <button
                  className={`brand-button ${
                    selectedBrand === "vibgyormaple" ? "active" : ""
                  }`}
                  onClick={() => setSelectedBrand("vibgyormaple")}
                >
                  <span className="brand-icon">🍁</span>
                  VibgyorMaple
                  {selectedBrand === "vibgyormaple" && (
                    <span className="checkmark">✓</span>
                  )}
                </button>
              </div>

              {/* Conditional Content Based on Selected Brand */}
              {selectedBrand === "grasshawk" ? (
                <>
                  <div className="fullscreen-header">
                    <h2>
                      {t.products.ourProduct}: {productList.grasshawk.name}
                    </h2>
                  </div>

                  {/* ==== Product Row (Image + Info) ==== */}
                  <div className="product-main-row">
                    <div className="product-main-image-col">
                      <div className="product-main-image-card">
                        <img
                          src={productList.grasshawk.image}
                          alt={productList.grasshawk.name}
                          className="product-center-image"
                        />
                      </div>
                    </div>

                    <div className="product-main-info-col">
                      <div className="product-main-info-card">
                        <div className="product-company-info">
                          <span className="company-name">
                            {productList.grasshawk.company}
                          </span>
                          <span className="product-line">
                            {productList.grasshawk.productLine}
                          </span>
                        </div>
                        <div className="product-title-with-logo">
                          <div className="product-logo">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              className="maple-leaf-small"
                            >
                              <defs>
                                <filter
                                  id="small-shadow"
                                  x="-20%"
                                  y="-20%"
                                  width="140%"
                                  height="140%"
                                >
                                  <feDropShadow
                                    dx="1"
                                    dy="1"
                                    stdDeviation="1"
                                    floodColor="#888"
                                    floodOpacity="0.3"
                                  />
                                </filter>
                              </defs>
                              <path
                                d="M20 3 L23 8 L28 6 L26 12 L32 13 L28 18 L30 22 L23 20 L20 28 L17 20 L10 22 L12 18 L8 13 L14 12 L12 6 L17 8 Z"
                                fill="black"
                                stroke="red"
                                strokeWidth="1"
                                filter="url(#small-shadow)"
                              />
                            </svg>
                          </div>
                          <h3>{productList.grasshawk.name}</h3>
                        </div>
                        <p>{productList.grasshawk.description}</p>
                        
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

                        <p>
                          <strong>${productList.grasshawk.price}</strong>
                        </p>
                        <button
                          onClick={() =>
                            addToCartBackend(productList.grasshawk)
                          }
                          disabled={loading}
                          className="add-to-cart-btn"
                        >
                          {loading
                            ? t.products.adding || "Adding..."
                            : t.products.addToCart}
                        </button>
                        {message && (
                          <div
                            className={`message ${
                              message.includes("successfully")
                                ? "success"
                                : "error"
                            }`}
                          >
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
                    <h3 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                      {t.products.features}
                    </h3>
                    <div className="features-grid">
                      <div
                        className="feature-card"
                        style={{
                          borderRadius: "0px",
                          width: "250px",
                          height: "250px",
                          minWidth: "250px",
                          maxWidth: "250px",
                          minHeight: "250px",
                          maxHeight: "250px",
                        }}
                      >
                        <img
                          src={easySetupIcon}
                          alt={t.products.easyToSetUp}
                          style={{ width: "120px", height: "120px" }}
                        />
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            marginTop: "15px",
                          }}
                        >
                          {t.products.easyToSetUp}
                        </p>
                      </div>
                      <div
                        className="feature-card"
                        style={{
                          borderRadius: "0px",
                          width: "250px",
                          height: "250px",
                          minWidth: "250px",
                          maxWidth: "250px",
                          minHeight: "250px",
                          maxHeight: "250px",
                        }}
                      >
                        <img
                          src={petFriendlyIcon}
                          alt={t.products.petFriendly}
                          style={{ width: "120px", height: "120px" }}
                        />
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            marginTop: "15px",
                          }}
                        >
                          {t.products.petFriendly}
                        </p>
                      </div>
                      <div
                        className="feature-card"
                        style={{
                          borderRadius: "0px",
                          width: "250px",
                          height: "250px",
                          minWidth: "250px",
                          maxWidth: "250px",
                          minHeight: "250px",
                          maxHeight: "250px",
                        }}
                      >
                        <img
                          src={weatherResistantIcon}
                          alt={t.products.weatherResistant}
                          style={{ width: "120px", height: "120px" }}
                        />
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            marginTop: "15px",
                          }}
                        >
                          {t.products.weatherResistant}
                        </p>
                      </div>
                      <div
                        className="feature-card"
                        style={{
                          borderRadius: "0px",
                          width: "250px",
                          height: "250px",
                          minWidth: "250px",
                          maxWidth: "250px",
                          minHeight: "250px",
                          maxHeight: "250px",
                        }}
                      >
                        <img
                          src={durableIcon}
                          alt={t.products.durableAndHeavyDuty}
                          style={{ width: "120px", height: "120px" }}
                        />
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            marginTop: "15px",
                          }}
                        >
                          {t.products.durableAndHeavyDuty}
                        </p>
                      </div>
                      <div
                        className="feature-card"
                        style={{
                          borderRadius: "0px",
                          width: "250px",
                          height: "250px",
                          minWidth: "250px",
                          maxWidth: "250px",
                          minHeight: "250px",
                          maxHeight: "250px",
                        }}
                      >
                        <img
                          src={ecoFriendlyIcon}
                          alt={t.products.reusableAndEcoFriendly}
                          style={{ width: "120px", height: "120px" }}
                        />
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            marginTop: "15px",
                          }}
                        >
                          {t.products.reusableAndEcoFriendly}
                        </p>
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
                          "This mole trap saved my garden! After trying
                          everything, the Grass Hawk worked on the first try.
                          Easy to set up and very effective."
                        </p>
                      </div>

                      <div className="review-card">
                        <div className="review-header">
                          <span className="reviewer-name">Mike T.</span>
                          <span className="review-rating">★★★★★</span>
                        </div>
                        <p className="review-text">
                          "Professional quality at an affordable price. The
                          instructions were clear and I caught 3 moles in the
                          first week. Highly recommend!"
                        </p>
                      </div>

                      <div className="review-card">
                        <div className="review-header">
                          <span className="reviewer-name">Lisa M.</span>
                          <span className="review-rating">★★★★☆</span>
                        </div>
                        <p className="review-text">
                          "Great product! It took a couple of days to figure out
                          the best placement, but once I did, it worked
                          perfectly. Customer service was very helpful too."
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* ==== END Customer Reviews ==== */}
                </>
              ) : (
                /* VIBGYOR Maple Coming Soon Section */
                <div className="coming-soon-section">
                  <div className="coming-soon-container">
                    <div className="coming-soon-icon">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        className="maple-leaf-large"
                      >
                        <defs>
                          <filter
                            id="leaf-shadow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                          >
                            <feDropShadow
                              dx="2"
                              dy="2"
                              stdDeviation="3"
                              floodColor="#888"
                              floodOpacity="0.3"
                            />
                          </filter>
                        </defs>
                        <path
                          d="M60 8 L70 25 L85 20 L80 35 L95 38 L85 50 L90 60 L70 55 L60 75 L50 55 L30 60 L35 50 L25 38 L40 35 L35 20 L50 25 Z"
                          fill="#e74c3c"
                          stroke="#c0392b"
                          strokeWidth="2"
                          filter="url(#leaf-shadow)"
                        />
                      </svg>
                    </div>
                    <h2 className="coming-soon-title">
                      VibgyorMaple Products
                    </h2>
                    <h3 className="coming-soon-subtitle">
                      {t.products.comingSoon || "Coming Soon"}
                    </h3>
                    <p className="coming-soon-description">
                      We're excited to bring you a complete range of premium
                      backyard protection and garden care solutions. Stay tuned
                      for innovative products designed specifically for Canadian
                      homes.
                    </p>
                    <div className="coming-soon-features">
                      <div className="coming-soon-feature">
                        <span className="feature-emoji">🌱</span>
                        <span>EcoSeed Pro - Premium Grass Seeds</span>
                      </div>
                      <div className="coming-soon-feature">
                        <span className="feature-emoji">🛡️</span>
                        <span>WinterShield - Plant Protection</span>
                      </div>
                      <div className="coming-soon-feature">
                        <span className="feature-emoji">🌿</span>
                        <span>NatureFeed - Organic Nutrients</span>
                      </div>
                      <div className="coming-soon-feature">
                        <span className="feature-emoji">🌲</span>
                        <span>GardenPro - Smart Garden Tools</span>
                      </div>
                    </div>
                    <div className="coming-soon-cta">
                      <p className="notify-text">
                        Want to be notified when we launch?
                      </p>
                      <button
                        className="notify-button"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* ==== END Product Detail Modal ==== */}
    </section>
  );
};

export default Products;
