import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Alert,
  Modal,
  ScrollView,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: true,
    assignments: true,
    achievements: true,
    announcements: true,
    reminders: true,
    marketing: false,
  });

  // Sample notification data
  const initialNotifications = [
    {
      id: '1',
      type: 'course',
      title: 'New Lesson Available',
      message: 'Chapter 3: Black Holes and Event Horizons is now available in your Astrophysics course.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      isRead: false,
      priority: 'high',
      courseId: '1',
      actionType: 'course_lesson',
    },
    {
      id: '2',
      type: 'assignment',
      title: 'Assignment Due Tomorrow',
      message: 'Your Quantum Mechanics problem set is due tomorrow at 11:59 PM.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: false,
      priority: 'urgent',
      courseId: '2',
      actionType: 'assignment',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'Congratulations! You have completed 5 courses and earned the "Space Explorer" badge.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      isRead: true,
      priority: 'medium',
      actionType: 'achievement',
    },
    {
      id: '4',
      type: 'announcement',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      isRead: false,
      priority: 'medium',
      actionType: 'announcement',
    },
    {
      id: '5',
      type: 'course',
      title: 'Course Progress Update',
      message: 'You are 75% complete with your Data Science course. Keep up the great work!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      priority: 'low',
      courseId: '3',
      actionType: 'progress',
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Study Reminder',
      message: 'Do not forget to complete today\'s lesson in Machine Learning Fundamentals.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      isRead: true,
      priority: 'medium',
      courseId: '4',
      actionType: 'reminder',
    },
  ];

  const colors = {
    primary: '#0B3D91',
    secondary: '#FC3D21',
    accent: '#00e6e6',
    background: '#0A0A1A',
    cardBackground: '#1A1A2E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    urgent: '#FF4444',
    high: '#FF9800',
    medium: '#00e6e6',
    low: '#4CAF50',
  };

  const filterOptions = [
    { key: 'all', label: 'All', icon: 'list' },
    { key: 'unread', label: 'Unread', icon: 'mail-unread' },
    { key: 'course', label: 'Courses', icon: 'book' },
    { key: 'assignment', label: 'Assignments', icon: 'document-text' },
    { key: 'achievement', label: 'Achievements', icon: 'trophy' },
    { key: 'announcement', label: 'Announcements', icon: 'megaphone' },
    { key: 'reminder', label: 'Reminders', icon: 'alarm' },
  ];

  // Set navigation options to include header buttons
  React.useLayoutEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;

    navigation.setOptions({
      title: 'Notifications',
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.accent,
      headerTitleStyle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setSettingsVisible(true)}
          >
            <Ionicons name="settings-outline" size={22} color={colors.accent} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Ionicons
              name="checkmark-done"
              size={22}
              color={unreadCount > 0 ? colors.accent : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, notifications]);

  // Initialize notifications only once
  useFocusEffect(
    useCallback(() => {
      if (notifications.length === 0) {
        setNotifications(initialNotifications);
        setFilteredNotifications(initialNotifications);
      }
    }, [])
  );

  useEffect(() => {
    filterNotifications();
  }, [selectedFilter, notifications]);

  const filterNotifications = useCallback(() => {
    let filtered = notifications;

    if (selectedFilter === 'unread') {
      filtered = notifications.filter(n => !n.isRead);
    } else if (selectedFilter !== 'all') {
      filtered = notifications.filter(n => n.type === selectedFilter);
    }

    setFilteredNotifications(filtered);
  }, [selectedFilter, notifications]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return colors.urgent;
      case 'high': return colors.high;
      case 'medium': return colors.medium;
      case 'low': return colors.low;
      default: return colors.accent;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return 'book';
      case 'assignment': return 'document-text';
      case 'achievement': return 'trophy';
      case 'announcement': return 'megaphone';
      case 'reminder': return 'alarm';
      default: return 'notifications';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => prev.filter(n => n.id !== id));
          }
        }
      ]
    );
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const handleNotificationPress = (notification) => {
    markAsRead(notification.id);

    // Handle different action types
    switch (notification.actionType) {
      case 'course_lesson':
      case 'progress':
        if (navigation.navigate) {
          navigation.navigate('CourseDetails', { courseId: notification.courseId });
        }
        break;
      case 'assignment':
        if (navigation.navigate) {
          navigation.navigate('Assignment', { courseId: notification.courseId });
        }
        break;
      case 'achievement':
        if (navigation.navigate) {
          navigation.navigate('Achievements');
        }
        break;
      case 'announcement':
        // Show full announcement or navigate to announcements page
        break;
      case 'reminder':
        if (navigation.navigate) {
          navigation.navigate('CourseDetails', { courseId: notification.courseId });
        }
        break;
      default:
        break;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, fetch new notifications from API
    setRefreshing(false);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        {
          backgroundColor: colors.cardBackground,
          borderLeftColor: getPriorityColor(item.priority),
          opacity: item.isRead ? 0.7 : 1,
        }
      ]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationIcon}>
          <Ionicons
            name={getTypeIcon(item.type)}
            size={20}
            color={getPriorityColor(item.priority)}
          />
        </View>

        <View style={styles.notificationContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.notificationTitle, { color: colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>

          <Text style={[styles.notificationMessage, { color: colors.textSecondary }]} numberOfLines={2}>
            {item.message}
          </Text>

          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
            {getTimeAgo(item.timestamp)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFilterOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor: selectedFilter === item.key ? colors.accent : colors.cardBackground,
        }
      ]}
      onPress={() => setSelectedFilter(item.key)}
    >
      <Ionicons
        name={item.icon}
        size={16}
        color={selectedFilter === item.key ? colors.background : colors.textSecondary}
      />
      <Text style={[
        styles.filterText,
        {
          color: selectedFilter === item.key ? colors.background : colors.textSecondary,
          marginLeft: 6,
        }
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const getSettingDescription = (key) => {
    const descriptions = {
      courseUpdates: 'New lessons, course announcements',
      assignments: 'Due dates, submissions, grades',
      achievements: 'Badges, milestones, certificates',
      announcements: 'System updates, important notices',
      reminders: 'Study reminders, schedule alerts',
      marketing: 'Promotions, new course recommendations',
    };
    return descriptions[key] || '';
  };

  const renderSettingsModal = () => (
    <Modal
      visible={isSettingsVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSettingsVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Notification Settings</Text>
            <TouchableOpacity onPress={() => setSettingsVisible(false)}>
              <Ionicons name="close" size={24} color={colors.accent} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.settingsList}>
            {Object.entries(notificationSettings).map(([key, value]) => (
              <View key={key} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    {getSettingDescription(key)}
                  </Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={(newValue) =>
                    setNotificationSettings(prev => ({ ...prev, [key]: newValue }))
                  }
                  trackColor={{ false: '#333', true: colors.accent }}
                  thumbColor={value ? colors.accent : '#f4f3f4'}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const getEmptyTitle = () => {
    return selectedFilter === 'all' ? 'No notifications' : `No ${selectedFilter} notifications`;
  };

  const getEmptyMessage = () => {
    return selectedFilter === 'all'
      ? 'You are all caught up! New notifications will appear here.'
      : `No ${selectedFilter} notifications at the moment.`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Unread count display */}
      {unreadCount > 0 && (
        <View style={styles.unreadCountContainer}>
          <Text style={[styles.unreadCountText, { color: colors.textSecondary }]}>
            {unreadCount} unread
          </Text>
        </View>
      )}

      {/* Filter Options */}
      <View style={styles.filtersContainer}>
        <FlatList
          data={filterOptions}
          renderItem={renderFilterOption}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.accent}
              colors={[colors.accent]}
            />
          }
          contentContainerStyle={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            {getEmptyTitle()}
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
            {getEmptyMessage()}
          </Text>
        </View>
      )}

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.clearAllButton, { backgroundColor: colors.error }]}
            onPress={clearAllNotifications}
          >
            <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings Modal */}
      {renderSettingsModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  unreadCountContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  unreadCountText: {
    fontSize: 12,
  },
  filtersContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filtersList: {
    paddingHorizontal: 15,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  notificationsList: {
    padding: 20,
  },
  notificationCard: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 230, 230, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00e6e6',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearAllText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsList: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default NotificationScreen;