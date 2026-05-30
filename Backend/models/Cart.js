const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  image: {
    type: String,
    default: ''
  }
});

const cartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
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

// Update the updatedAt field before saving
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  // Calculate total
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);