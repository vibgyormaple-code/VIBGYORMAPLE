import React, { useState, useEffect } from "react";
import "./Cart.css";

const CartBackend = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId] = useState("session123"); // You can generate a unique session ID

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4242/api/cart/${sessionId}`);
      if (response.ok) {
        const cart = await response.json();
        setCartItems(cart.items || []);
      }
    } catch (err) {
      setError("Failed to load cart");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4242/api/cart/${sessionId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id || product.name.toLowerCase().replace(/\s+/g, '-'),
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image || "https://via.placeholder.com/150"
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setCartItems(result.cart.items || []);
        setError(null);
      } else {
        setError("Failed to add item to cart");
      }
    } catch (err) {
      setError("Failed to add item to cart");
      console.error("Error adding to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      // For now, we'll just refetch the cart
      // In a real app, you'd have a remove endpoint
      await fetchCart();
    } catch (err) {
      setError("Failed to remove item from cart");
      console.error("Error removing from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    try {
      setLoading(true);
      // For now, we'll just refetch the cart
      // In a real app, you'd have an update endpoint
      await fetchCart();
    } catch (err) {
      setError("Failed to update quantity");
      console.error("Error updating quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create Stripe checkout session
  const createCheckoutSession = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Creating Stripe checkout session...');
      
      const response = await fetch("http://localhost:4242/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId
        }),
      });

      console.log('Stripe response status:', response.status);
      const result = await response.json();
      console.log('Stripe response data:', result);

      if (response.ok && result.url) {
        console.log('Redirecting to Stripe checkout:', result.url);
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        const errorMsg = result.message || result.error || "Failed to create checkout session";
        setError(`Stripe Error: ${errorMsg}`);
        console.error('Stripe checkout failed:', result);
      }
    } catch (err) {
      setError("Network error: Failed to create checkout session");
      console.error("Error creating checkout session:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="cart-section" id="cart">
      <div className="cart-wrapper">
        <div className="cart-container">
          <h2>Your Cart</h2>
          
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          {loading && (
            <div className="loading-message" style={{ marginBottom: '20px' }}>
              Loading...
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <h3>0 Products in Cart</h3>
              <p>Your cart is currently empty. Add some products to get started!</p>
            </div>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="item-info">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                      />
                      <span>
                        {item.name} - ${item.price} x {item.quantity}
                      </span>
                    </div>
                    <div className="cart-controls">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={loading}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={loading}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        disabled={loading}
                        style={{ backgroundColor: '#ff4444' }}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
              </div>
              <button
                onClick={createCheckoutSession}
                className="checkout-btn"
                disabled={loading || cartItems.length === 0}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout (Stripe)'}
              </button>
              <div style={{ 
                marginTop: '10px', 
                fontSize: '12px', 
                color: '#666',
                textAlign: 'center'
              }}>
                Note: Stripe checkout requires a real API key. Check console for details.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartBackend;