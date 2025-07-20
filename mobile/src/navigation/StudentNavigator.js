import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import EventDetailScreen from "../screens/student/EventDetailScreen";
import ProvidersScreen from "../screens/student/ProvidersScreen";
import NotificationsScreen from "../screens/student/NotificationsScreen";
import MyCoursesScreen from "../screens/student/MyCourses"; // Add this import
import CertificatesScreen from "../screens/student/CertificatesScreen"; // Add CertificateScreen import
import SettingsScreen from "../screens/student/SettingsScreen"; // Add SettingsScreen import

const Stack = createStackNavigator();

const StudentNavigator = () => (
  <Stack.Navigator
    initialRouteName="MainTabs"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#000033",
      },
      headerTintColor: "#6a5acd",
      headerTitleStyle: {
        fontWeight: "bold",
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
      options={{ title: "Course Providers" }}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        title: "Notifications",
        headerStyle: {
          backgroundColor: "#000033",
        },
        headerTintColor: "#fff",
      }}
    />
    {/* Add MyCoursesScreen to the navigator */}
    <Stack.Screen
      name="MyCourses"
      component={MyCoursesScreen}
      options={{
        headerShown: false, // Since MyCoursesScreen has its own header
      }}
    />
    {/* Add CertificateScreen to the navigator */}
    <Stack.Screen
      name="Certificate"
      component={CertificatesScreen}
      options={{
        title: "Certificates",
        headerStyle: {
          backgroundColor: "#000033",
        },
        headerTintColor: "#fff",
      }}
    />
    {/* Add SettingsScreen to the navigator */}
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: "Settings",
        headerStyle: {
          backgroundColor: "#000033",
        },
        headerTintColor: "#fff",
      }}
    />
  </Stack.Navigator>
);

export default StudentNavigator;
