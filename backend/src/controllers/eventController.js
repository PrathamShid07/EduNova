const Event = require('../models/Event');
const { uploadEventImage } = require('../services/uploadService');

exports.createEvent = async (req, res, next) => {
    try {
        if (req.user.role !== 'provider') {
            return res.status(403).json({ error: true, message: 'Only providers can create events', statusCode: 403, timestamp: new Date().toISOString() });
        }

        const { title, description, category, startDate, endDate, location, maxParticipants, tags } = req.body;
        const event = new Event({
            title,
            description,
            category,
            startDate,
            endDate,
            location,
            maxParticipants,
            tags,
            provider: req.user.userId,
            image: req.file ? await uploadEventImage(req.file) : undefined
        });

        await event.save();
        res.status(201).json({ message: 'Event created successfully', event, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.getEvents = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, category, status, search, startDate, endDate, providerId } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
        if (startDate) query.startDate = { $gte: new Date(startDate) };
        if (endDate) query.endDate = { $lte: new Date(endDate) };
        if (providerId) query.provider = providerId;

        const events = await Event.find(query)
            .populate('provider', 'name')
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Event.countDocuments(query);

        res.json({
            events,
            pagination: { page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) },
            total,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id).populate('provider', 'name');
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        res.json({ event, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (event.provider.toString() !== req.user.userId) {
            return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
        }

        const { title, description, category, startDate, endDate, location, maxParticipants, tags } = req.body;
        Object.assign(event, { title, description, category, startDate, endDate, location, maxParticipants, tags });
        if (req.file) event.image = await uploadEventImage(req.file);

        await event.save();
        res.json({ message: 'Event updated successfully', event, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (event.provider.toString() !== req.user.userId) {
            return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
        }

        await event.remove();
        res.json({ message: 'Event deleted successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.getProviderEvents = async (req, res, next) => {
    try {
        const { status } = req.query;
        const query = { provider: req.params.providerId };
        if (status) query.status = status;

        const events = await Event.find(query).populate('provider', 'name');
        res.json({ events, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.registerForEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (event.participants.includes(req.user.userId)) {
            return res.status(400).json({ error: true, message: 'Already registered', statusCode: 400, timestamp: new Date().toISOString() });
        }
        if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ error: true, message: 'Event is full', statusCode: 400, timestamp: new Date().toISOString() });
        }

        event.participants.push(req.user.userId);
        await event.save();
        res.json({ message: 'Registered for event successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.unregisterFromEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        event.participants = event.participants.filter(id => id.toString() !== req.user.userId);
        await event.save();
        res.json({ message: 'Unregistered from event successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};

exports.getParticipants = async (req, res, next) => {
    try {
        if (req.user.role !== 'provider') {
            return res.status(403).json({ error: true, message: 'Only providers can view participants', statusCode: 403, timestamp: new Date().toISOString() });
        }
        const event = await Event.findById(req.params.id).populate('participants', 'name email');
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found', statusCode: 404, timestamp: new Date().toISOString() });
        }
        if (event.provider.toString() !== req.user.userId) {
            return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
        }
        res.json({ participants: event.participants, timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
};