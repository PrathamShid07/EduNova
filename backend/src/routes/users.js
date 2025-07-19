const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/fileUpload');
const { validateUpdateProfile } = require('../middleware/validation');

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, upload.single('avatar'), validateUpdateProfile, userController.updateProfile);
router.delete('/profile', authMiddleware, userController.deleteProfile);
router.get('/favorites', authMiddleware, userController.getFavorites);
router.post('/favorites/:eventId', authMiddleware, userController.addFavorite);
router.delete('/favorites/:eventId', authMiddleware, userController.removeFavorite);

module.exports = router;