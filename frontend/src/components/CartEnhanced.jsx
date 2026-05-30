import React, { useState, useEffect } from "react";
import "./Cart.css";

const CartEnhanced = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(() => {
    // Get or create session ID from localStorage
    let storedSessionId = localStorage.getItem('cartSessionId');
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      localStorage.setItem('cartSessionId', storedSessionId);
    }
    return storedSessionId;
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Canada'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      
      // Always try to fetch from backend first
      const response = await fetch(`http://localhost:4242/api/cart/${sessionId}`);
      if (response.ok) {
        const cart = await response.json();
        const items = cart.items || [];
        setCartItems(items);
        // Store in localStorage
        localStorage.setItem('cartItems', JSON.stringify(items));
        localStorage.setItem('cartCount', items.length.toString());
      } else {
        // If backend fails, try localStorage as fallback
        const localCart = localStorage.getItem('cartItems');
        if (localCart) {
          const parsedCart = JSON.parse(localCart);
          setCartItems(parsedCart);
        }
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      // If backend fails, try localStorage as fallback
      const localCart = localStorage.getItem('cartItems');
      if (localCart) {
        const parsedCart = JSON.parse(localCart);
        setCartItems(parsedCart);
      } else {
        setError("Failed to load cart");
      }
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
        const items = result.cart.items || [];
        setCartItems(items);
        // Store in localStorage
        localStorage.setItem('cartItems', JSON.stringify(items));
        // Update cart count in localStorage for navbar
        localStorage.setItem('cartCount', items.length.toString());
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

  // Handle order details change
  const handleOrderDetailsChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value
    });
  };

  // Place order
  const placeOrder = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate required fields
      if (!orderDetails.name || !orderDetails.email || !orderDetails.address || 
          !orderDetails.city || !orderDetails.postalCode) {
        setError('Please fill in all required fields');
        return;
      }

      // Calculate pricing
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * 0.13;
      const shipping = subtotal > 50 ? 0 : 9.99;
      const total = subtotal + tax + shipping;

      // Create order data
      const orderData = {
        sessionId: sessionId,
        items: cartItems,
        customerDetails: orderDetails,
        pricing: {
          subtotal: subtotal,
          tax: tax,
          shipping: shipping,
          total: total
        },
        payment: {
          paymentMethod: paymentMethod,
          paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
          paymentDate: new Date()
        },
        status: 'pending'
      };

      // Save order to database
      const response = await fetch('http://localhost:4242/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order saved to database:', result);
        
        // Clear localStorage cart
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartSessionId');
        
        setOrderPlaced(true);
        setCartItems([]); // Clear cart
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to place order');
      }
      
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = (event) => {
      console.log('CartEnhanced received cart update:', event.detail);
      if (event.detail && event.detail.items) {
        setCartItems(event.detail.items);
        localStorage.setItem('cartItems', JSON.stringify(event.detail.items));
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.13; // 13% tax
  const shipping = total > 50 ? 0 : 9.99; // Free shipping over $50
  const finalTotal = total + tax + shipping;

  return (
    <section className="cart-section" id="cart">
      <div className="cart-wrapper">
        <div className="cart-container">
          <h2>Your Shopping Cart</h2>
          
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

          {orderPlaced ? (
            <div className="order-success-message">
              <div className="success-icon">✅</div>
              <h3>Order Placed Successfully!</h3>
              <p>Thank you for your order. We'll process it and send you a confirmation email shortly.</p>
              <div className="order-details-summary">
                <p><strong>Payment Method:</strong> {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Stripe'}</p>
                <p><strong>Total Amount:</strong> ${finalTotal.toFixed(2)}</p>
                <p><strong>Delivery Address:</strong> {orderDetails.address}, {orderDetails.city}</p>
              </div>
              <button 
                onClick={() => {
                  setOrderPlaced(false);
                  setOrderDetails({
                    name: '',
                    email: '',
                    address: '',
                    city: '',
                    postalCode: '',
                    country: 'Canada'
                  });
                }}
                className="continue-shopping-btn"
              >
                Continue Shopping
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart-container">
              <div className="empty-cart-illustration">
                <div className="empty-cart-icon">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="cart-svg">
                    <circle cx="60" cy="60" r="50" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2"/>
                    <path d="M40 50 L80 50 M45 60 L75 60 M50 70 L70 70" stroke="#6c757d" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="45" cy="45" r="3" fill="#cc0000"/>
                    <circle cx="75" cy="45" r="3" fill="#cc0000"/>
                  </svg>
                </div>
                <div className="empty-cart-content">
                  <h2 className="empty-cart-title">Your Shopping Cart</h2>
                  <div className="empty-cart-count">
                    <span className="count-number">0</span>
                    <span className="count-text">Products in Cart</span>
                  </div>
                  <p className="empty-cart-message">
                    Your cart is currently empty. Add some products to get started!
                  </p>
                  <div className="empty-cart-actions">
                    <button 
                      className="browse-products-btn"
                      onClick={() => window.location.href = '/products'}
                    >
                      🛍️ Browse Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="cart-content">
              {/* Cart Items Card */}
              <div className="cart-card">
                <div className="card-header">
                  <h3>🛒 Cart Items</h3>
                  <span className="item-count">{cartItems.length} item(s)</span>
                </div>
                <div className="card-content">
                  {cartItems.map((item, index) => (
                    <div key={index} className="cart-item-card">
                      <div className="item-image">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-price">${item.price.toFixed(2)} each</p>
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={loading}
                            className="qty-btn"
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={loading}
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="item-total">
                        <p className="item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          disabled={loading}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="order-summary-card">
                <div className="card-header">
                  <h3>📋 Order Summary</h3>
                </div>
                <div className="card-content">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (13%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span><strong>Total:</strong></span>
                    <span><strong>${finalTotal.toFixed(2)}</strong></span>
                  </div>
                  {total > 50 && (
                    <div className="free-shipping-badge">
                      🎉 You qualify for FREE shipping!
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Options Card */}
              <div className="payment-card">
                <div className="card-header">
                  <h3>💳 Payment Options</h3>
                </div>
                <div className="card-content">
                  <div className="payment-options">
                    {/* Payment Method Selection */}
                    <div className="payment-method-selection">
                      <div className="payment-option">
                        <input
                          type="radio"
                          id="stripe"
                          name="paymentMethod"
                          value="stripe"
                          checked={paymentMethod === 'stripe'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="stripe" className="payment-option-label stripe-option">
                          <div className="payment-icon-container">
                            <span className="payment-icon">💳</span>
                            <div className="payment-badge">SECURE</div>
                          </div>
                          <div className="payment-text">
                            <div className="payment-title">Pay with Stripe</div>
                            <div className="payment-subtitle">Secure online payment • Instant confirmation</div>
                            <div className="payment-features">
                              <span className="feature-tag">🔒 SSL Encrypted</span>
                              <span className="feature-tag">⚡ Instant</span>
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="payment-option">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="cod" className="payment-option-label cod-option">
                          <div className="payment-icon-container">
                            <span className="payment-icon">💰</span>
                            <div className="payment-badge cod-badge">POPULAR</div>
                          </div>
                          <div className="payment-text">
                            <div className="payment-title">Cash on Delivery</div>
                            <div className="payment-subtitle">Pay when you receive your order • No upfront payment</div>
                            <div className="payment-features">
                              <span className="feature-tag">🚚 Free Delivery</span>
                              <span className="feature-tag">💵 Cash Only</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="payment-info">
                      <p>🔒 Your payment information is secure and encrypted</p>
                      <p>✅ 30-day money-back guarantee</p>
                      <p>🚚 Free shipping on orders over $50</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details Card */}
              <div className="order-details-card">
                <div className="card-header">
                  <h3>📝 Order Details</h3>
                </div>
                <div className="card-content">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={orderDetails.name}
                        onChange={handleOrderDetailsChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={orderDetails.email}
                        onChange={handleOrderDetailsChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={orderDetails.address}
                        onChange={handleOrderDetailsChange}
                        placeholder="Enter your address"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={orderDetails.city}
                        onChange={handleOrderDetailsChange}
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={orderDetails.postalCode}
                        onChange={handleOrderDetailsChange}
                        placeholder="Enter postal code"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        name="country"
                        value={orderDetails.country}
                        onChange={handleOrderDetailsChange}
                      >
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="order-submit-section">
                    <button
                      onClick={placeOrder}
                      className="place-order-btn"
                      disabled={loading || cartItems.length === 0}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                    <p className="order-note">
                      By placing this order, you agree to our terms and conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .cart-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cart-card, .order-summary-card, .payment-card, .order-details-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid #e0e0e0;
        }

        .card-header {
          background: linear-gradient(135deg, #cc0000, #ff4444);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .card-content {
          padding: 20px;
        }

        .cart-item-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .cart-item-card:last-child {
          border-bottom: none;
        }

        .item-details {
          flex: 1;
        }

        .item-details h4 {
          margin: 0 0 8px 0;
          color: #333;
          font-size: 16px;
        }

        .item-price {
          margin: 0 0 12px 0;
          color: #666;
          font-size: 14px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .qty-btn:hover {
          background: #f5f5f5;
        }

        .quantity {
          min-width: 24px;
          text-align: center;
          font-weight: 600;
        }

        .item-total {
          text-align: right;
        }

        .item-total-price {
          font-size: 18px;
          font-weight: 600;
          color: #cc0000;
          margin: 0 0 8px 0;
        }

        .remove-btn {
          background: #ff4444;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
        }

        .remove-btn:hover {
          background: #cc0000;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 8px 0;
        }

        .total-row {
          border-top: 2px solid #e0e0e0;
          margin-top: 12px;
          padding-top: 16px;
          font-size: 18px;
        }

        .free-shipping-badge {
          background: #d4edda;
          color: #155724;
          padding: 8px 12px;
          border-radius: 6px;
          text-align: center;
          margin-top: 12px;
          font-size: 14px;
        }

        .stripe-payment-btn {
          width: 100%;
          background: linear-gradient(135deg, #635bff, #4f46e5);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 16px;
        }

        .stripe-payment-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 91, 255, 0.3);
        }

        .stripe-payment-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .payment-btn-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .payment-icon {
          font-size: 24px;
        }

        .payment-text {
          flex: 1;
          text-align: left;
        }

        .payment-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .payment-subtitle {
          font-size: 12px;
          opacity: 0.9;
        }

        .payment-arrow {
          font-size: 20px;
        }

        .payment-info {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #28a745;
        }

        .payment-info p {
          margin: 4px 0;
          font-size: 14px;
          color: #666;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #333;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #cc0000;
          box-shadow: 0 0 0 3px rgba(204, 0, 0, 0.1);
        }

        .payment-method-selection {
          margin-bottom: 20px;
        }

        .payment-option {
          margin-bottom: 12px;
        }

        .payment-option input[type="radio"] {
          display: none;
        }

        .payment-option-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .payment-option input[type="radio"]:checked + .payment-option-label {
          border-color: #cc0000;
          background-color: #fff5f5;
        }

        .payment-option-label:hover {
          border-color: #cc0000;
        }

        .order-submit-section {
          margin-top: 24px;
          text-align: center;
        }

        .place-order-btn {
          background: linear-gradient(135deg, #cc0000, #ff4444);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }

        .place-order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(204, 0, 0, 0.3);
        }

        .place-order-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .order-note {
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .order-success-message {
          text-align: center;
          padding: 40px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .order-success-message h3 {
          color: #28a745;
          margin-bottom: 16px;
          font-size: 24px;
        }

        .order-success-message p {
          color: #666;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .order-details-summary {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: left;
        }

        .order-details-summary p {
          margin: 8px 0;
          color: #333;
        }

        .continue-shopping-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .continue-shopping-btn:hover {
          background: #0056b3;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .cart-item-card {
            flex-direction: column;
            text-align: center;
          }
          
          .item-total {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default CartEnhanced;
