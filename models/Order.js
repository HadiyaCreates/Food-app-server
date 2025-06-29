// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: String,
  items: Array, // each item: { name, price, quantity, image }
  total: Number,
  paymentMethod: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
