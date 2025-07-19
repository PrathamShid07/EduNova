import { useState, useEffect, useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import api from '../services/api';

export const useNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { notifications, setNotifications } = useContext(NotificationContext);

  const fetchNotifications = async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      refresh ? setRefreshing(false) : setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  });

  return { 
    notifications, 
    loading, 
    refreshing, 
    fetchNotifications, 
    markAsRead, 
    deleteNotification 
  };
};