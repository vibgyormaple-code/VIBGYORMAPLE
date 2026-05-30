const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Route to save order after Stripe payment
router.post("/save-order", async (req, res) => {
  const { customerName, email, amount, items, paymentIntentId } = req.body;
  try {
    const newOrder = new Order({
      customerName,
      email,
      amount,
      items,
      paymentIntentId,
      status: "paid",
    });
    await newOrder.save();
    res.status(200).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Get all orders (for testing)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
