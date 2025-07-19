const { body, validationResult } = require('express-validator');

// Common handler to send back validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: 'Validation error',
      statusCode: 422,
      timestamp: new Date().toISOString(),
      details: errors.array()
    });
  }
  next();
};

// ------------------------
// AUTH & USER VALIDATIONS
// ------------------------

const validateRegister = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  handleValidation
];

const validateLogin = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation
];

const validateForgotPassword = [
  body('email').isEmail().withMessage('Email is invalid'),
  handleValidation
];

const validateResetPassword = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  handleValidation
];

const validateUpdateProfile = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Email is invalid'),
  body('phone').optional().isMobilePhone().withMessage('Phone number is invalid'),
  body('bio').optional().isLength({ max: 300 }).withMessage('Bio must be under 300 characters'),
  handleValidation
];

// ------------------------
// EVENT & PROVIDER VALIDATIONS
// ------------------------

const validateEvent = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('startDate').isISO8601().toDate().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().toDate().withMessage('End date must be a valid date'),
  body('location').notEmpty().withMessage('Location is required'),
  body('maxParticipants').optional().isInt({ min: 1 }).withMessage('Max participants must be a positive number'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  handleValidation
];

const validateProvider = [
  body('name').notEmpty().withMessage('Provider name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty'),
  body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
  handleValidation
];

// ------------------------
// CONTACT VALIDATIONS
// ------------------------

const validateContact = [
  body('providerId').notEmpty().withMessage('Provider ID is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
  handleValidation
];

const validateContactStatus = [
  body('status').isIn(['pending', 'replied', 'resolved']).withMessage('Invalid status'),
  handleValidation
];

const validateContactReply = [
  body('message').notEmpty().withMessage('Reply message is required'),
  handleValidation
];

// ------------------------
// ✅ NEW: NOTIFICATION VALIDATIONS
// ------------------------

const validateNotification = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('message').notEmpty().withMessage('Message is required'),
  body('type').optional().isIn(['general', 'reminder', 'alert']).withMessage('Invalid notification type'),
  body('relatedId').optional().isString().withMessage('Related ID must be a string'),
  handleValidation
];

const validateNotificationPreferences = [
  body('emailNotifications').optional().isBoolean().withMessage('Email notifications must be true or false'),
  body('pushNotifications').optional().isBoolean().withMessage('Push notifications must be true or false'),
  body('eventReminders').optional().isBoolean().withMessage('Event reminders must be true or false'),
  handleValidation
];

// ------------------------
// EXPORTS
// ------------------------

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateUpdateProfile,
  validateEvent,
  validateProvider,
  validateContact,
  validateContactStatus,
  validateContactReply,
  validateNotification,              // ✅ ADD THIS
  validateNotificationPreferences    // ✅ ADD THIS
};
