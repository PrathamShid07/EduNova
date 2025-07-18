const cron = require('node-cron');
const { cleanupExpiredEvents } = require('../jobs/expiredEventsCleanup');
const { scheduleEventReminders } = require('../jobs/notificationScheduler');

exports.startCronJobs = () => {
    // Run daily at midnight to clean up expired events
    cron.schedule('0 0 * * *', async () => {
        try {
            await cleanupExpiredEvents();
        } catch (error) {
            console.error('Error in expired events cleanup cron:', error);
        }
    });

    // Run daily at 8 AM to schedule event reminders
    cron.schedule('0 8 * * *', async () => {
        try {
            await scheduleEventReminders();
        } catch (error) {
            console.error('Error in event reminders cron:', error);
        }
    });
};