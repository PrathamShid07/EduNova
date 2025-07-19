import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({
    currentValue: [], // Initialize with empty array
    unreadCount: 0
  });

  const getNotifications = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch('your-api-endpoint/notifications');
      const data = await response.json();
      
      setNotifications({
        currentValue: data,
        unreadCount: data.filter(n => !n.read).length
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Maintain previous state if error occurs
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};