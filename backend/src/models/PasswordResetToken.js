const mongoose = require('mongoose');
const crypto = require('crypto');

const passwordResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 3600000) // 1 hour from now
    },
    used: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

// Generate token method
passwordResetTokenSchema.methods.generateToken = function () {
    this.token = crypto.randomBytes(32).toString('hex');
    return this.token;
};

// Check if token is valid
passwordResetTokenSchema.methods.isValid = function () {
    return !this.used && this.expiresAt > new Date();
};

// Indexes
passwordResetTokenSchema.index({ userId: 1 });
passwordResetTokenSchema.index({ token: 1 });
passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('PasswordResetToken', passwordResetTokenSchema);