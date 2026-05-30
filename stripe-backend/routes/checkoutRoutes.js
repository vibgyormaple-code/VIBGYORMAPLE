const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create checkout session endpoint
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required' });
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || 'Product',
          description: item.description || '',
          images: item.images || [],
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
      automatic_tax: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get checkout session status
router.get('/session-status/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    
    res.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
</create_file>
