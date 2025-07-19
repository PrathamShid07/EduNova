import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const NotificationsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchNotifications();
  }, [user, navigation]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/notifications/');
      setNotifications(response.data.notifications || []);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/mark-all-read');
      setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })));
      Alert.alert('Success', 'All notifications marked as read');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to mark all as read');
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.isRead ? styles.readNotification : styles.unreadNotification]}
      onPress={() => navigation.navigate('NotificationDetails', { notificationId: item.id })}
      accessibilityLabel={`View notification: ${item.title}`}
    >
      <Text style={styles.notificationText}>{item.title}</Text>
      <Text style={styles.notificationSubText}>{item.message}</Text>
      <Text style={styles.notificationDate}>{new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
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
      accessibilityLabel="Notifications background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Notifications logo">
          <Icon name="bell" size={50} color="#6A5ACD" />
          <Text style={styles.title}>NOTIFICATIONS</Text>
        </View>
        <View style={styles.formContainer}>
          {user?.role === 'provider' && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('CreateNotification')}
              accessibilityLabel="Create new notification button"
            >
              <Text style={styles.buttonText}>CREATE NOTIFICATION</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('NotificationPreferences')}
            accessibilityLabel="Notification preferences button"
          >
            <Text style={styles.buttonText}>NOTIFICATION PREFERENCES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={handleMarkAllRead}
            accessibilityLabel="Mark all as read button"
          >
            <Text style={styles.buttonText}>MARK ALL AS READ</Text>
          </TouchableOpacity>
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id.toString()}
            style={styles.notificationsList}
            ListEmptyComponent={<Text style={styles.emptyText}>No notifications</Text>}
          />
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
  loginButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  markAllButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  notificationsList: { marginTop: 10 },
  notificationItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  readNotification: { backgroundColor: 'rgba(255,255,255,0.05)' },
  unreadNotification: { backgroundColor: 'rgba(106,90,205,0.2)' },
  notificationText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  notificationSubText: { color: '#aaa', fontSize: 14 },
  notificationDate: { color: '#aaa', fontSize: 12, marginTop: 5 },
  emptyText: { color: '#aaa', textAlign: 'center', fontSize: 16 },
});

export default NotificationsScreen;