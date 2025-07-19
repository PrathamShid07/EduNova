const Event = require('../models/Event');

exports.cleanupExpiredEvents = async () => {
  try {
    const now = new Date();
    const deleted = await Event.deleteMany({ endDate: { $lt: now }, status: { $ne: 'expired' } });
    await Event.updateMany({ endDate: { $lt: now } }, { status: 'expired' });
    console.log(`Cleaned up ${deleted.deletedCount} expired events`);
    return deleted.deletedCount;
  } catch (error) {
    console.error('Error cleaning up expired events:', error);
    throw error;
  }
};