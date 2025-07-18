const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { upload } = require('../middleware/fileUpload');
const { validateEvent } = require('../middleware/validation');

router.post('/', authMiddleware, roleCheck('provider'), upload.single('image'), validateEvent, eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.put('/:id', authMiddleware, roleCheck('provider'), upload.single('image'), validateEvent, eventController.updateEvent);
router.delete('/:id', authMiddleware, roleCheck('provider'), eventController.deleteEvent);
router.get('/provider/:providerId', eventController.getProviderEvents);
router.post('/:id/register', authMiddleware, eventController.registerForEvent);
router.delete('/:id/register', authMiddleware, eventController.unregisterFromEvent);
router.get('/:id/participants', authMiddleware, roleCheck('provider'), eventController.getParticipants);

module.exports = router;