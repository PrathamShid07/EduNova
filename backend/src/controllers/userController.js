const User = require('../models/User');
const { uploadAvatar } = require('../services/uploadService');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        res.json({ user, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email, phone, bio } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.bio = bio || user.bio;

        if (req.file) {
            user.avatar = await uploadAvatar(req.file);
        }

        await user.save();
        res.json({ message: 'Profile updated successfully', user, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.deleteProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        await user.remove();
        res.json({ message: 'User account deleted successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.getFavorites = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        res.json({ events: user.favorites, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        const event = await require('../models/Event').findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (!user.favorites.includes(event._id)) {
            user.favorites.push(event._id);
            await user.save();
        }
        res.json({ message: 'Event added to favorites', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.removeFavorite = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        user.favorites = user.favorites.filter(id => id.toString() !== req.params.eventId);
        await user.save();
        res.json({ message: 'Event removed from favorites', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};