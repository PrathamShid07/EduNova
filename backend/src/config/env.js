require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/course-provider',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'your_api_secret',
  EMAIL_CONFIG: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER || 'your_email@example.com',
      pass: process.env.EMAIL_PASS || 'your_email_password'
    }
  },
  WEBPUSH_CONFIG: {
    publicKey: process.env.VAPID_PUBLIC_KEY || 'your_vapid_public_key',
    privateKey: process.env.VAPID_PRIVATE_KEY || 'your_vapid_private_key'
  },
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};