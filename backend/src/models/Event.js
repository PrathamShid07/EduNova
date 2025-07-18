const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        trim: true,
        maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    category: {
        type: String,
        required: [true, 'Event category is required'],
        enum: ['webinar', 'course', 'training']
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        maxlength: [300, 'Location cannot exceed 300 characters']
    },
    maxParticipants: {
        type: Number,
        min: [1, 'Maximum participants must be at least 1']
    },
    currentParticipants: {
        type: Number,
        default: 0,
        min: [0, 'Current participants cannot be negative']
    },
    imageUrl: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: [50, 'Each tag cannot exceed 50 characters']
    }],
    requirements: {
        type: String,
        trim: true,
        maxlength: [1000, 'Requirements cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        default: 0,
        min: [0, 'Price cannot be negative']
    },
    isFree: {
        type: Boolean,
        default: true
    },
    meetingLink: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please enter a valid meeting link']
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    viewCount: {
        type: Number,
        default: 0,
        min: [0, 'View count cannot be negative']
    },
    registrations: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['registered', 'attended', 'cancelled'],
            default: 'registered'
        },
        notes: String
    }],
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        review: {
            type: String,
            maxlength: [1000, 'Review cannot exceed 1000 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Validate that endDate is after startDate
eventSchema.pre('save', function (next) {
    if (this.endDate <= this.startDate) {
        next(new Error('End date must be after start date'));
    }
    next();
});

// Virtual for provider details
eventSchema.virtual('provider', {
    ref: 'Provider',
    localField: 'providerId',
    foreignField: '_id',
    justOne: true
});

// Virtual for average rating
eventSchema.virtual('averageRating').get(function () {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
});

// Virtual for registration count
eventSchema.virtual('registrationCount').get(function () {
    return this.registrations.filter(reg => reg.status === 'registered').length;
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function () {
    if (!this.maxParticipants) return null;
    return Math.max(0, this.maxParticipants - this.registrationCount);
});

// Virtual for is full
eventSchema.virtual('isFull').get(function () {
    if (!this.maxParticipants) return false;
    return this.registrationCount >= this.maxParticipants;
});

// Indexes
eventSchema.index({ providerId: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ isFeatured: 1 });
eventSchema.index({ viewCount: -1 });
eventSchema.index({ createdAt: -1 });
eventSchema.index({ 'registrations.userId': 1 });

module.exports = mongoose.model('Event', eventSchema);