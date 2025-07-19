import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import EventDetailScreen from '../screens/student/EventDetailScreen';
import ProvidersScreen from '../screens/student/ProvidersScreen';
import NotificationsScreen from '../screens/student/NotificationsScreen';

const Stack = createStackNavigator();

const StudentNavigator = () => (
  <Stack.Navigator
    initialRouteName="MainTabs"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000033',
      },
      headerTintColor: '#6a5acd',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="MainTabs" 
      component={TabNavigator} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="EventDetail" 
      component={EventDetailScreen} 
      options={({ route }) => ({ title: route.params.event.title })}
    />
    <Stack.Screen 
      name="Providers" 
      component={ProvidersScreen} 
      options={{ title: 'Course Providers' }}
    />
    <Stack.Screen 
    name="Notifications" 
    component={NotificationsScreen}
    options={{ 
      title: 'Notifications',
      headerStyle: {
        backgroundColor: '#000033',
      },
      headerTintColor: '#fff',
    }}
    />
  </Stack.Navigator>
);

export default StudentNavigator;