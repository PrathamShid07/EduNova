import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import UsersNavigator from './UsersNavigator';
import EventsNavigator from './EventsNavigator';
import NotificationsNavigator from './NotificationsNavigator';
import ContactsNavigator from './ContactsNavigator';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  // Uncomment when you use auth:
  // const { user, isLoading } = useContext(AuthContext);
  // if (isLoading) return null;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Users" component={UsersNavigator} />
        <RootStack.Screen name="Events" component={EventsNavigator} />
        <RootStack.Screen name="Notifications" component={NotificationsNavigator} />
        <RootStack.Screen name="Contacts" component={ContactsNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;