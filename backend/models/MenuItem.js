const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the food name']
  },
  description: String,
  price: {
    type: Number,
    required: [true, 'Please enter the price']
  },
  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
