const Contact = require('../models/Contact');
const emailService = require('../services/emailService');

exports.createContact = async (req, res, next) => {
  try {
    const { providerId, subject, message } = req.body;
    const contact = new Contact({
      student: req.user.userId,
      provider: providerId,
      subject,
      message
    });

    await contact.save();
    await emailService.sendContactEmail(providerId, req.user.userId, message, subject);

    res.status(201).json({ message: 'Contact message sent', contact, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const query = req.user.role === 'provider'
      ? { provider: req.user.userId }
      : { student: req.user.userId };
    const contacts = await Contact.find(query)
      .populate('student', 'name email')
      .populate('provider', 'name')
      .sort({ createdAt: -1 });

    res.json({ contacts, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('student', 'name email')
      .populate('provider', 'name');
    if (!contact) {
      return res.status(404).json({ error: true, message: 'Contact not found', statusCode: 404, timestamp: new Date().toISOString() });
    }
    if (contact.student.toString() !== req.user.userId && contact.provider.toString() !== req.user.userId) {
      return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
    }
    res.json({ contact, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: true, message: 'Contact not found', statusCode: 404, timestamp: new Date().toISOString() });
    }
    if (contact.provider.toString() !== req.user.userId) {
      return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
    }

    contact.status = status;
    await contact.save();
    res.json({ message: 'Contact status updated', contact, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.replyToContact = async (req, res, next) => {
  try {
    const { message } = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: true, message: 'Contact not found', statusCode: 404, timestamp: new Date().toISOString() });
    }
    if (contact.provider.toString() !== req.user.userId) {
      return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
    }

    contact.replies.push({ message, sender: req.user.userId });
    contact.status = 'replied';
    await contact.save();

    await emailService.sendContactReply(contact.student, message);
    res.json({ message: 'Reply sent successfully', contact, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: true, message: 'Contact not found', statusCode: 404, timestamp: new Date().toISOString() });
    }
    if (contact.student.toString() !== req.user.userId && contact.provider.toString() !== req.user.userId) {
      return res.status(403).json({ error: true, message: 'Unauthorized', statusCode: 403, timestamp: new Date().toISOString() });
    }

    await contact.remove();
    res.json({ message: 'Contact deleted successfully', timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
};