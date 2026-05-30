import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key should be set in environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "pk_test_your_public_key_here");

export default function PaymentButton() {
  const handleClick = async () => {
    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const { id } = await res.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return <button onClick={handleClick}>Pay $50</button>;
}
