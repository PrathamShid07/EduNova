import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import ProfileScreen from '../screens/users/ProfileScreen';
import FavoritesScreen from '../screens/users/FavoritesScreen';

const Stack = createStackNavigator();

const UsersNavigator = ({ navigation }) => {
  const { user } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        try {
          await api.get('/auth/verify-token');
        } catch (error) {
          navigation.navigate('Login');
        }
      }
    };
    checkAuth();
  }, [user, navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6A5ACD' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Your Profile' }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Your Favorites' }}
      />
    </Stack.Navigator>
  );
};

export default UsersNavigator;