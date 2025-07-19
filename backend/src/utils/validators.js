const { ROLES, EVENT_CATEGORIES, NOTIFICATION_TYPES, CONTACT_STATUSES } = require('./constants');

exports.isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

exports.isValidEventCategory = (category) => {
  return EVENT_CATEGORIES.includes(category);
};

exports.isValidNotificationType = (type) => {
  return NOTIFICATION_TYPES.includes(type);
};

exports.isValidContactStatus = (status) => {
  return CONTACT_STATUSES.includes(status);
};

exports.isValidMongoId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};