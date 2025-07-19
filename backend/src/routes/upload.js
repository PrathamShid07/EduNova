const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_CONFIG } = require('../config/env');
const authMiddleware = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config(CLOUDINARY_CONFIG);

// Set up Multer storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'docx'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({
      error: true,
      message: 'No file uploaded',
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    url: req.file.path,
    public_id: req.file.filename,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
