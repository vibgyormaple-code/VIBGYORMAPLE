const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  amount: Number,
  items: Array,
  paymentIntentId: String,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
