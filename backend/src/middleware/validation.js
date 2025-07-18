const { body, query, validationResult } = require('express-validator');

const validateRegister = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('role').isIn(['student', 'provider', 'admin']).withMessage('Invalid role'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('organization').optional().notEmpty().withMessage('Organization cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateForgotPassword = [
    body('email').isEmail().withMessage('Invalid email'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateResetPassword = [
    body('token').notEmpty().withMessage('Token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateUpdateProfile = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('bio').optional().notEmpty().withMessage('Bio cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateEvent = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').isIn(['webinar', 'course', 'training']).withMessage('Invalid category'),
    body('startDate').isISO8601().withMessage('Invalid start date format'),
    body('endDate').optional().isISO8601().withMessage('Invalid end date format'),
    body('location').notEmpty().withMessage('Location is required'),
    body('maxParticipants').optional().isInt({ min: 1 }).withMessage('Max participants must be a positive integer'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateProvider = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('website').optional().isURL().withMessage('Invalid website URL'),
    body('address').optional().notEmpty().withMessage('Address cannot be empty'),
    body('socialLinks').optional().isArray().withMessage('Social links must be an array'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateContact = [
    body('providerId').isMongoId().withMessage('Invalid provider ID'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateContactStatus = [
    body('status').isIn(['pending', 'replied', 'resolved']).withMessage('Invalid status'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateContactReply = [
    body('message').notEmpty().withMessage('Reply message is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateNotification = [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('message').notEmpty().withMessage('Message is required'),
    body('type').isIn(['general', 'event', 'contact']).withMessage('Invalid notification type'),
    body('relatedId').optional().isMongoId().withMessage('Invalid related ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateNotificationPreferences = [
    body('emailNotifications').isBoolean().withMessage('Email notifications must be a boolean'),
    body('pushNotifications').isBoolean().withMessage('Push notifications must be a boolean'),
    body('eventReminders').isBoolean().withMessage('Event reminders must be a boolean'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

const validateEventStatus = [
    body('status').isIn(['upcoming', 'ongoing', 'expired']).withMessage('Invalid event status'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: true, message: 'Validation failed', errors: errors.array(), statusCode: 422, timestamp: new Date().toISOString() });
        }
        next();
    }
];

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
    validateNotification,
    validateNotificationPreferences,
    validateEventStatus
};