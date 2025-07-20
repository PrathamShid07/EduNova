import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CybersecurityScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isEnrolled] = useState(true); // Set to true since user is already enrolled

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
    error: "#F44336",
  };

  const courseData = {
    id: "5",
    title: "Cyber Security",
    instructor: "Prof. Alex Smith",
    duration: "8 weeks",
    price: "$149",
    originalPrice: "$199",
    rating: 4.8,
    students: 2150,
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQF7A0bqGYMj0A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733136423495?e=2147483647&v=beta&t=GnQ8yuIoj6U5PB0Ib9BekWLUGgZoOafcfBMpeJH8ZE8",
    progress: 60,
    totalLessons: 24,
    completedLessons: 14,
    nextLesson: "Data Analytics",
    difficulty: "Intermediate",
    language: "English",
    certificate: true,
    description:
      "Master the fundamentals of cybersecurity and learn to protect digital assets from various threats. This comprehensive course covers network security, ethical hacking, risk management, and modern security protocols.",
    learningOutcomes: [
      "Understand fundamental cybersecurity concepts and principles",
      "Learn about network security and firewall configuration",
      "Master encryption techniques and cryptographic protocols",
      "Develop skills in vulnerability assessment and penetration testing",
      "Understand incident response and digital forensics",
      "Learn compliance frameworks and risk management",
    ],
    requirements: [
      "Basic understanding of computer networks",
      "Familiarity with operating systems (Windows/Linux)",
      "Basic programming knowledge (optional but helpful)",
      "Strong analytical and problem-solving skills",
    ],
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to Cybersecurity",
      duration: "15 min",
      completed: true,
      locked: false,
    },
    {
      id: 2,
      title: "Types of Cyber Threats",
      duration: "22 min",
      completed: true,
      locked: false,
    },
    {
      id: 3,
      title: "Network Security Fundamentals",
      duration: "28 min",
      completed: true,
      locked: false,
    },
    {
      id: 4,
      title: "Encryption and Cryptography",
      duration: "35 min",
      completed: true,
      locked: false,
    },
    {
      id: 5,
      title: "Authentication and Access Control",
      duration: "25 min",
      completed: true,
      locked: false,
    },
    {
      id: 6,
      title: "Firewall Configuration",
      duration: "30 min",
      completed: true,
      locked: false,
    },
    {
      id: 7,
      title: "Vulnerability Assessment",
      duration: "40 min",
      completed: true,
      locked: false,
    },
    {
      id: 8,
      title: "Penetration Testing Basics",
      duration: "45 min",
      completed: true,
      locked: false,
    },
    {
      id: 9,
      title: "Web Application Security",
      duration: "38 min",
      completed: true,
      locked: false,
    },
    {
      id: 10,
      title: "Mobile Security",
      duration: "32 min",
      completed: true,
      locked: false,
    },
    {
      id: 11,
      title: "Cloud Security",
      duration: "42 min",
      completed: true,
      locked: false,
    },
    {
      id: 12,
      title: "Social Engineering",
      duration: "28 min",
      completed: true,
      locked: false,
    },
    {
      id: 13,
      title: "Malware Analysis",
      duration: "50 min",
      completed: true,
      locked: false,
    },
    {
      id: 14,
      title: "Digital Forensics",
      duration: "35 min",
      completed: true,
      locked: false,
    },
    {
      id: 15,
      title: "Data Analytics",
      duration: "40 min",
      completed: false,
      locked: false,
    },
    {
      id: 16,
      title: "Incident Response",
      duration: "45 min",
      completed: false,
      locked: false,
    },
    {
      id: 17,
      title: "Security Policies",
      duration: "30 min",
      completed: false,
      locked: false,
    },
    {
      id: 18,
      title: "Compliance Frameworks",
      duration: "35 min",
      completed: false,
      locked: false,
    },
    {
      id: 19,
      title: "Risk Management",
      duration: "38 min",
      completed: false,
      locked: false,
    },
    {
      id: 20,
      title: "Business Continuity",
      duration: "32 min",
      completed: false,
      locked: false,
    },
    {
      id: 21,
      title: "Advanced Threats",
      duration: "42 min",
      completed: false,
      locked: false,
    },
    {
      id: 22,
      title: "Security Automation",
      duration: "48 min",
      completed: false,
      locked: false,
    },
    {
      id: 23,
      title: "Final Project",
      duration: "60 min",
      completed: false,
      locked: false,
    },
    {
      id: 24,
      title: "Course Assessment",
      duration: "90 min",
      completed: false,
      locked: false,
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Excellent course! Prof. Alex Smith explains complex concepts clearly. The hands-on labs are fantastic.",
      date: "2 days ago",
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      comment:
        "Great practical approach to cybersecurity. The real-world examples make it easy to understand.",
      date: "1 week ago",
      avatar: "👨‍💻",
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 4,
      comment:
        "Very comprehensive course. Covers all the important topics in cybersecurity. Highly recommended!",
      date: "2 weeks ago",
      avatar: "👩‍🎓",
    },
  ];

  const instructor = {
    name: "Prof. Alex Smith",
    title: "Cybersecurity Expert & Former NSA Consultant",
    experience: "15+ years",
    students: "50K+",
    courses: 12,
    rating: 4.9,
    bio: "Professor Alex Smith is a renowned cybersecurity expert with over 15 years of experience in the field. He has worked with major corporations and government agencies, including consulting for the NSA. His expertise spans network security, ethical hacking, and digital forensics.",
    avatar: "👨‍🏫",
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return colors.success;
      case "Intermediate":
        return colors.warning;
      case "Advanced":
        return colors.error;
      default:
        return colors.accent;
    }
  };

  const renderLesson = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.lessonCard,
        { backgroundColor: colors.cardBackground },
        item.completed && {
          borderLeftColor: colors.success,
          borderLeftWidth: 4,
        },
      ]}
      onPress={() => {
        if (!item.locked) {
          // Navigate to lesson content
          console.log(`Opening lesson: ${item.title}`);
        }
      }}
      disabled={item.locked}
    >
      <View style={styles.lessonContent}>
        <View style={styles.lessonHeader}>
          <View style={styles.lessonNumber}>
            <Text style={[styles.lessonNumberText, { color: colors.accent }]}>
              {item.id.toString().padStart(2, "0")}
            </Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={[styles.lessonTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text
              style={[styles.lessonDuration, { color: colors.textSecondary }]}
            >
              {item.duration}
            </Text>
          </View>
        </View>
        <View style={styles.lessonStatus}>
          {item.completed ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.success}
            />
          ) : item.locked ? (
            <Ionicons
              name="lock-closed"
              size={24}
              color={colors.textSecondary}
            />
          ) : (
            <Ionicons name="play-circle" size={24} color={colors.accent} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderReview = ({ item }) => (
    <View
      style={[styles.reviewCard, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={styles.avatar}>{item.avatar}</Text>
          <View>
            <Text style={[styles.reviewerName, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>
              {item.date}
            </Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name="star"
              size={14}
              color={index < item.rating ? "#FFD700" : "#333"}
            />
          ))}
        </View>
      </View>
      <Text style={[styles.reviewComment, { color: colors.textSecondary }]}>
        {item.comment}
      </Text>
    </View>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              About This Course
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {courseData.description}
            </Text>

            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: 24 },
              ]}
            >
              What You&apos;ll Learn
            </Text>
            {courseData.learningOutcomes.map((outcome, index) => (
              <View key={index} style={styles.outcomeItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={colors.success}
                />
                <Text
                  style={[styles.outcomeText, { color: colors.textSecondary }]}
                >
                  {outcome}
                </Text>
              </View>
            ))}

            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: 24 },
              ]}
            >
              Requirements
            </Text>
            {courseData.requirements.map((requirement, index) => (
              <View key={index} style={styles.outcomeItem}>
                <Ionicons
                  name="ellipse"
                  size={8}
                  color={colors.accent}
                  style={{ marginTop: 6 }}
                />
                <Text
                  style={[styles.outcomeText, { color: colors.textSecondary }]}
                >
                  {requirement}
                </Text>
              </View>
            ))}
          </View>
        );

      case "lessons":
        return (
          <View style={styles.tabContent}>
            <View style={styles.lessonsHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Course Curriculum
              </Text>
              <Text
                style={[
                  styles.lessonsProgress,
                  { color: colors.textSecondary },
                ]}
              >
                {courseData.completedLessons}/{courseData.totalLessons}{" "}
                completed
              </Text>
            </View>
            <FlatList
              data={lessons}
              renderItem={renderLesson}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );

      case "instructor":
        return (
          <View style={styles.tabContent}>
            <View
              style={[
                styles.instructorCard,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <View style={styles.instructorHeader}>
                <Text style={styles.instructorAvatar}>{instructor.avatar}</Text>
                <View style={styles.instructorInfo}>
                  <Text style={[styles.instructorName, { color: colors.text }]}>
                    {instructor.name}
                  </Text>
                  <Text
                    style={[styles.instructorTitle, { color: colors.accent }]}
                  >
                    {instructor.title}
                  </Text>
                </View>
              </View>

              <View style={styles.instructorStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {instructor.experience}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Experience
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {instructor.students}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Students
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {instructor.courses}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Courses
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {instructor.rating}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Rating
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.instructorBio, { color: colors.textSecondary }]}
              >
                {instructor.bio}
              </Text>
            </View>
          </View>
        );

      case "reviews":
        return (
          <View style={styles.tabContent}>
            <View style={styles.reviewsHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Student Reviews
              </Text>
              <View style={styles.overallRating}>
                <View style={styles.ratingStars}>
                  {[...Array(5)].map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={18}
                      color={
                        index < Math.floor(courseData.rating)
                          ? "#FFD700"
                          : "#333"
                      }
                    />
                  ))}
                </View>
                <Text style={[styles.ratingText, { color: colors.text }]}>
                  {courseData.rating} ({courseData.students} reviews)
                </Text>
              </View>
            </View>
            <FlatList
              data={reviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
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
            Course Details
          </Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Course Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: courseData.image }}
            style={styles.courseImage}
          />
          <View style={styles.heroOverlay}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(courseData.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>{courseData.difficulty}</Text>
            </View>
            {courseData.certificate && (
              <View
                style={[
                  styles.certificateBadge,
                  { backgroundColor: colors.accent },
                ]}
              >
                <Ionicons name="trophy" size={16} color={colors.background} />
                <Text
                  style={[styles.certificateText, { color: colors.background }]}
                >
                  Certificate
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <Text style={[styles.courseTitle, { color: colors.text }]}>
            {courseData.title}
          </Text>
          <Text
            style={[styles.courseInstructor, { color: colors.textSecondary }]}
          >
            By {courseData.instructor}
          </Text>

          <View style={styles.courseMetrics}>
            <View style={styles.metricItem}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={[styles.metricText, { color: colors.text }]}>
                {courseData.rating}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="people" size={16} color={colors.accent} />
              <Text style={[styles.metricText, { color: colors.text }]}>
                {courseData.students}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="time" size={16} color={colors.accent} />
              <Text style={[styles.metricText, { color: colors.text }]}>
                {courseData.duration}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="globe" size={16} color={colors.accent} />
              <Text style={[styles.metricText, { color: colors.text }]}>
                {courseData.language}
              </Text>
            </View>
          </View>

          {/* Progress Bar (for enrolled students) */}
          {isEnrolled && (
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text
                  style={[styles.progressText, { color: colors.textSecondary }]}
                >
                  Progress: {courseData.completedLessons}/
                  {courseData.totalLessons} lessons
                </Text>
                <Text
                  style={[styles.progressPercentage, { color: colors.accent }]}
                >
                  {courseData.progress}%
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${courseData.progress}%`,
                      backgroundColor: colors.accent,
                    },
                  ]}
                />
              </View>
              <Text
                style={[styles.nextLessonText, { color: colors.textSecondary }]}
              >
                Next lesson: {courseData.nextLesson}
              </Text>
            </View>
          )}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          {[
            { id: "overview", label: "Overview" },
            { id: "lessons", label: "Lessons" },
            { id: "instructor", label: "Instructor" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === tab.id && {
                  borderBottomColor: colors.accent,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color:
                      selectedTab === tab.id
                        ? colors.accent
                        : colors.textSecondary,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Continue Learning Button (for enrolled students) */}
      {isEnrolled && (
        <View
          style={[styles.bottomActions, { backgroundColor: colors.background }]}
        >
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: colors.accent }]}
            onPress={() => {
              // Navigate to next lesson
              console.log("Continue learning");
            }}
          >
            <Ionicons name="play" size={20} color={colors.background} />
            <Text
              style={[styles.continueButtonText, { color: colors.background }]}
            >
              Continue Learning
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: 18,
    fontWeight: "bold",
  },
  shareButton: {
    padding: 12,
  },
  heroSection: {
    position: "relative",
    height: 240,
    marginBottom: 20,
  },
  courseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  certificateBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  certificateText: {
    fontSize: 12,
    fontWeight: "600",
  },
  courseInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  courseInstructor: {
    fontSize: 16,
    marginBottom: 16,
  },
  courseMetrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metricText: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#1A1A2E",
    borderRadius: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  nextLessonText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  tabNavigation: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  outcomeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 12,
  },
  outcomeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  lessonsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonsProgress: {
    fontSize: 14,
  },
  lessonCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  lessonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0B3D91",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonNumberText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 12,
  },
  lessonStatus: {
    marginLeft: 12,
  },
  instructorCard: {
    padding: 20,
    borderRadius: 16,
  },
  instructorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  instructorAvatar: {
    fontSize: 40,
    marginRight: 16,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  instructorStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  instructorBio: {
    fontSize: 14,
    lineHeight: 20,
  },
  reviewsHeader: {
    marginBottom: 20,
  },
  overallRating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  ratingStars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34, // Account for safe area
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CybersecurityScreen;
