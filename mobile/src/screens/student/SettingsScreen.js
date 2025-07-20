import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();

  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [courseReminders, setCourseReminders] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [downloadOverWifi, setDownloadOverWifi] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const colors = {
    primary: "#0B3D91",
    secondary: "#FC3D21",
    accent: "#00e6e6",
    background: "#0A0A1A",
    cardBackground: "#1A1A2E",
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
    success: "#4CAF50",
    warning: "#FF9800",
    border: "#333333",
  };

  // Fixed the header configuration with useEffect
  useEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.accent,
      headerTitleStyle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
      },
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const settingSections = [
    {
      title: "Notifications",
      items: [
        {
          title: "Push Notifications",
          subtitle: "Receive push notifications for updates",
          icon: "notifications",
          type: "toggle",
          value: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          title: "Email Notifications",
          subtitle: "Get notified via email",
          icon: "mail",
          type: "toggle",
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
        {
          title: "Course Reminders",
          subtitle: "Remind me about upcoming lessons",
          icon: "alarm",
          type: "toggle",
          value: courseReminders,
          onToggle: setCourseReminders,
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          title: "Dark Mode",
          subtitle: "Use dark theme",
          icon: "moon",
          type: "toggle",
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: "Download & Streaming",
      items: [
        {
          title: "Download over Wi-Fi only",
          subtitle: "Save mobile data",
          icon: "wifi",
          type: "toggle",
          value: downloadOverWifi,
          onToggle: setDownloadOverWifi,
        },
        {
          title: "Auto-play next video",
          subtitle: "Automatically play next lesson",
          icon: "play-forward",
          type: "toggle",
          value: autoPlay,
          onToggle: setAutoPlay,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "Manage Profile",
          subtitle: "Edit your personal information",
          icon: "person",
          type: "navigation",
          onPress: () => {
            try {
              navigation.navigate("Profile");
            } catch (error) {
              console.log("Navigation error:", error);
            }
          },
        },
        {
          title: "Change Password",
          subtitle: "Update your password",
          icon: "lock-closed",
          type: "navigation",
          onPress: () => {
            try {
              navigation.navigate("ChangePassword");
            } catch (error) {
              console.log("Navigation error:", error);
            }
          },
        },
        {
          title: "Privacy Settings",
          subtitle: "Manage your privacy preferences",
          icon: "shield-checkmark",
          type: "navigation",
          onPress: () => {
            try {
              navigation.navigate("Privacy");
            } catch (error) {
              console.log("Navigation error:", error);
            }
          },
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Help Center",
          subtitle: "Get help and support",
          icon: "help-circle",
          type: "navigation",
          onPress: () => {
            try {
              navigation.navigate("HelpCenter");
            } catch (error) {
              console.log("Navigation error:", error);
            }
          },
        },
        {
          title: "Contact Us",
          subtitle: "Send us your feedback",
          icon: "mail",
          type: "navigation",
          onPress: () => {
            try {
              navigation.navigate("ContactUs");
            } catch (error) {
              console.log("Navigation error:", error);
            }
          },
        },
        {
          title: "Rate App",
          subtitle: "Rate us on the app store",
          icon: "star",
          type: "navigation",
          onPress: () => {
            // Handle app rating
            console.log("Rate app pressed");
          },
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          title: "Terms of Service",
          subtitle: "Read our terms and conditions",
          icon: "document-text",
          type: "navigation",
          onPress: () => {
            try {
              navigation.navigate("Terms");
            } catch (error) {
              console.log("Navigation error:", error);
            }
          },
        },
        {
          title: "Privacy Policy",
          subtitle: "How we handle your data",
          icon: "document-lock",
          type: "navigation",
          onPress: () => {
            try {
              navigation.navigate("PrivacyPolicy");
            } catch (error) {
              console.log("Navigation error:", error);
            }
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item, index, sectionItems) => {
    return (
      <TouchableOpacity
        key={`${item.title}-${index}`} // ✅ Corrected key syntax
        style={[
          styles.settingItem,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            borderBottomWidth: index === sectionItems.length - 1 ? 0 : 1,
          },
        ]}
        onPress={item.onPress}
        disabled={item.type === "toggle"}
        activeOpacity={item.type === "toggle" ? 1 : 0.7}
      >
        <View style={styles.settingLeft}>
          <View
            style={[
              styles.settingIcon,
              { backgroundColor: colors.accent + "20" },
            ]}
          >
            <Ionicons name={item.icon} size={20} color={colors.accent} />
          </View>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text
              style={[styles.settingSubtitle, { color: colors.textSecondary }]}
            >
              {item.subtitle}
            </Text>
          </View>
        </View>

        {item.type === "toggle" ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: colors.border, true: colors.accent + "50" }}
            thumbColor={item.value ? colors.accent : colors.textSecondary}
            ios_backgroundColor={colors.border}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderSection = (section, sectionIndex) => {
    return (
      <View key={`${section.title}-${sectionIndex}`} style={styles.section}>
        {" "}
        {/* ✅ Corrected key syntax */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {section.title}
        </Text>
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          {section.items.map((item, itemIndex) =>
            renderSettingItem(item, itemIndex, section.items)
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Settings Content */}

      {/* Settings Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {settingSections.map((section, index) => renderSection(section, index))}

        {/* Sign Out Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.signOutButton,
              {
                backgroundColor: colors.secondary + "20",
                borderColor: colors.secondary,
              },
            ]}
            onPress={() => {
              // Handle sign out
              console.log("Sign out pressed");
            }}
          >
            <Ionicons name="log-out" size={24} color={colors.secondary} />
            <Text style={[styles.signOutText, { color: colors.secondary }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            Space Academy v2.1.0
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  bottomPadding: {
    height: 20,
  },
});

export default SettingsScreen;
