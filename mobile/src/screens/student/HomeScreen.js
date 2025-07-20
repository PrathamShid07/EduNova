import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Modal,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Enhanced recommended courses with better visibility and Data Science integration
  const recommendedCourses = [
    {
      id: "1",
      title: "Introduction to Astrophysics",
      instructor: "Dr. Neil Jonas",
      duration: "4 weeks",
      price: "$99",
      rating: 4.8,
      students: 1250,
      image:
        "https://images.careerindia.com/img/2017/03/26-astronomycourse-23-1490266933.jpg",
      difficulty: "Beginner",
      screenName: "CourseDetails",
    },
    {
      id: "2",
      title: "Quantum Mechanics Basics",
      instructor: "Prof. John Leap",
      duration: "6 weeks",
      price: "$129",
      rating: 4.9,
      students: 850,
      image:
        "https://online.stanford.edu/sites/default/files/styles/card_header/public/2018-04/electrical-engineering-applied-quantum-mechanics_ee222.jpg?h=66807ab2&itok=KmFrPPKh",
      difficulty: "Intermediate",
      screenName: "CourseDetails",
    },
    {
      id: "3",
      title: "Data Science Mastery",
      instructor: "Prof. Mukesh",
      duration: "5 weeks",
      price: "$89",
      rating: 4.7,
      students: 920,
      image: "https://www.oxfordinstitute.in/img/data-science-course.jpg",
      difficulty: "Beginner",
      screenName: "DataScienceScreen", // Updated to navigate to DataScienceScreen
    },
    {
      id: "4",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Lalita",
      duration: "8 weeks",
      price: "$159",
      rating: 4.6,
      students: 650,
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F762927919%2F1221918410073%2F1%2Foriginal.20240508-193018?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C44%2C1400%2C700&s=5f04da72028e4f9ac261f7619443b6ea",
      difficulty: "Advanced",
      screenName: "DataScienceScreen", // Navigate to Data Science section
    },
  ];

  // Enhanced ongoing courses with specific screen navigation
  const ongoingCourses = [
    {
      id: "5",
      title: "Cyber Security",
      instructor: "Prof. Alex Smith",
      progress: 60,
      totalLessons: 24,
      completedLessons: 14,
      image:
        "https://media.licdn.com/dms/image/v2/D4D12AQF7A0bqGYMj0A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733136423495?e=2147483647&v=beta&t=GnQ8yuIoj6U5PB0Ib9BekWLUGgZoOafcfBMpeJH8ZE8",
      nextLesson: "Data Analytics",
      screenName: "CybersecurityScreen",
    },
    {
      id: "6",
      title: "Data Analysis",
      instructor: "Prof. Jones",
      progress: 25,
      totalLessons: 20,
      completedLessons: 5,
      image:
        "https://www.oxfordinstitute.in/img/all-software-development/data-analayes.jpg",
      nextLesson: "Business Management",
      screenName: "DataScienceScreen", // Navigate to Data Science section
    },
    {
      id: "7",
      title: "Ethical Hacking",
      instructor: "Prof. Mathew",
      progress: 80,
      totalLessons: 16,
      completedLessons: 13,
      image:
        "https://thedigitaladda.com/wp-content/uploads/Ethical-Hacking-Course-Training-in-Jalandhar.png",
      nextLesson: "MERN Stack",
      screenName: "CourseDetails",
    },
  ];

  // Updated categories with Data Science category
  const categories = [
    {
      id: "1",
      name: "Data Science",
      icon: "bar-chart",
      courses: 45,
      color: "#FF6B6B",
      screenName: "DataScienceScreen", // Navigate to Data Science screen
    },
    {
      id: "2",
      name: "Space Tech",
      icon: "rocket",
      courses: 32,
      color: "#4ECDC4",
      screenName: "CategoryCourses",
    },
    {
      id: "3",
      name: "Astronomy",
      icon: "planet",
      courses: 28,
      color: "#45B7D1",
      screenName: "AstronomyScreen",
    },
    {
      id: "4",
      name: "Cybersecurity",
      icon: "shield-checkmark",
      courses: 19,
      color: "#96CEB4",
      screenName: "CybersecurityScreen",
    },
  ];

  // Analysis data
  const analysisData = [
    {
      id: "1",
      title: "Learning Progress",
      value: "75%",
      change: "+12%",
      icon: "trending-up",
      color: "#4CAF50",
      description: "This month",
    },
    {
      id: "2",
      title: "Courses Completed",
      value: "8",
      change: "+3",
      icon: "checkmark-circle",
      color: "#2196F3",
      description: "This quarter",
    },
    {
      id: "3",
      title: "Study Hours",
      value: "124h",
      change: "+28h",
      icon: "time",
      color: "#FF9800",
      description: "This month",
    },
    {
      id: "4",
      title: "Certificates Earned",
      value: "5",
      change: "+2",
      icon: "trophy",
      color: "#9C27B0",
      description: "This quarter",
    },
  ];

  // Updated sidebar navigation options
  const sidebarOptions = [
    { name: "My Courses", screen: "MyCourses", icon: "book" },
    { name: "Data Science", screen: "DataScienceScreen", icon: "bar-chart" },
    { name: "Analytics", screen: "Analytics", icon: "analytics" },
    { name: "Events", screen: "Events", icon: "calendar" },
    { name: "Certificates", screen: "Certificates", icon: "trophy" },
    { name: "Notifications", screen: "Notifications", icon: "notifications" },
    { name: "Settings", screen: "Settings", icon: "settings" },
  ];

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
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#4CAF50";
      case "Intermediate":
        return "#FF9800";
      case "Advanced":
        return "#F44336";
      default:
        return colors.accent;
    }
  };

  const renderRecommendedCourse = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.recommendedCourseCard,
        { backgroundColor: colors.cardBackground },
      ]}
      onPress={() =>
        navigation.navigate(item.screenName || "CourseDetails", {
          courseId: item.id,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.courseImage} />

      {/* Difficulty Badge */}
      <View
        style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(item.difficulty) },
        ]}
      >
        <Text style={styles.difficultyText}>{item.difficulty}</Text>
      </View>

      <View style={styles.courseContent}>
        <Text style={[styles.courseTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text
          style={[styles.courseInstructor, { color: colors.textSecondary }]}
        >
          By {item.instructor}
        </Text>

        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Ionicons name="time" size={14} color={colors.accent} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {item.duration}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={14} color={colors.accent} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {item.students}
            </Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {item.rating}
            </Text>
          </View>
          <Text style={[styles.priceText, { color: colors.accent }]}>
            {item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderOngoingCourse = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.ongoingCourseCard,
        { backgroundColor: colors.cardBackground },
      ]}
      onPress={() => {
        if (item.screenName) {
          navigation.navigate(item.screenName, { courseId: item.id });
        } else {
          navigation.navigate("CourseDetails", { courseId: item.id });
        }
      }}
    >
      <Image source={{ uri: item.image }} style={styles.ongoingCourseImage} />
      <View style={styles.ongoingCourseContent}>
        <Text style={[styles.ongoingCourseTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.ongoingCourseInstructor,
            { color: colors.textSecondary },
          ]}
        >
          By {item.instructor}
        </Text>

        <View style={styles.progressInfo}>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            {item.completedLessons}/{item.totalLessons} lessons
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
                backgroundColor: colors.accent,
              },
            ]}
          />
        </View>

        <Text style={[styles.nextLesson, { color: colors.textSecondary }]}>
          Next: {item.nextLesson}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => {
        // Updated navigation logic for Data Science
        if (item.screenName === "DataScienceScreen") {
          navigation.navigate("DataScienceScreen");
        } else if (item.screenName === "AstronomyScreen") {
          navigation.navigate("AstronomyScreen");
        } else if (item.screenName === "CybersecurityScreen") {
          navigation.navigate("CybersecurityScreen");
        } else {
          navigation.navigate("CategoryCourses", { categoryId: item.id });
        }
      }}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={[styles.categoryName, { color: colors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.coursesCount, { color: colors.textSecondary }]}>
        {item.courses} courses
      </Text>
    </TouchableOpacity>
  );

  const renderAnalysisCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.analysisCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigation.navigate("Analytics")}
    >
      <View style={styles.analysisHeader}>
        <View style={[styles.analysisIcon, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={20} color="#FFFFFF" />
        </View>
        <Text style={[styles.changeText, { color: item.color }]}>
          {item.change}
        </Text>
      </View>
      <Text style={[styles.analysisValue, { color: colors.text }]}>
        {item.value}
      </Text>
      <Text style={[styles.analysisTitle, { color: colors.textSecondary }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderSidebarItem = ({ item }) => (
    <TouchableOpacity
      style={styles.sidebarItem}
      onPress={() => {
        setSidebarVisible(false);
        navigation.navigate(item.screen);
      }}
    >
      <Ionicons name={item.icon} size={24} color={colors.accent} />
      <Text style={[styles.sidebarItemText, { color: colors.text }]}>
        {item.name}
      </Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.menuButton,
            { backgroundColor: colors.cardBackground },
          ]}
          onPress={() => setSidebarVisible(true)}
        >
          <Ionicons name="menu" size={24} color={colors.accent} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            EduSpace
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.accent }]}>
            Learn Beyond Limits
          </Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle" size={32} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Welcome back, Explorer! 🚀
          </Text>
          <Text
            style={[styles.welcomeSubtext, { color: colors.textSecondary }]}
          >
            Continue your journey through the cosmos of knowledge
          </Text>
        </View>

        {/* Quick Analytics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Your Progress
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Analytics")}
              style={styles.viewAllButton}
            >
              <Text style={[styles.viewAllText, { color: colors.accent }]}>
                View All
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.accent}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.analysisScrollContainer}
          >
            {analysisData.map((item) => renderAnalysisCard({ item }))}
          </ScrollView>
        </View>

        {/* Ongoing Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Continue Learning
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyCourses")}
              style={styles.viewAllButton}
            >
              <Text style={[styles.viewAllText, { color: colors.accent }]}>
                View All
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.accent}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={ongoingCourses}
            renderItem={renderOngoingCourse}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Explore Categories
          </Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.categoryRow}
            contentContainerStyle={styles.categoriesGrid}
          />
        </View>

        {/* Recommended Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recommended for You
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllCourses")}
              style={styles.viewAllButton}
            >
              <Text style={[styles.viewAllText, { color: colors.accent }]}>
                View All
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.accent}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedCourses}
            renderItem={renderRecommendedCourse}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Quick Access to Data Science */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.featureCard,
              { backgroundColor: colors.cardBackground },
            ]}
            onPress={() => navigation.navigate("DataScienceScreen")}
          >
            <View style={styles.featureCardContent}>
              <View
                style={[styles.featureIcon, { backgroundColor: "#FF6B6B" }]}
              >
                <Ionicons name="bar-chart" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.featureTextContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Master Data Science
                </Text>
                <Text
                  style={[
                    styles.featureSubtitle,
                    { color: colors.textSecondary },
                  ]}
                >
                  Explore our comprehensive Data Science courses and learning
                  paths
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.accent}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Sidebar Modal */}
      <Modal
        visible={isSidebarVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.sidebar, { backgroundColor: colors.cardBackground }]}
          >
            <View style={styles.sidebarHeader}>
              <Text style={[styles.sidebarTitle, { color: colors.text }]}>
                Navigation
              </Text>
              <TouchableOpacity
                onPress={() => setSidebarVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.accent} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={sidebarOptions}
              renderItem={renderSidebarItem}
              keyExtractor={(item) => item.name}
              style={styles.sidebarList}
            />
          </View>
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={() => setSidebarVisible(false)}
          />
        </View>
      </Modal>
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
  menuButton: {
    borderRadius: 12,
    padding: 12,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Futura-Medium" : "monospace",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Futura" : "monospace",
  },
  profileButton: {
    padding: 4,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
    paddingLeft: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  analysisScrollContainer: {
    paddingRight: 20,
  },
  analysisCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  analysisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  analysisIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  analysisValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  analysisTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  horizontalList: {
    paddingRight: 20,
  },
  ongoingCourseCard: {
    width: 280,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ongoingCourseImage: {
    width: "100%",
    height: 120,
  },
  ongoingCourseContent: {
    padding: 16,
  },
  ongoingCourseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ongoingCourseInstructor: {
    fontSize: 14,
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  nextLesson: {
    fontSize: 12,
    fontStyle: "italic",
  },
  categoriesGrid: {
    paddingRight: 20,
  },
  categoryRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  coursesCount: {
    fontSize: 12,
    textAlign: "center",
  },
  recommendedCourseCard: {
    width: 280,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseImage: {
    width: "100%",
    height: 140,
  },
  difficultyBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 20,
  },
  courseInstructor: {
    fontSize: 14,
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: "row",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  // New styles for the Data Science feature card
  // Add these styles to your existing StyleSheet.create() object in HomeScreen.js

  // Feature Card Styles (add these to your existing styles object)
  featureCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureTextContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Sidebar Modal Styles (add these to your existing styles object)
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    width: width * 0.75,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  sidebarList: {
    flex: 1,
    paddingTop: 20,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  sidebarItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 16,
  },

  // Bottom Padding
  bottomPadding: {
    height: 40,
  },
});

export default HomeScreen;
