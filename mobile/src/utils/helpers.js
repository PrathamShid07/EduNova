// src/utils/helpers.js
import { spaceTheme } from './colors';

export const getThemeColor = (type) => {
  return spaceTheme[type] || spaceTheme.primary;
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const formatPrice = (price) => {
  return price === 0 ? 'FREE' : `$${price.toFixed(2)}`;
};

export const generateAvatarUrl = (name, size = 200) => {
  const encodedName = encodeURIComponent(name.trim());
  return `https://ui-avatars.com/api/?name=${encodedName}&background=${spaceTheme.primary.replace('#', '')}&color=fff&size=${size}`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};