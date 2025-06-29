// models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  oldPrice: Number,
  discount: Number,
  image: String,
  category: String,
});

module.exports = mongoose.model('Food', foodSchema);
