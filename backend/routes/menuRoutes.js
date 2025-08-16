const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  const menu = await MenuItem.find();
  res.json(menu);
});

// Create menu item (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  const { name, description, price, availability } = req.body;
  const item = new MenuItem({ name, description, price, availability });
  await item.save();
  res.status(201).json(item);
});

// Update menu item (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete menu item (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Menu item deleted' });
});

module.exports = router;
