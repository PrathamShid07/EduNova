import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MyCoursesScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("ongoing");

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

  // Ongoing courses data
  const ongoingCourses = [
    {
      id: "1",
      title: "Cyber Security Advanced",
      instructor: "Prof. Alex Smith",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      image:
        "https://media.licdn.com/dms/image/v2/D4D12AQF7A0bqGYMj0A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733136423495?e=2147483647&v=beta&t=GnQ8yuIoj6U5PB0Ib9BekWLUGgZoOafcfBMpeJH8ZE8",
      nextLesson: "Network Penetration Testing",
      difficulty: "Advanced",
      enrolledDate: "2024-01-15",
      lastAccessed: "2 hours ago",
    },
    {
      id: "2",
      title: "Data Analysis Fundamentals",
      instructor: "Prof. Sarah Jones",
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      image:
        "https://www.oxfordinstitute.in/img/all-software-development/data-analayes.jpg",
      nextLesson: "Statistical Analysis",
      difficulty: "Intermediate",
      enrolledDate: "2024-02-01",
      lastAccessed: "1 day ago",
    },
    {
      id: "3",
      title: "Introduction to Astrophysics",
      instructor: "Dr. Neil Jonas",
      progress: 30,
      totalLessons: 16,
      completedLessons: 5,
      image:
        "https://images.careerindia.com/img/2017/03/26-astronomycourse-23-1490266933.jpg",
      nextLesson: "Stellar Evolution",
      difficulty: "Beginner",
      enrolledDate: "2024-02-10",
      lastAccessed: "3 days ago",
    },
  ];

  // Completed courses data
  const completedCourses = [
    {
      id: "4",
      title: "Web Development Bootcamp",
      instructor: "Prof. Mike Chen",
      completedDate: "2024-01-20",
      rating: 4.8,
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F762927919%2F1221918410073%2F1%2Foriginal.20240508-193018?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C44%2C1400%2C700&s=5f04da72028e4f9ac261f7619443b6ea",
      certificate: true,
      difficulty: "Intermediate",
      duration: "8 weeks",
    },
    {
      id: "5",
      title: "Python Programming Basics",
      instructor: "Dr. Lisa Wang",
      completedDate: "2023-12-15",
      rating: 4.9,
      image:
        "https://thedigitaladda.com/wp-content/uploads/Ethical-Hacking-Course-Training-in-Jalandhar.png",
      certificate: true,
      difficulty: "Beginner",
      duration: "6 weeks",
    },
  ];

  // Wishlist courses data
  const wishlistCourses = [
    {
      id: "6",
      title: "Machine Learning Advanced",
      instructor: "Prof. Robert Kim",
      price: "$149",
      rating: 4.7,
      students: 2340,
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F762927919%2F1221918410073%2F1%2Foriginal.20240508-193018?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C44%2C1400%2C700&s=5f04da72028e4f9ac261f7619443b6ea",
      difficulty: "Advanced",
      duration: "10 weeks",
    },
    {
      id: "7",
      title: "Quantum Computing Basics",
      instructor: "Dr. Emma Tesla",
      price: "$199",
      rating: 4.6,
      students: 1890,
      image:
        "https://online.stanford.edu/sites/default/files/styles/card_header/public/2018-04/electrical-engineering-applied-quantum-mechanics_ee222.jpg?h=66807ab2&itok=KmFrPPKh",
      difficulty: "Advanced",
      duration: "12 weeks",
    },
  ];

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

  const renderOngoingCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() =>
        navigation.navigate("CourseDetails", { courseId: item.id })
      }
    >
      <View style={styles.courseHeader}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text
            style={[styles.courseTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={[styles.instructorName, { color: colors.textSecondary }]}
          >
            {item.instructor}
          </Text>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty) },
            ]}
          >
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            Progress: {item.completedLessons}/{item.totalLessons} lessons
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

        <View style={styles.courseFooter}>
          <Text
            style={[styles.nextLessonText, { color: colors.textSecondary }]}
          >
            Next: {item.nextLesson}
          </Text>
          <Text
            style={[styles.lastAccessedText, { color: colors.textSecondary }]}
          >
            {item.lastAccessed}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: colors.accent }]}
        onPress={() =>
          navigation.navigate("CourseDetails", { courseId: item.id })
        }
      >
        <Text style={[styles.continueButtonText, { color: colors.background }]}>
          Continue Learning
        </Text>
        <Ionicons name="play" size={16} color={colors.background} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCompletedCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() =>
        navigation.navigate("CourseDetails", { courseId: item.id })
      }
    >
      <View style={styles.courseHeader}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text
            style={[styles.courseTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={[styles.instructorName, { color: colors.textSecondary }]}
          >
            {item.instructor}
          </Text>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty) },
            ]}
          >
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>

      <View style={styles.completedSection}>
        <View style={styles.completedHeader}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {item.rating}
            </Text>
          </View>
          <Text style={[styles.completedDate, { color: colors.success }]}>
            Completed {item.completedDate}
          </Text>
        </View>

        <View style={styles.courseFooter}>
          <Text style={[styles.durationText, { color: colors.textSecondary }]}>
            Duration: {item.duration}
          </Text>
          {item.certificate && (
            <View style={styles.certificateContainer}>
              <Ionicons name="ribbon" size={14} color={colors.accent} />
              <Text style={[styles.certificateText, { color: colors.accent }]}>
                Certificate Available
              </Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.reviewButton, { backgroundColor: colors.primary }]}
        onPress={() =>
          navigation.navigate("CourseDetails", { courseId: item.id })
        }
      >
        <Text style={[styles.reviewButtonText, { color: colors.text }]}>
          Review Course
        </Text>
        <Ionicons name="refresh" size={16} color={colors.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderWishlistCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() =>
        navigation.navigate("CourseDetails", { courseId: item.id })
      }
    >
      <View style={styles.courseHeader}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text
            style={[styles.courseTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={[styles.instructorName, { color: colors.textSecondary }]}
          >
            {item.instructor}
          </Text>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty) },
            ]}
          >
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.removeWishlistButton}>
          <Ionicons name="heart" size={20} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.wishlistSection}>
        <View style={styles.courseMetrics}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {item.rating}
            </Text>
            <Text
              style={[styles.studentsText, { color: colors.textSecondary }]}
            >
              ({item.students})
            </Text>
          </View>
          <Text style={[styles.durationText, { color: colors.textSecondary }]}>
            {item.duration}
          </Text>
        </View>
        <Text style={[styles.priceText, { color: colors.success }]}>
          {item.price}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.enrollButton, { backgroundColor: colors.accent }]}
        onPress={() =>
          navigation.navigate("CourseDetails", { courseId: item.id })
        }
      >
        <Text style={[styles.enrollButtonText, { color: colors.background }]}>
          Enroll Now
        </Text>
        <Ionicons name="add-circle" size={16} color={colors.background} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTabButton = (tabKey, title, count) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        {
          backgroundColor:
            selectedTab === tabKey ? colors.accent : colors.cardBackground,
          borderColor: selectedTab === tabKey ? colors.accent : "transparent",
        },
      ]}
      onPress={() => setSelectedTab(tabKey)}
    >
      <Text
        style={[
          styles.tabButtonText,
          { color: selectedTab === tabKey ? colors.background : colors.text },
        ]}
      >
        {title} ({count})
      </Text>
    </TouchableOpacity>
  );

  const getCurrentData = () => {
    switch (selectedTab) {
      case "ongoing":
        return ongoingCourses;
      case "completed":
        return completedCourses;
      case "wishlist":
        return wishlistCourses;
      default:
        return ongoingCourses;
    }
  };

  const getCurrentRenderItem = () => {
    switch (selectedTab) {
      case "ongoing":
        return renderOngoingCourse;
      case "completed":
        return renderCompletedCourse;
      case "wishlist":
        return renderWishlistCourse;
      default:
        return renderOngoingCourse;
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
            My Courses
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            Your Learning Journey
          </Text>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton("ongoing", "Ongoing", ongoingCourses.length)}
        {renderTabButton("completed", "Completed", completedCourses.length)}
        {renderTabButton("wishlist", "Wishlist", wishlistCourses.length)}
      </View>

      {/* Content */}
      <FlatList
        data={getCurrentData()}
        renderItem={getCurrentRenderItem()}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="school-outline"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No courses found
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              {selectedTab === "ongoing"
                ? "Start your learning journey by enrolling in courses"
                : selectedTab === "completed"
                ? "Complete some courses to see them here"
                : "Add courses to your wishlist to see them here"}
            </Text>
          </View>
        }
      />
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
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  searchButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  courseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  courseHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 22,
  },
  instructorName: {
    fontSize: 14,
    marginBottom: 8,
  },
  difficultyBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  removeWishlistButton: {
    padding: 8,
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
  progressText: {
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
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextLessonText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  lastAccessedText: {
    fontSize: 12,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  completedSection: {
    marginBottom: 16,
  },
  completedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  studentsText: {
    fontSize: 12,
    marginLeft: 4,
  },
  completedDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  durationText: {
    fontSize: 12,
  },
  certificateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  certificateText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  wishlistSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  courseMetrics: {
    flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  enrollButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  enrollButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 40,
  },
});

export default MyCoursesScreen;
