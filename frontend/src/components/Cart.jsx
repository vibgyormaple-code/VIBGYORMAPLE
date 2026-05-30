import React, { useState } from "react";
import "./Cart.css";
import Checkout from "./Checkout";

const Cart = ({ items, removeFromCart, updateQuantity, clearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "" });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Order placed by ${formData.name}!\nDelivery to: ${formData.address}`
    );
    clearCart();
    setShowCheckout(false);
    setFormData({ name: "", address: "" });
  };

  return (
    <section className="cart-section" id="cart">
      <div className="cart-wrapper">
        <div className="cart-container">
          <h2>Your Cart</h2>
          
          {/* Always display 0 products when cart is empty */}
          <div className="empty-cart-message">
            <h3>0 Products in Cart</h3>
            <p>Your cart is currently empty. Add some products to get started!</p>
          </div>

          {/* Cart items display */}
          {items.length > 0 && (
            <>
              <ul className="cart-list">
                {items.map((item, index) => (
                  <li key={index} className="cart-item">
                    <span>
                      {item.name} - ${item.price} x {item.quantity}
                    </span>
                    <div className="cart-controls">
                      <button onClick={() => updateQuantity(item.name, -1)}>
                        -
                      </button>
                      <button onClick={() => updateQuantity(item.name, 1)}>
                        +
                      </button>
                      <button onClick={() => removeFromCart(item.name)}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <h3>Total: ${total}</h3>
              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="checkout-btn"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form className="checkout-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <textarea
                    name="address"
                    placeholder="Your Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">Place Order</button>
                </form>
              )}
              <Checkout cartItems={items} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
