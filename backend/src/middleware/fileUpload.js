const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_CONFIG } = require('../config/cloudinary');

cloudinary.config(CLOUDINARY_CONFIG);

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only JPEG and PNG images are allowed'));
    }
});

module.exports = {
    upload,
    uploadToCloudinary: async (file) => {
        try {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'course-provider', resource_type: 'image' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            });
            return result.secure_url;
        } catch (error) {
            throw new Error('Failed to upload image to Cloudinary');
        }
    }
};