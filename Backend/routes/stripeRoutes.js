const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerDetails } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productName || item.name,
          description: item.description || '',
        },
        unit_amount: Math.round((item.price || 0) * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cancel`,
      metadata: {
        cart: JSON.stringify(items),
        customerDetails: JSON.stringify(customerDetails || {})
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN'],
      },
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

// Get checkout session status
router.get('/session-status/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    res.json({
      success: true,
      status: session.status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      payment_status: session.payment_status
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve session',
      error: error.message
    });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const cart = JSON.parse(session.metadata.cart || '[]');
    const customerDetails = JSON.parse(session.metadata.customerDetails || '{}');

    // Create order in database
    try {
      const order = new Order({
        customerDetails: {
          name: customerDetails.name || session.customer_details?.name || 'Customer',
          email: customerDetails.email || session.customer_details?.email || '',
          phone: customerDetails.phone || '',
          address: {
            street: customerDetails.address?.street || '',
            city: customerDetails.address?.city || '',
            state: customerDetails.address?.state || '',
            zipCode: customerDetails.address?.zipCode || '',
            country: customerDetails.address?.country || 'US'
          }
        },
        items: cart.map(item => ({
          productId: item.productId || item.id || '',
          productName: item.productName || item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        orderSummary: {
          subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          tax: 0, // Calculate tax as needed
          shipping: 0, // Calculate shipping as needed
          total: session.amount_total / 100
        },
        paymentDetails: {
          method: 'card',
          status: 'completed',
          transactionId: session.payment_intent
        },
        orderStatus: 'confirmed'
      });

      await order.save();
      console.log('Order saved successfully:', order.orderNumber);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  res.json({ received: true });
});

module.exports = router;

