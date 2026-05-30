import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const orderData = {
        ...formData,
        items: cartItems,
        amount: totalAmount,
      };

      const response = await axios.post(
        "http://localhost:4242/submit-order",
        orderData
      );

      setSuccess(true);
      console.log("Order submitted:", response.data);

      // Clear form
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="order-success">
        <h2>Order Submitted Successfully!</h2>
        <p>Thank you for your order. We will contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="order-form">
      <h2>Order Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter delivery address"
            rows="3"
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>
              Total: $
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </strong>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Submitting..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
