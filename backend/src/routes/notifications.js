const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateNotification, validateNotificationPreferences } = require('../middleware/validation');

router.get('/', authMiddleware, notificationController.getNotifications);
router.get('/:id', authMiddleware, notificationController.getNotification);
router.post('/', authMiddleware, roleCheck('provider'), validateNotification, notificationController.createNotification);
router.put('/:id/read', authMiddleware, notificationController.markAsRead);
router.put('/mark-all-read', authMiddleware, notificationController.markAllRead);
router.delete('/:id', authMiddleware, notificationController.deleteNotification);
router.post('/preferences', authMiddleware, validateNotificationPreferences, notificationController.updateNotificationPreferences);

module.exports = router;