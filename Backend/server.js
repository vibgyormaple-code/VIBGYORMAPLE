const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Stripe secret key (you can add your own key here)
// For testing, we'll use a placeholder and handle the error gracefully
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_your_stripe_secret_key_here";
const stripe = STRIPE_SECRET_KEY.startsWith("sk_test_") && STRIPE_SECRET_KEY !== "sk_test_your_stripe_secret_key_here" 
  ? Stripe(STRIPE_SECRET_KEY) 
  : null;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://grasshawk.dxdbpyi.mongodb.net/grasshawk";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import models
const User = require('./models/User');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// API Routes
// Get cart by session ID
app.get('/api/cart/:sessionId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    
    if (!cart) {
      cart = new Cart({
        sessionId: req.params.sessionId,
        items: [],
        total: 0
      });
      await cart.save();
    }
    
    res.json({
      items: cart.items,
      total: cart.total
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
app.post('/api/cart/:sessionId/add', async (req, res) => {
  try {
    const { productId, name, quantity, price, image } = req.body;
    
    if (!productId || !name || !quantity || !price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    
    if (!cart) {
      cart = new Cart({
        sessionId: req.params.sessionId,
        items: [],
        total: 0
      });
    }

    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, quantity, price, image });
    }

    await cart.save();

    res.json({ 
      message: "Item added to cart",
      cart: {
        items: cart.items,
        total: cart.total
      }
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Create order
app.post('/api/orders/create', async (req, res) => {
  try {
    const { sessionId, items, customerDetails, pricing, payment } = req.body;

    if (!sessionId || !items || !customerDetails || !pricing) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order data'
      });
    }

    // Create new order
    const order = new Order({
      sessionId,
      items,
      customerDetails,
      pricing,
      payment: payment || { paymentMethod: 'cod', paymentStatus: 'pending' },
      status: 'pending'
    });

    await order.save();

    // Clear the cart after order is created
    await Cart.findOneAndDelete({ sessionId });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        orderNumber: order.orderNumber,
        total: order.pricing.total,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Create Stripe checkout session
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    // Check if Stripe is properly configured
    if (!stripe) {
      return res.status(400).json({
        success: false,
        message: 'Stripe is not configured. Please add a valid Stripe secret key to the environment variables.',
        error: 'STRIPE_SECRET_KEY not set or invalid'
      });
    }

    // Get cart items from database
    const cart = await Cart.findOne({ sessionId });
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const lineItems = cart.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || '',
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: {
        cart: JSON.stringify(cart.items),
        sessionId: sessionId
      }
    });

    res.json({
      success: true,
      url: session.url,
      sessionId: session.id
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout session',
      error: error.message
    });
  }
});

// Authentication Routes
// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password // In production, hash this password
    });

    await newUser.save();

    // Generate a simple token (in production, use JWT)
    const token = `token_${newUser._id}_${Date.now()}`;

    res.status(201).json({
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate a simple token (in production, use JWT)
    const token = `token_${user._id}_${Date.now()}`;

    res.json({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    const userId = parseInt(token.split('_')[1]);
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Logout user
app.post('/api/auth/logout', (req, res) => {
  res.json({
    message: 'Logged out successfully'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend is running'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to VIBGYOR Maple Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/*',
      cart: '/api/cart/*',
      stripe: '/api/stripe/*',
      health: '/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API docs: http://localhost:${PORT}`);
});