const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateEventStatus } = require('../middleware/validation');

router.get('/users', authMiddleware, roleCheck('admin'), adminController.getAllUsers);
router.get('/events', authMiddleware, roleCheck('admin'), adminController.getAllEvents);
router.put('/events/:id/status', authMiddleware, roleCheck('admin'), validateEventStatus, adminController.updateEventStatus);
router.delete('/users/:id', authMiddleware, roleCheck('admin'), adminController.deleteUser);

module.exports = router;