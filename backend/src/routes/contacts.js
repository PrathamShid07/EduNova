const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');
const { validateContact, validateContactStatus, validateContactReply } = require('../middleware/validation');

router.get('/', authMiddleware, contactController.getContacts);
router.post('/', authMiddleware, validateContact, contactController.createContact);
router.get('/:id', authMiddleware, contactController.getContact);
router.put('/:id', authMiddleware, validateContactStatus, contactController.updateContactStatus);
router.post('/:id/reply', authMiddleware, validateContactReply, contactController.replyToContact);
router.delete('/:id', authMiddleware, contactController.deleteContact);

module.exports = router;