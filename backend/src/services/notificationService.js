const webpush = require('web-push');
const { WEBPUSH_CONFIG } = require('../config/env');

webpush.setVapidDetails(
  'mailto:no-reply@courseprovider.com',
  WEBPUSH_CONFIG.publicKey,
  WEBPUSH_CONFIG.privateKey
);

exports.sendPushNotification = async (userId, message) => {
  try {
    const user = await require('../models/User').findById(userId);
    if (!user.pushSubscription || !user.notificationPreferences.pushNotifications) {
      return;
    }

    const payload = JSON.stringify({
      title: 'Course Provider Notification',
      body: message,
      icon: '/icon.png'
    });

    await webpush.sendNotification(user.pushSubscription, payload);
  } catch (error) {
    throw new Error('Failed to send push notification');
  }
};