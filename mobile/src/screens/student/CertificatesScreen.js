import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CertificatesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("earned");

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
    gold: "#FFD700",
  };

  // Sample earned certificates data
  const earnedCertificates = [
    {
      id: "1",
      title: "Introduction to Astrophysics",
      instructor: "Dr. Neil Jonas",
      completionDate: "2024-12-15",
      grade: "A",
      courseImage:
        "https://images.careerindia.com/img/2017/03/26-astronomycourse-23-1490266933.jpg",
      certificateId: "SA-ASTRO-001-2024",
      skills: ["Stellar Evolution", "Galaxies", "Dark Matter"],
      credentialUrl: "https://certificates.spaceacademy.com/astro-001",
    },
    {
      id: "2",
      title: "Cyber Security Fundamentals",
      instructor: "Prof. Alex Smith",
      completionDate: "2024-11-28",
      grade: "A+",
      courseImage:
        "https://media.licdn.com/dms/image/v2/D4D12AQF7A0bqGYMj0A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733136423495?e=2147483647&v=beta&t=GnQ8yuIoj6U5PB0Ib9BekWLUGgZoOafcfBMpeJH8ZE8",
      certificateId: "SA-CYBER-002-2024",
      skills: ["Network Security", "Encryption", "Threat Analysis"],
      credentialUrl: "https://certificates.spaceacademy.com/cyber-002",
    },
    {
      id: "3",
      title: "Data Science Mastery",
      instructor: "Prof. Mukesh",
      completionDate: "2024-10-20",
      grade: "A",
      courseImage: "https://www.oxfordinstitute.in/img/data-science-course.jpg",
      certificateId: "SA-DATA-003-2024",
      skills: ["Python", "Machine Learning", "Data Visualization"],
      credentialUrl: "https://certificates.spaceacademy.com/data-003",
    },
  ];

  // Sample in-progress certificates
  const inProgressCertificates = [
    {
      id: "4",
      title: "Quantum Mechanics Basics",
      instructor: "Prof. John Leap",
      progress: 75,
      estimatedCompletion: "2025-01-30",
      courseImage:
        "https://online.stanford.edu/sites/default/files/styles/card_header/public/2018-04/electrical-engineering-applied-quantum-mechanics_ee222.jpg?h=66807ab2&itok=KmFrPPKh",
    },
    {
      id: "5",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Lalita",
      progress: 45,
      estimatedCompletion: "2025-02-15",
      courseImage:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F762927919%2F1221918410073%2F1%2Foriginal.20240508-193018?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C44%2C1400%2C700&s=5f04da72028e4f9ac261f7619443b6ea",
    },
  ];

  const handleShareCertificate = async (certificate) => {
    try {
      await Share.share({
        message: `I just earned a certificate in ${certificate.title} from Space Academy! 🚀\n\nCredential ID: ${certificate.certificateId}\nVerify at: ${certificate.credentialUrl}`,
        title: `${certificate.title} Certificate`,
      });
    } catch (error) {
      console.log("Error sharing certificate:", error);
    }
  };

  const handleDownloadCertificate = (certificate) => {
    // In a real app, this would trigger a download
    console.log("Downloading certificate:", certificate.certificateId);
    // You could implement actual download functionality here
  };

  const renderEarnedCertificate = ({ item }) => (
    <View
      style={[
        styles.certificateCard,
        { backgroundColor: colors.cardBackground },
      ]}
    >
      <View style={styles.certificateHeader}>
        <Image
          source={{ uri: item.courseImage }}
          style={styles.certificateImage}
        />
        <View style={styles.certificateBadge}>
          <Ionicons name="trophy" size={16} color={colors.gold} />
        </View>
      </View>

      <View style={styles.certificateContent}>
        <Text
          style={[styles.certificateTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.certificateInstructor,
            { color: colors.textSecondary },
          ]}
        >
          {item.instructor}
        </Text>

        <View style={styles.certificateDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={14} color={colors.accent} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              Completed: {new Date(item.completionDate).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="school" size={14} color={colors.accent} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              Grade: {item.grade}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="card" size={14} color={colors.accent} />
            <Text
              style={[styles.detailText, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              ID: {item.certificateId}
            </Text>
          </View>
        </View>

        <View style={styles.skillsContainer}>
          {item.skills?.map((skill, index) => (
            <View
              key={index}
              style={[
                styles.skillTag,
                { backgroundColor: colors.accent + "20" },
              ]}
            >
              <Text style={[styles.skillText, { color: colors.accent }]}>
                {skill}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.certificateActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.accent }]}
            onPress={() => handleDownloadCertificate(item)}
          >
            <Ionicons name="download" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.success }]}
            onPress={() => handleShareCertificate(item)}
          >
            <Ionicons name="share" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderInProgressCertificate = ({ item }) => (
    <View
      style={[
        styles.certificateCard,
        { backgroundColor: colors.cardBackground },
      ]}
    >
      <View style={styles.certificateHeader}>
        <Image
          source={{ uri: item.courseImage }}
          style={styles.certificateImage}
        />
        <View
          style={[styles.certificateBadge, { backgroundColor: colors.warning }]}
        >
          <Ionicons name="time" size={16} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.certificateContent}>
        <Text
          style={[styles.certificateTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.certificateInstructor,
            { color: colors.textSecondary },
          ]}
        >
          {item.instructor}
        </Text>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text
              style={[styles.progressLabel, { color: colors.textSecondary }]}
            >
              Progress
            </Text>
            <Text style={[styles.progressPercentage, { color: colors.accent }]}>
              {item.progress}%
            </Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${item.progress}%`,
                  backgroundColor:
                    item.progress > 70
                      ? colors.success
                      : item.progress > 40
                      ? colors.warning
                      : colors.accent,
                },
              ]}
            />
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.accent} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              Est. completion:{" "}
              {new Date(item.estimatedCompletion).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: colors.accent }]}
          onPress={() =>
            navigation.navigate("CourseDetails", { courseId: item.id })
          }
        >
          <Text style={styles.continueButtonText}>Continue Course</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="trophy-outline" size={80} color={colors.textSecondary} />
      <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
        {activeTab === "earned"
          ? "No Certificates Yet"
          : "No Courses in Progress"}
      </Text>
      <Text
        style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}
      >
        {activeTab === "earned"
          ? "Complete courses to earn your first certificate!"
          : "Enroll in courses to start earning certificates!"}
      </Text>
      <TouchableOpacity
        style={[styles.exploreButton, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.exploreButtonText}>Explore Courses</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header with Back Navigation */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: colors.cardBackground },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.accent} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Certificates
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            Your Learning Achievements
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "earned" && { backgroundColor: colors.accent },
          ]}
          onPress={() => setActiveTab("earned")}
        >
          <Ionicons
            name="trophy"
            size={20}
            color={activeTab === "earned" ? "#FFFFFF" : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "earned" ? "#FFFFFF" : colors.textSecondary,
              },
            ]}
          >
            Earned ({earnedCertificates.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "inProgress" && { backgroundColor: colors.accent },
          ]}
          onPress={() => setActiveTab("inProgress")}
        >
          <Ionicons
            name="time"
            size={20}
            color={
              activeTab === "inProgress" ? "#FFFFFF" : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "inProgress" ? "#FFFFFF" : colors.textSecondary,
              },
            ]}
          >
            In Progress ({inProgressCertificates.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "earned" ? (
          earnedCertificates.length > 0 ? (
            <FlatList
              data={earnedCertificates}
              renderItem={renderEarnedCertificate}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            renderEmptyState()
          )
        ) : inProgressCertificates.length > 0 ? (
          <FlatList
            data={inProgressCertificates}
            renderItem={renderInProgressCertificate}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          renderEmptyState()
        )}
      </View>
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
  },
  backButton: {
    borderRadius: 12,
    padding: 12,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    width: 48, // Same width as back button for centering
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#1A1A2E",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  certificateCard: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
  },
  certificateHeader: {
    position: "relative",
  },
  certificateImage: {
    width: "100%",
    height: 120,
  },
  certificateBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  certificateContent: {
    padding: 16,
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  certificateInstructor: {
    fontSize: 14,
    marginBottom: 16,
  },
  certificateDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 13,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    fontWeight: "500",
  },
  certificateActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },
  exploreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CertificatesScreen;
