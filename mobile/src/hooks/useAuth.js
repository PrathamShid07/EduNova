import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data.user);
      await AsyncStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', userData);
      setUser(response.data.user);
      await AsyncStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      Alert.alert('Logout Failed', 'Could not log out properly');
    }
  };

  return { loading, login, register, logout };
};