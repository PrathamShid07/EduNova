const User = require('../models/User');
const Event = require('../models/Event');

exports.getAllUsers = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: true, message: 'Only admins can access this endpoint', statusCode: 403, timestamp: new Date().toISOString() });
        }

        const users = await User.find().select('-password');
        res.json({ users, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.getAllEvents = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: true, message: 'Only admins can access this endpoint', statusCode: 403, timestamp: new Date().toISOString() });
        }

        const events = await Event.find().populate('provider', 'name');
        res.json({ events, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.updateEventStatus = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: true, message: 'Only admins can access this endpoint', statusCode: 403, timestamp: new Date().toISOString() });
        }

        const { status } = req.body;
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }

        event.status = status;
        await event.save();
        res.json({ message: 'Event status updated', event, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: true, message: 'Only admins can access this endpoint', statusCode: 403, timestamp: new Date().toISOString() });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }

        await user.remove();
        res.json({ message: 'User deleted successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};