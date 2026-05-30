// src/components/Checkout.jsx
import React from "react";
import axios from "axios";

const Checkout = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      // Call backend to create a Checkout Session
const response = await axios.post(
  `${process.env.REACT_APP_API_BASE_URL}/api/stripe/create-checkout-session`,
  {
    items: cartItems,
    customerDetails: {
      name: "Customer Name", // You can get this from a form
      email: "customer@example.com",
      phone: "+1234567890",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        country: "US"
      }
    }
  }
);

      // Redirect to Stripe Checkout URL returned by backend
      if (response.data.success && response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error creating checkout session. Please try again.");
    }
  };

  return (
    <button onClick={handleCheckout} className="checkout-btn">
      Place Order & Pay with Stripe
    </button>
  );
};

export default Checkout;
