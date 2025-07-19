import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProviderDashboard from '../screens/provider/ProviderDashboard';
import CreateEventScreen from '../screens/provider/CreateEventScreen';
import ManageEventsScreen from '../screens/provider/ManageEventsScreen';
import ProviderProfileScreen from '../screens/provider/ProviderProfileScreen';

const Stack = createStackNavigator();

const ProviderNavigator = () => (
  <Stack.Navigator
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
      name="Dashboard" 
      component={ProviderDashboard} 
      options={{ title: 'Provider Dashboard' }}
    />
    <Stack.Screen 
      name="CreateEvent" 
      component={CreateEventScreen} 
      options={{ title: 'Create New Event' }}
    />
    <Stack.Screen 
      name="ManageEvents" 
      component={ManageEventsScreen} 
      options={{ title: 'Manage Events' }}
    />
    <Stack.Screen 
      name="ProviderProfile" 
      component={ProviderProfileScreen} 
      options={{ title: 'My Profile' }}
    />
  </Stack.Navigator>
);

export default ProviderNavigator;