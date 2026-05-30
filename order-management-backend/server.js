const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser middleware
app.use(cookieParser());

// Static files
app.use(express.static('public'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/cart', cartRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Order Management Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Order Management Backend API',
    version: '1.0.0',
    endpoints: {
      createOrder: 'POST /api/orders',
      getAllOrders: 'GET /api/orders',
      getOrderById: 'GET /api/orders/:id',
      updateOrder: 'PUT /api/orders/:id',
      deleteOrder: 'DELETE /api/orders/:id',
      orderStats: 'GET /api/orders/stats/summary',
      healthCheck: 'GET /health'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API docs: http://localhost:${PORT}`);
});

module.exports = app;
