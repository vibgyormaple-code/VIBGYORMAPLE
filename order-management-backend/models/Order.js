const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  customerDetails: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[+]?[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      zipCode: { type: String, required: true, trim: true },
      country: { type: String, default: 'India', trim: true }
    }
  },
  items: [itemSchema],
  orderSummary: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    tax: {
      type: Number,
      default: 0,
      min: 0
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['cash', 'card', 'upi', 'net_banking'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: {
      type: String,
      trim: true
    }
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
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

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  this.updatedAt = Date.now();
  next();
});

// Calculate order totals
orderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.orderSummary.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
    this.orderSummary.tax = this.orderSummary.subtotal * 0.18; // 18% GST
    this.orderSummary.total = this.orderSummary.subtotal + this.orderSummary.tax + this.orderSummary.shipping;
  }
  next();
});

// Virtual for formatted created date
orderSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtual fields are serialized
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);
