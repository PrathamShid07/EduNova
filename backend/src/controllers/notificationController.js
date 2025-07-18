const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');

exports.createNotification = async (req, res, next) => {
    try {
        if (req.user.role !== 'provider') {
            return res.status(403).json({ error: true, message: 'Only providers can create notifications', statusCode: 403, timestamp: new Date().toISOString() });
        }

        const { userId, message, type, relatedId } = req.body;
        const notification = new Notification({
            user: userId,
            message,
            type: type || 'general',
            relatedId
        });

        await notification.save();
        await notificationService.sendPushNotification(userId, message);

        res.status(201).json({ message: 'Notification created', notification, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.getNotifications = async (req, res, next) => {
    try {
        const { read } = req.query;
        const query = { user: req.user.userId };
        if (read) query.isRead = read === 'true';

        const notifications = await Notification.find(query).sort({ createdAt: -1 });
        res.json({ notifications, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.getNotification = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: true, message: 'Notification not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (notification.user.toString() !== req.user.userId) {
            return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
        }
        res.json({ notification, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: true, message: 'Notification not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (notification.user.toString() !== req.user.userId) {
            return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
        }

        notification.isRead = true;
        await notification.save();
        res.json({ message: 'Notification marked as read', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.markAllRead = async (req, res, next) => {
    try {
        await Notification.updateMany(
            { user: req.user.userId, isRead: false },
            { isRead: true }
        );
        res.json({ message: 'All notifications marked as read', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.deleteNotification = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: true, message: 'Notification not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (notification.user.toString() !== req.user.userId) {
            return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
        }

        await notification.remove();
        res.json({ message: 'Notification deleted successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.updateNotificationPreferences = async (req, res, next) => {
    try {
        const { emailNotifications, pushNotifications, eventReminders } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }

        user.notificationPreferences = { emailNotifications, pushNotifications, eventReminders };
        await user.save();
        res.json({ message: 'Notification preferences updated', preferences: user.notificationPreferences, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};