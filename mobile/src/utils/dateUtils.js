// src/utils/dateUtils.js
import { format } from 'date-fns';

export const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MMMM do, yyyy');
};

export const formatEventTime = (timeString) => {
  return format(new Date(`2000-01-01T${timeString}`), 'h:mm a');
};

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return format(date, 'MMM d, yyyy • h:mm a');
};

export const isPastEvent = (eventDate) => {
  return new Date(eventDate) < new Date();
};

export const getDaysUntil = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};