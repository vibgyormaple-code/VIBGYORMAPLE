const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Create payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'INR', orderId } = req.body;

    // Verify order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create payment record
    const payment = new Payment({
      orderId,
      amount,
      currency,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

    await payment.save();

    res.json({
      success: true,
      paymentIntent: {
        id: payment._id,
        amount: payment.amount,
        currency: payment.currency,
        transactionId: payment.transactionId
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Process payment
const processPayment = async (req, res) => {
  try {
    const { paymentId, paymentMethod, paymentGatewayResponse } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update payment status
    payment.paymentMethod = paymentMethod;
    payment.paymentGatewayResponse = paymentGatewayResponse;
    payment.status = paymentGatewayResponse.status === 'succeeded' ? 'completed' : 'failed';
    payment.updatedAt = Date.now();

    await payment.save();

    // Update order status if payment successful
    if (payment.status === 'completed') {
      await Order.findByIdAndUpdate(payment.orderId, {
        orderStatus: 'confirmed',
        updatedAt: Date.now()
      });
    }

    res.json({
      success: true,
      payment,
      message: payment.status === 'completed' ? 'Payment processed successfully' : 'Payment failed'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment details
const getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('orderId', 'orderNumber customerDetails orderStatus');
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments for an order
const getPaymentsByOrder = async (req, res) => {
  try {
    const payments = await Payment.find({ orderId: req.params.orderId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
      count: payments.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  processPayment,
  getPaymentDetails,
  getPaymentsByOrder
};
</create_file>

<create_file>
<path>order-management-backend/routes/paymentRoutes.js</path>
<content>
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Payment routes
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/process-payment', paymentController.processPayment);
router.get('/payment/:id', paymentController.getPaymentDetails);
router.get('/order/:orderId/payments', paymentController.getPaymentsByOrder);

module.exports = router;
</create_file>

<create_file>
<path>order-management-backend/package.json</path>
<content>
{
  "name": "order-management-backend",
  "version": "1.0.0",
  "description": "Complete order management backend with MongoDB Atlas integration",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["order", "management", "mongodb", "express", "backend"],
  "author": "Your Name",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "stripe": "^12.0.0",
    "razorpay": "^2.8.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
</create_file>

<create_file>
<path>order-management-backend/.env</path>
<content>
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/order-management?retryWrites=true&w=majority

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Payment Gateway Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
</create_file>

<create_file>
<path>order-management-backend/README.md</path>
<content>
# Order Management Backend with Payment<edit_file>
<path>order-management-backend/models/Payment.js</path>
<content>
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'razorpay', 'cash'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    required: true
  },
  paymentGatewayResponse: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
