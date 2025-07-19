const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please enter a valid URL'],
    default: null
  },
  address: {
    type: String,
    trim: true,
    default: null
  },
  logo: {
    type: String,
    default: null
  },
  socialLinks: [{
    platform: { type: String, trim: true },
    url: { type: String, trim: true, match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please enter a valid URL'] }
  }],
  contactInfo: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-]{7,15}$/, 'Please enter a valid phone number'],
      default: null
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Provider', providerSchema);