import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/student/HomeScreen';
import EventsScreen from '../screens/student/EventsScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import ContactsScreen from '../screens/provider/ContactsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'rocket' : 'rocket-outline';
        } else if (route.name === 'Events') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6a5acd',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#000033',
        borderTopWidth: 0,
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 5,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Explore' }} />
    <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'My Events' }} />
    <Tab.Screen name="Contact" component={ContactsScreen} options={{ title: 'Contacts' }} />
  </Tab.Navigator>
);

export default TabNavigator;