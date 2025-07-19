// src/utils/validation.js
export const validateEventForm = (formData) => {
  const errors = {};
  
  if (!formData.title) errors.title = 'Event title is required';
  if (!formData.description) errors.description = 'Description is required';
  if (!formData.date) errors.date = 'Date is required';
  if (!formData.time) errors.time = 'Time is required';
  if (!formData.location) errors.location = 'Location is required';
  if (formData.price < 0) errors.price = 'Price cannot be negative';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSignupForm = (formData) => {
  const errors = {};
  
  if (!formData.name) errors.name = 'Name is required';
  if (!formData.email) errors.email = 'Email is required';
  if (!formData.password) errors.password = 'Password is required';
  if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateContactForm = (formData) => {
  const errors = {};
  
  if (!formData.name) errors.name = 'Name is required';
  if (!formData.message) errors.message = 'Message is required';
  if (formData.message.length < 10) {
    errors.message = 'Message should be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};