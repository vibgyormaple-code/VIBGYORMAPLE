// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Order = require("./models/orderModel");
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Order Form Backend Server is running!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Stripe checkout routes
app.use("/", checkoutRoutes);

// Form submission endpoint - saves order data without Stripe
app.post("/submit-order", async (req, res) => {
  const { customerName, email, amount, items } = req.body;

  if (!customerName || !email || !items || !Array.isArray(items)) {
    return res.status(400).json({ 
      error: "Missing required fields: customerName, email, and items array are required" 
    });
  }

  try {
    const newOrder = new Order({
      customerName,
      email,
      amount: amount || 0,
      items,
      status: "pending",
    });

    await newOrder.save();
    
    res.status(200).json({ 
      message: "Order submitted successfully",
      orderId: newOrder._id 
    });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
});
