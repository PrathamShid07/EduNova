import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/student/HomeScreen";
import EventsScreen from "../screens/student/EventsScreen";
import ProfileScreen from "../screens/student/ProfileScreen";
import AnalyticsScreen from "../screens/student/AnalyticsScreen"; // Added missing import

// Define colors object based on the dark theme from screenshots
const colors = {
  accent: "#00D4FF", // Bright cyan/turquoise color from the screenshots
  textSecondary: "#9CA3AF", // Light gray for inactive items
  cardBackground: "#1E293B", // Dark navy blue background
  primary: "#FFFFFF", // White text for active items
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Events") {
          iconName = focused
            ? "calendar-multiple"
            : "calendar-multiple-outline";
        } else if (route.name === "Analysis") {
          iconName = focused ? "chart-line" : "chart-line-variant";
        } else if (route.name === "Profile") {
          iconName = focused ? "account-circle" : "account-circle-outline";
        }

        // Using MaterialCommunityIcons to match the import
        return <Icon name={iconName} size={size || 22} color={color} />;
      },
      tabBarActiveTintColor: colors.accent, // Bright cyan for active tabs
      tabBarInactiveTintColor: colors.textSecondary, // Gray for inactive tabs
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.cardBackground, // Dark navy background
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.1)", // Subtle light border
        paddingVertical: 8,
        paddingBottom: Platform.OS === "ios" ? 20 : 8,
        height: Platform.OS === "ios" ? 80 : 68,
        elevation: 0, // Remove shadow on Android
        shadowOpacity: 0, // Remove shadow on iOS
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: "600",
        marginTop: 2,
        marginBottom: 2,
      },
      tabBarItemStyle: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Explore" }}
    />
    <Tab.Screen
      name="Events"
      component={EventsScreen}
      options={{ title: "My Events" }}
    />
    <Tab.Screen
      name="Analysis"
      component={AnalyticsScreen}
      options={{ title: "Analytics" }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: "Profile" }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
