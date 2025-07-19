const Provider = require('../models/Provider');
const Event = require('../models/Event');
const { uploadProviderLogo } = require('../services/uploadService');

exports.createProviderProfile = async (req, res, next) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ error: true, message: 'Only providers can create profiles', statusCode: 403, timestamp: new Date().toISOString() });
    }

    const { name, description, website, address, socialLinks } = req.body;
    const provider = new Provider({
      user: req.user.userId,
      name,
      description,
      website,
      address,
      socialLinks,
      logo: req.file ? await uploadProviderLogo(req.file) : undefined
    });

    await provider.save();
    res.status(201).json({ message: 'Provider profile created', provider, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.getProviders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const providers = await Provider.find(query)
      .populate('user', 'name email')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Provider.countDocuments(query);

    res.json({
      providers,
      pagination: { page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) },
      total,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getProviderProfile = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id).populate('user', 'name email');
    if (!provider) {
      return res.status(404).json({ error: true, message: 'Provider not found', statusCode: 404, timestamp: new Date().toISOString() });
    }
    const events = await Event.find({ provider: provider.user });
    res.json({ provider, events, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.updateProviderProfile = async (req, res, next) => {
  try {
    const provider = await Provider.findOne({ user: req.user.userId });
    if (!provider) {
      return res.status(404).json({ error: true, message: 'Provider not found', statusCode: 404, timestamp: new Date().toISOString() });
    }

    const { name, description, website, address, socialLinks } = req.body;
    Object.assign(provider, { name, description, website, address, socialLinks });
    if (req.file) provider.logo = await uploadProviderLogo(req.file);

    await provider.save();
    res.json({ message: 'Provider profile updated', provider, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.deleteProviderProfile = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ error: true, message: 'Provider not found', statusCode: 404, timestamp: new Date().toISOString() });
    }
    if (provider.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
    }

    await provider.remove();
    res.json({ message: 'Provider profile deleted', timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.getProviderEvents = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { provider: req.params.id };
    if (status) query.status = status;

    const events = await Event.find(query);
    res.json({ events, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.getProviderStats = async (req, res, next) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ error: true, message: 'Only providers can view stats', statusCode: 403, timestamp: new Date().toISOString() });
    }
    const provider = await Provider.findOne({ user: req.user.userId });
    if (!provider) {
      return res.status(404).json({ error: true, message: 'Provider not found', statusCode: 404, timestamp: new Date().toISOString() });
    }

    const events = await Event.find({ provider: req.user.userId });
    const totalEvents = events.length;
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
    const completedEvents = events.filter(e => e.status === 'expired').length;
    const totalParticipants = events.reduce((sum, e) => sum + e.participants.length, 0);

    res.json({
      totalEvents,
      totalParticipants,
      upcomingEvents,
      completedEvents,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};