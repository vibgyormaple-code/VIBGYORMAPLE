const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart by session ID
router.get('/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });

    if (!cart) {
      return res.json({
        success: true,
        data: { items: [], totalItems: 0, totalPrice: 0 }
      });
    }

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
});

// Add item to cart
router.post('/:sessionId/add', async (req, res) => {
  try {
    const { productId, productName, quantity, price, image } = req.body;

    if (!productId || !productName || !quantity || !price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: productId, productName, quantity, price'
      });
    }

    let cart = await Cart.findOne({ sessionId: req.params.sessionId });

    if (!cart) {
      cart = new Cart({ sessionId: req.params.sessionId, items: [] });
    }

    // Check if item already exists
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        productName,
        quantity,
        price,
        image
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
});

// Update item quantity in cart
router.put('/:sessionId/update/:productId', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity cannot be negative'
      });
    }

    const cart = await Cart.findOne({ sessionId: req.params.sessionId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(item => item.productId === req.params.productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
});

// Remove item from cart
router.delete('/:sessionId/remove/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    await cart.save();

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
});

// Clear cart
router.delete('/:sessionId/clear', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ sessionId: req.params.sessionId });

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
});

module.exports = router;
