const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');

// Validation middleware
const orderValidation = [
  body('customerDetails.name').notEmpty().withMessage('Customer name is required'),
  body('customerDetails.email').isEmail().withMessage('Valid email is required'),
  body('customerDetails.phone').matches(/^[+]?[0-9]{10,15}$/).withMessage('Valid phone number is required'),
  body('customerDetails.address.street').notEmpty().withMessage('Street address is required'),
  body('customerDetails.address.city').notEmpty().withMessage('City is required'),
  body('customerDetails.address.state').notEmpty().withMessage('State is required'),
  body('customerDetails.address.zipCode').notEmpty().withMessage('ZIP code is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productId').notEmpty().withMessage('Product ID is required'),
  body('items.*.productName').notEmpty().withMessage('Product name is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('items.*.total').isFloat({ min: 0 }).withMessage('Total must be a positive number')
];

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', orderValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
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

// @route   GET /api/orders
// @desc    Get all orders with pagination and filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Filter by status
    if (req.query.status) {
      query.orderStatus = req.query.status;
    }
    
    // Filter by email
    if (req.query.email) {
      query['customerDetails.email'] = new RegExp(req.query.email, 'i');
    }
    
    // Filter by order number
    if (req.query.orderNumber) {
      query.orderNumber = new RegExp(req.query.orderNumber, 'i');
    }
    
    // Date range filter
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { orderStatus, notes } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        orderStatus,
        notes,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message
    });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Delete an order
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: error.message
    });
  }
});

// @route   GET /api/orders/stats/summary
// @desc    Get order statistics
// @access  Public
router.get('/stats/summary', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const confirmedOrders = await Order.countDocuments({ orderStatus: 'confirmed' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    
    const totalRevenue = await Order.aggregate([
      { $match: { orderStatus: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$orderSummary.total' } } }
    ]);

    const todayOrders = await Order.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      }
    });

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        todayOrders
      }
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order statistics',
      error: error.message
    });
  }
});

module.exports = router;
