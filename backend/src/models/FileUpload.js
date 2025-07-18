const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filename: {
        type: String,
        required: true,
        trim: true
    },
    originalName: {
        type: String,
        required: true,
        trim: true
    },
    filePath: {
        type: String,
        required: true,
        trim: true
    },
    fileSize: {
        type: Number,
        required: true,
        min: [0, 'File size cannot be negative']
    },
    mimeType: {
        type: String,
        required: true,
        trim: true
    },
    uploadType: {
        type: String,
        required: true,
        enum: ['avatar', 'event_image', 'provider_logo']
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Indexes
fileUploadSchema.index({ userId: 1 });
fileUploadSchema.index({ uploadType: 1 });
fileUploadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('FileUpload', fileUploadSchema);

// models/SystemSetting.js
const mongoose = require('mongoose');

const systemSettingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    value: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['string', 'number', 'boolean', 'json'],
        default: 'string'
    }
}, {
    timestamps: true
});

// Get typed value method
systemSettingSchema.methods.getTypedValue = function () {
    switch (this.type) {
        case 'number':
            return Number(this.value);
        case 'boolean':
            return this.value === 'true';
        case 'json':
            return JSON.parse(this.value);
        default:
            return this.value;
    }
};

// Indexes
systemSettingSchema.index({ key: 1 });

module.exports = mongoose.model('SystemSetting', systemSettingSchema);

// models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    action: {
        type: String,
        required: true,
        trim: true
    },
    tableName: {
        type: String,
        required: true,
        trim: true
    },
    recordId: {
        type: mongoose.Schema.Types.ObjectId
    },
    oldData: {
        type: mongoose.Schema.Types.Mixed
    },
    newData: {
        type: mongoose.Schema.Types.Mixed
    },
    ipAddress: {
        type: String,
        trim: true
    },
    userAgent: {
        type: String,
        trim: true
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

// Indexes
auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ tableName: 1 });
auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);