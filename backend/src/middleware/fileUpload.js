const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_CONFIG } = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config(CLOUDINARY_CONFIG);

// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads',
      format: file.mimetype.split('/')[1],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

const upload = multer({ storage });

// ✅ Export as an object for destructuring
module.exports =  upload ;
