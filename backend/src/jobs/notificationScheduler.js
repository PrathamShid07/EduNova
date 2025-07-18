const Event = require('../models/Event');
const Notification = require('../models/Notification');
const emailService = require('../services/emailService');
const notificationService = require('../services/notificationService');

exports.scheduleEventReminders = async () => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
        const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

        const events = await Event.find({
            startDate: { $gte: startOfDay, $lte: endOfDay },
            status: 'upcoming'
        }).populate('provider');

        for (const event of events) {
            const users = await require('../models/User').find({
                role: 'student',
                notificationPreferences: { eventReminders: true }
            });
            for (const user of users) {
                if (event.participants.includes(user._id)) {
                    const notification = new Notification({
                        user: user._id,
                        message: `Reminder: ${event.title} is happening tomorrow at ${new Date(event.startDate).toLocaleString()}`,
                        type: 'event',
                        relatedId: event._id
                    });
                    await notification.save();
                    await notificationService.sendPushNotification(user._id, notification.message);
                    await emailService.sendEventReminder(user._id, event);
                }
            }
        }
        console.log(`Scheduled reminders for ${events.length} events`);
        return events.length;
    } catch (error) {
        console.error('Error scheduling event reminders:', error);
        throw error;
    }
};