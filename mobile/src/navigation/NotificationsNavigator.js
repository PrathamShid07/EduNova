import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import NotificationDetailsScreen from '../screens/notifications/NotificationDetailsScreen';
import CreateNotificationScreen from '../screens/notifications/CreateNotificationScreen';
import NotificationPreferencesScreen from '../screens/notifications/NotificationPreferencesScreen';

const Stack = createStackNavigator();

const NotificationsNavigator = ({ navigation }) => {
  const { user } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        try {
          await api.get('/auth/verify-token');
        } catch (error) {
          console.log('Auth verification failed:', error.message);
          
          // Use proper navigation reset to avoid navigation issues
          if (navigation) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              })
            );
          }
        }
      }
    };
    
    checkAuth();
  }, [user, navigation]);

  // Early return if user is not authenticated to prevent rendering
  if (!user) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#6A5ACD',
          elevation: 4,
          shadowOpacity: 0.3,
        },
        headerTintColor: 'white',
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetailsScreen}
        options={({ route }) => ({ 
          title: route.params?.notificationTitle || 'Notification Details' 
        })}
      />
      <Stack.Screen
        name="CreateNotification"
        component={CreateNotificationScreen}
        options={{ title: 'Create Notification' }}
      />
      <Stack.Screen
        name="NotificationPreferences"
        component={NotificationPreferencesScreen}
        options={{ title: 'Preferences' }}
      />
    </Stack.Navigator>
  );
};

export default NotificationsNavigator;