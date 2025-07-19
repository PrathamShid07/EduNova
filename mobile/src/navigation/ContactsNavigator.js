import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import ContactsScreen from '../screens/contacts/ContactsScreen';
import ContactDetailsScreen from '../screens/contacts/ContactDetailsScreen';
import CreateContactScreen from '../screens/contacts/CreateContactScreen';

const Stack = createStackNavigator();

const ContactsNavigator = ({ navigation }) => {
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
        name="Contacts"
        component={ContactsScreen}
        options={{ title: 'Contacts' }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={({ route }) => ({ 
          title: route.params?.contactName || 'Contact Details' 
        })}
      />
      <Stack.Screen
        name="CreateContact"
        component={CreateContactScreen}
        options={{ title: 'Create Contact' }}
      />
    </Stack.Navigator>
  );
};

export default ContactsNavigator;