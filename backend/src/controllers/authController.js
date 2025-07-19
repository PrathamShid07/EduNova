const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/jwt');
const emailService = require('../services/emailService');
const { generateRandomString } = require('../utils/helpers');

exports.register = async (req, res, next) => {
  try {
    const { email, password, name, role, phone, organization } = req.body;
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: true, message: 'Email already exists', statusCode: 409, timestamp: new Date().toISOString() });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: role || 'student',
      phone,
      organization
    });

    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name, email, role, phone, organization },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: true, message: 'Invalid credentials', statusCode: 401, timestamp: new Date().toISOString() });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: true, message: 'Invalid credentials', statusCode: 401, timestamp: new Date().toISOString() });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email, role: user.role, phone: user.phone, organization: user.organization },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // In a stateless JWT system, logout is client-side (discard token)
    res.json({ message: 'Logout successful', timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
    }

    const resetToken = generateRandomString(32);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await emailService.sendPasswordResetEmail(user._id, resetToken);

    res.json({ message: 'Password reset email sent', timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: true, message: 'Invalid or expired token', statusCode: 400, timestamp: new Date().toISOString() });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully', timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
    }
    res.json({
      valid: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, organization: user.organization },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};