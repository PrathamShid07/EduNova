import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl 
} from 'react-native';
import { NotificationContext } from '../../context/NotificationContext';
import { spaceTheme } from '../../styles/theme'; // Add this import

const NotificationsScreen = () => {
  const { notifications, getNotifications } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getNotifications();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await getNotifications();
      } catch (error) {
        console.error('Failed to load notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  });

  if (loading) {
    return <ActivityIndicator size="large" color={spaceTheme.colors.primary} />;
  }

  const notificationData = notifications?.currentValue || [];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={notificationData}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.message}</Text>
            <Text style={{ color: 'gray', fontSize: 12 }}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No notifications available
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[spaceTheme.colors.primary]}
          />
        }
      />
    </View>
  );
};

export default NotificationsScreen;