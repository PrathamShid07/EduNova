const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const User = require('../models/User');
const Event = require('../models/Event');
const Contact = require('../models/Contact');

// Middleware: Only admin access
const adminOnly = [authMiddleware, roleCheck('admin')];

/**
 * @route   GET /admin/users
 * @desc    Get all users
 * @access  Admin
 */
router.get('/users', adminOnly, async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /admin/events
 * @desc    Get all events
 * @access  Admin
 */
router.get('/events', adminOnly, async (req, res, next) => {
  try {
    const events = await Event.find().populate('provider', 'name');
    res.json({ events, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /admin/contacts
 * @desc    Get all contact messages
 * @access  Admin
 */
router.get('/contacts', adminOnly, async (req, res, next) => {
  try {
    const contacts = await Contact.find().populate('provider student', 'name email');
    res.json({ contacts, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   DELETE /admin/users/:id
 * @desc    Delete a user
 * @access  Admin
 */
router.delete('/users/:id', adminOnly, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully', timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
