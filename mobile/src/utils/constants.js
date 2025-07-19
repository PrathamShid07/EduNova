// src/utils/constants.js
export const API_TIMEOUT = 15000; // 15 seconds
export const MAX_EVENTS_PER_PAGE = 10;
export const MAX_NOTIFICATIONS = 50;
export const CACHE_EXPIRY = 3600; // 1 hour in seconds

export const EVENT_TYPES = {
  WORKSHOP: 'workshop',
  COURSE: 'course',
  WEBINAR: 'webinar',
  CONFERENCE: 'conference'
};

export const USER_ROLES = {
  STUDENT: 'student',
  PROVIDER: 'provider',
  ADMIN: 'admin'
};

export const NOTIFICATION_TYPES = {
  SYSTEM: 'system',
  EVENT: 'event',
  MESSAGE: 'message'
};