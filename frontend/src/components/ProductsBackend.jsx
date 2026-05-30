import React, { useState } from "react";
import "./Products.css";
import MoleTrapInstructions from "./MoleTrapInstructions";
import moletrapImage from "../assets/moletrap.png";
import easySetupIcon from "../assets/easytosetup.png";
import petFriendlyIcon from "../assets/petfriendly.png";
import weatherResistantIcon from "../assets/weatherresistance.png";
import durableIcon from "../assets/durableandheavyduty.png";
import ecoFriendlyIcon from "../assets/reusableandecofriendly.png";

const ProductsBackend = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionId] = useState("session123");

  const productList = [
    {
      id: 1,
      name: "Mole Trap",
      price: 29.99,
      description: "Get rid of moles quickly and safely with the Grasshawk Mole Trap. Designed for efficiency, reliability, and eco-friendliness, this durable trap ensures effective mole control without harmful chemicals. Easy to set up and reusable, it's the perfect solution for protecting your lawn and garden.",
      image: moletrapImage
    },
  ];

  const addToCart = async (product) => {
    try {
      setLoading(true);
      setMessage('');
      
      const response = await fetch(`http://localhost:4242/api/cart/${sessionId}/add`, {
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
    <section className="product-section" id="product">
      <div className="bubble-animation">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="product-container">
        <h2>Our Product: Mole Trap</h2>

        {/* Success/Error Message */}
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

        {/* ==== Product Row (Image + Info) ==== */}
        <div className="product-main-row">
          <div className="product-main-image-col">
            <div className="product-main-image-card">
              <img
                src={moletrapImage}
                alt="Grass Hawk Mole Trap"
                className="product-center-image"
              />
            </div>
          </div>

          <div className="product-main-info-col">
            <div className="product-main-info-card">
              <h3>{productList[0].name}</h3>
              <p>{productList[0].description}</p>
              <p>
                <strong>${productList[0].price}</strong>
              </p>
              <button 
                onClick={() => addToCart(productList[0])}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#ccc' : '#cc0000',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
        {/* ==== END Product Row ==== */}

        {/* ==== Instructions Section ==== */}
        <div className="instructions-section">
          <MoleTrapInstructions />
        </div>
        {/* ==== END Instructions Section ==== */}

        {/* ==== Features Section ==== */}
        <div className="features-section">
          <h3>Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <img src={easySetupIcon} alt="Easy to set up" />
              <p>Easy to set up</p>
            </div>
            <div className="feature-card">
              <img src={petFriendlyIcon} alt="Pet friendly" />
              <p>Pet friendly</p>
            </div>
            <div className="feature-card">
              <img src={weatherResistantIcon} alt="Weather resistant" />
              <p>Weather resistant</p>
            </div>
            <div className="feature-card">
              <img src={durableIcon} alt="Durable and heavy duty" />
              <p>Durable and heavy duty</p>
            </div>
            <div className="feature-card">
              <img src={ecoFriendlyIcon} alt="Reusable and eco-friendly" />
              <p>Reusable and eco-friendly</p>
            </div>
          </div>
        </div>
        {/* ==== END Features Section ==== */}

        {/* ==== Customer Reviews ==== */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header">
                <span className="reviewer-name">John D.</span>
                <span className="review-rating">★★★★★</span>
              </div>
              <p className="review-text">
                "Excellent product! Caught my first mole within 24 hours of setting it up. 
                Very easy to use and effective."
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <span className="reviewer-name">Sarah K.</span>
                <span className="review-rating">★★★★★</span>
              </div>
              <p className="review-text">
                "Professional quality at an affordable price. The instructions 
                were clear and I caught 3 moles in the first week. Highly 
                recommend!"
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <span className="reviewer-name">Lisa M.</span>
                <span className="review-rating">★★★★☆</span>
              </div>
              <p className="review-text">
                "Great product! It took a couple of days to figure out the best 
                placement, but once I did, it worked perfectly. Customer service 
                was very helpful too."
              </p>
            </div>
          </div>
        </div>
        {/* ==== END Customer Reviews ==== */}
      </div>
    </section>
  );
};

export default ProductsBackend;
