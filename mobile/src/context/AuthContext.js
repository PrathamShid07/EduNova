import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authContext = {
    signIn: async (token) => {
      try {
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);
        return true; // Return success status
      } catch (e) {
        console.log('Login error:', e);
        return false;
      }
    },
    signOut: async () => {
      try {
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log('Logout error:', e);
      }
    },
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.log('Token check error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authContext, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};