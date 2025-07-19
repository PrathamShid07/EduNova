import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import EventsScreen from '../screens/events/EventsScreen';
import EventDetailsScreen from '../screens/events/EventDetailsScreen';
import CreateEventScreen from '../screens/events/CreateEventScreen';
import EditEventScreen from '../screens/events/EditEventScreen';
import ProviderEventsScreen from '../screens/events/ProviderEventsScreen';

const Stack = createStackNavigator();

const EventsNavigator = ({ navigation }) => {
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
        name="Events"
        component={EventsScreen}
        options={{ title: 'Events' }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={({ route }) => ({ 
          title: route.params?.eventTitle || 'Event Details' 
        })}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{ title: 'Create Event' }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEventScreen}
        options={({ route }) => ({ 
          title: route.params?.eventTitle ? `Edit ${route.params.eventTitle}` : 'Edit Event' 
        })}
      />
      <Stack.Screen
        name="ProviderEvents"
        component={ProviderEventsScreen}
        options={{ title: 'My Events' }}
      />
    </Stack.Navigator>
  );
};

export default EventsNavigator;