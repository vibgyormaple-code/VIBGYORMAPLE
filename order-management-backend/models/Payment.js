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
</create_file>

<create_file>
<path>order-management-backend/routes/paymentRoutes.js</path>
<content>
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const { body, validationResult } = require('express-validator');

// Create payment intent
router.post('/create-payment-intent', [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').optional().isString(),
  body('orderId').isMongoId().withMessage('Valid order ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
});

// Process payment
router.post('/process-payment', [
  body('paymentId').isMongoId().withMessage('Valid payment ID required'),
  body('paymentMethod').isIn(['stripe', 'razorpay']).withMessage('Valid payment method required'),
  body('paymentGatewayResponse').isObject().withMessage('Payment gateway response required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentId, paymentMethod, paymentGatewayResponse } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update payment status based on gateway response
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
});

// Get payment details
router.get('/payment/:id', async (req, res) => {
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
});

// Get all payments for an order
router.get('/order/:orderId/payments', async (req, res) => {
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
});

module.exports = router;
</create_file>

<create_file>
<path>order-management-backend/controllers/paymentController.js</path>
<content>
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
      message: payment.status === 'completed' ? 'Payment processed successfully' : 'I have reviewed the Order model, which already includes a paymentDetails field with method, status, and transactionId. Next, I will check the orderRoutes.js to see how orders are created and fetched, and then plan to add payment gateway integration and frontend form for payment data collection.

<read_file>
<path>order-management-backend/routes/orderRoutes.js</path>
</read_file>
