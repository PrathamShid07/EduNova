import api from './api';

export const getProviders = async () => {
  try {
    const response = await api.get('/providers');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch providers');
  }
};

export const getProviderDetails = async (providerId) => {
  try {
    const response = await api.get(`/providers/${providerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch provider details');
  }
};

export const contactProvider = async (providerId, message) => {
  try {
    const response = await api.post(`/providers/${providerId}/contact`, { message });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to send message');
  }
};