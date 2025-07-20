import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import EventDetailScreen from "../screens/student/EventDetailScreen";
import ProvidersScreen from "../screens/student/ProvidersScreen";
import NotificationsScreen from "../screens/student/NotificationsScreen";
import MyCoursesScreen from "../screens/student/MyCourses";
import CertificatesScreen from "../screens/student/CertificatesScreen";
import SettingsScreen from "../screens/student/SettingsScreen";
import AnalyticsScreen from "../screens/student/AnalyticsScreen";
import CybersecurityScreen from "../screens/student/CybersecurityScreen";
import AstronomyScreen from "../screens/student/AstronomyScreen";
import DataScienceScreen from "../screens/student/DataScienceScreen";

const Stack = createStackNavigator();

const StudentNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TabNavigator"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EventDetail"
      component={EventDetailScreen}
      options={({ route }) => ({ title: route.params.event.title })}
    />
    <Stack.Screen name="Providers" component={ProvidersScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
    <Stack.Screen name="Certificates" component={CertificatesScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    {/* Fixed: Changed from "Cybersecurity" to "CybersecurityScreen" to match HomeScreen navigation */}
    <Stack.Screen
      name="CybersecurityScreen"
      component={CybersecurityScreen}
      options={{ title: "Cybersecurity" }}
    />
    {/* Fixed: Changed from "Astronomy" to "AstronomyScreen" and added proper options */}
    <Stack.Screen
      name="AstronomyScreen"
      component={AstronomyScreen}
      options={{ headerShown: false }} // Since AstronomyScreen has its own header
    />
    {/* Added DataScienceScreen */}
    <Stack.Screen
      name="DataScienceScreen"
      component={DataScienceScreen}
      options={{ headerShown: false }} // Since DataScienceScreen has its own header
    />
  </Stack.Navigator>
);

export default StudentNavigator;
