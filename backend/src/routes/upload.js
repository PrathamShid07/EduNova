const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { upload } = require('../middleware/fileUpload');
const { uploadEventImage, uploadProviderLogo, uploadAvatar } = require('../services/uploadService');

router.post('/event-image', authMiddleware, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: true, message: 'No image provided', statusCode: 400, timestamp: new Date().toISOString() });
        }
        const imageUrl = await uploadEventImage(req.file);
        res.json({ imageUrl, message: 'Event image uploaded successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
});

router.post('/provider-logo', authMiddleware, upload.single('logo'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: true, message: 'No logo provided', statusCode: 400, timestamp: new Date().toISOString() });
        }
        const logoUrl = await uploadProviderLogo(req.file);
        res.json({ logoUrl, message: 'Provider logo uploaded successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
});

router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: true, message: 'No avatar provided', statusCode: 400, timestamp: new Date().toISOString() });
        }
        const avatarUrl = await uploadAvatar(req.file);
        res.json({ avatarUrl, message: 'Avatar uploaded successfully', timestamp: new Date().toISOString() });
    } catch (error) {
        next(error);
    }
});

module.exports = router;