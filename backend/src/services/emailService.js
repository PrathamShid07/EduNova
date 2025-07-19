const nodemailer = require('nodemailer');
const { EMAIL_CONFIG } = require('../config/env');

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

exports.sendContactEmail = async (providerId, studentId, message, subject) => {
  try {
    const provider = await require('../models/Provider').findById(providerId);
    const student = await require('../models/User').findById(studentId);
    
    await transporter.sendMail({
      from: '"Course Provider" <no-reply@courseprovider.com>',
      to: provider.contactInfo.email,
      subject: subject || 'New Contact Message',
      text: `Message from ${student.name} (${student.email}):\n\n${message}`
    });
  } catch (error) {
    throw new Error('Failed to send contact email');
  }
};

exports.sendContactReply = async (studentId, message) => {
  try {
    const student = await require('../models/User').findById(studentId);
    
    await transporter.sendMail({
      from: '"Course Provider" <no-reply@courseprovider.com>',
      to: student.email,
      subject: 'Reply to Your Contact Message',
      text: `Reply from provider:\n\n${message}`
    });
  } catch (error) {
    throw new Error('Failed to send reply email');
  }
};

exports.sendEventReminder = async (userId, event) => {
  try {
    const user = await require('../models/User').findById(userId);
    if (!user.notificationPreferences.eventReminders) return;
    
    await transporter.sendMail({
      from: '"Course Provider" <no-reply@courseprovider.com>',
      to: user.email,
      subject: `Reminder: ${event.title} is coming up!`,
      text: `Dear ${user.name},\n\nThe event "${event.title}" is scheduled for ${new Date(event.startDate).toLocaleString()} at ${event.location}.\n\nDetails: ${event.description}\n\nDon't miss it!`
    });
  } catch (error) {
    throw new Error('Failed to send event reminder');
  }
};

exports.sendPasswordResetEmail = async (userId, token) => {
  try {
    const user = await require('../models/User').findById(userId);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    await transporter.sendMail({
      from: '"Course Provider" <no-reply@courseprovider.com>',
      to: user.email,
      subject: 'Password Reset Request',
      text: `Dear ${user.name},\n\nYou requested a password reset. Click the link below to reset your password:\n${resetUrl}\n\nThis link will expire in 1 hour.`
    });
  } catch (error) {
    throw new Error('Failed to send password reset email');
  }
};