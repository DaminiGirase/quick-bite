const express = require('express');
const Order = require('../models/Order');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Create order (student)
router.post('/', protect, async (req, res) => {
  const { items, totalCost } = req.body;
  const order = new Order({ user: req.user.id, items, totalCost });
  await order.save();
  res.status(201).json(order);
});

// Get user's orders
router.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.menuItem');
  res.json(orders);
});

// Get all orders (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.menuItem');
  res.json(orders);
});

// Update order status (admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

module.exports = router;
