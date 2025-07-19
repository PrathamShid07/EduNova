const { ROLES } = require('../utils/constants');

// Middleware to check if user has the required role
const roleCheck = (requiredRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !requiredRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: true,
        message: 'Forbidden: You do not have permission to perform this action',
        statusCode: 403,
        timestamp: new Date().toISOString()
      });
    }
    next();
  };
};

module.exports = roleCheck;
