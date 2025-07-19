import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { ThemeContext } from "styled-components/native";
import Button from "../../components/common/Button";
import astro from "../../assets/images/astronaut.png";

const ProfileScreen = () => {
  const theme = React.useContext(ThemeContext);

  const userData = {
    name: "Commander Sudanshu",
    title: "Space Education Specialist",
    email: "sudanshu@spaceedu.com",
    coursesCompleted: 42,
    currentMission: "Mars Colonization Prep",
    achievements: [
      "Lunar Module Certification",
      "Zero-G Teaching Expert",
      "ISS Alumni",
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={astro} style={styles.profileImage} />
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {userData.name}
        </Text>
        <Text style={[styles.title, { color: theme.colors.accent }]}>
          {userData.title}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Mission Status
        </Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Current Mission: {userData.currentMission}
        </Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Courses Completed: {userData.coursesCompleted}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Space Achievements
        </Text>
        {userData.achievements.map((achievement, index) => (
          <Text
            key={index}
            style={[styles.text, { color: theme.colors.text, marginBottom: 5 }]}
          >
            🚀 {achievement}
          </Text>
        ))}
      </View>

      <Button
        title="Edit Space Profile"
        onPress={() => console.log("Edit profile")}
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000033",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#1CB5E0",
  },
  name: {
    fontSize: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1CB5E0",
    paddingBottom: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default ProfileScreen;
