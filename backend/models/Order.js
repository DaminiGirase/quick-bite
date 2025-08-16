const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  totalCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Ready for Pickup', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
