import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const NotificationDetailsScreen = ({ route, navigation }) => {
  const { notificationId } = route.params;
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchNotification();
  }, [user, navigation]);

  const fetchNotification = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/notifications/${notificationId}`);
      setNotification(response.data);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load notification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      setNotification({ ...notification, isRead: true });
      Alert.alert('Success', 'Notification marked as read');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to mark as read');
    }
  };

  const handleDeleteNotification = async () => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/notifications/${notificationId}`);
              Alert.alert('Success', 'Notification deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to delete notification');
            }
          },
        },
      ]
    );
  };

  if (isLoading || !notification) {
    return (
      <View style={styles.background}>
        <ActivityIndicator size="large" color="#6A5ACD" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: NEBULA_BG }}
      style={styles.background}
      blurRadius={1}
      accessibilityLabel="Notification details background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Notification details logo">
          <Icon name="bell-outline" size={50} color="#6A5ACD" />
          <Text style={styles.title}>{notification.title}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.notificationText}>Message: {notification.message}</Text>
          <Text style={styles.notificationText}>
            Status: {notification.isRead ? 'Read' : 'Unread'}
          </Text>
          <Text style={styles.notificationText}>
            Date: {new Date(notification.createdAt).toLocaleString()}
          </Text>
          {!notification.isRead && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleMarkAsRead}
              accessibilityLabel="Mark as read button"
            >
              <Text style={styles.buttonText}>MARK AS READ</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteNotification}
            accessibilityLabel="Delete notification button"
          >
            <Text style={styles.buttonText}>DELETE NOTIFICATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,30,0.8)', padding: 30, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(106, 90, 205, 0.3)',
  },
  notificationText: { color: 'white', fontSize: 16, marginBottom: 10 },
  loginButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default NotificationDetailsScreen;