import axios from 'axios';
import { retrieveToken } from './storage';

const API_URL = 'https://your-api-url.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor for adding token
api.interceptors.request.use(
  async (config) => {
    const token = await retrieveToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration or unauthorized access
    }
    return Promise.reject(error.response?.data?.message || error.message);
  }
);

export default api;