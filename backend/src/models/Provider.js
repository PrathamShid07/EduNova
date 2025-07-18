const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Provider name is required'],
        trim: true,
        maxlength: [200, 'Provider name cannot exceed 200 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    website: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
    },
    address: {
        type: String,
        trim: true,
        maxlength: [500, 'Address cannot exceed 500 characters']
    },
    logoUrl: {
        type: String,
        trim: true
    },
    socialLinks: {
        facebook: String,
        linkedin: String,
        twitter: String,
        instagram: String,
        youtube: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5']
    },
    totalEvents: {
        type: Number,
        default: 0,
        min: [0, 'Total events cannot be negative']
    },
    totalParticipants: {
        type: Number,
        default: 0,
        min: [0, 'Total participants cannot be negative']
    },
    categories: [{
        type: String,
        enum: ['webinar', 'course', 'training']
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for events
providerSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'providerId'
});

// Virtual for user details
providerSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

// Indexes
providerSchema.index({ userId: 1 });
providerSchema.index({ verified: 1 });
providerSchema.index({ rating: -1 });
providerSchema.index({ totalEvents: -1 });

module.exports = mongoose.model('Provider', providerSchema);