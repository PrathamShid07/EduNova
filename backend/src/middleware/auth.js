// 📁 src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized: No token provided',
      statusCode: 401,
      timestamp: new Date().toISOString()
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to the request
    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: 'Forbidden: Invalid or expired token',
      statusCode: 403,
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = auth;
