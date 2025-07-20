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
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const DataScienceScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("courses");

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

  // Course data specific to Data Science
  const dataScienceCourses = [
    {
      id: "ds1",
      title: "Python for Data Science",
      instructor: "Dr. Sarah Chen",
      duration: "6 weeks",
      price: "$89",
      rating: 4.8,
      students: 2150,
      image: "https://www.oxfordinstitute.in/img/data-science-course.jpg",
      difficulty: "Beginner",
      description:
        "Learn Python programming fundamentals for data analysis and visualization.",
      topics: ["Python Basics", "Pandas", "NumPy", "Data Visualization"],
      enrolled: false,
    },
    {
      id: "ds2",
      title: "Machine Learning with Python",
      instructor: "Prof. Michael Rodriguez",
      duration: "8 weeks",
      price: "$129",
      rating: 4.9,
      students: 1890,
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F762927919%2F1221918410073%2F1%2Foriginal.20240508-193018?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C44%2C1400%2C700&s=5f04da72028e4f9ac261f7619443b6ea",
      difficulty: "Intermediate",
      description:
        "Master machine learning algorithms and implement them in real-world projects.",
      topics: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Neural Networks",
        "Model Evaluation",
      ],
      enrolled: true,
      progress: 45,
    },
    {
      id: "ds3",
      title: "Data Visualization Mastery",
      instructor: "Dr. Emily Watson",
      duration: "4 weeks",
      price: "$69",
      rating: 4.7,
      students: 1250,
      image:
        "https://www.oxfordinstitute.in/img/all-software-development/data-analayes.jpg",
      difficulty: "Beginner",
      description:
        "Create stunning visualizations and tell compelling stories with data.",
      topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboard Creation"],
      enrolled: false,
    },
    {
      id: "ds4",
      title: "Deep Learning Fundamentals",
      instructor: "Prof. Alex Kim",
      duration: "10 weeks",
      price: "$179",
      rating: 4.6,
      students: 950,
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F762927919%2F1221918410073%2F1%2Foriginal.20240508-193018?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C44%2C1400%2C700&s=5f04da72028e4f9ac261f7619443b6ea",
      difficulty: "Advanced",
      description:
        "Dive deep into neural networks, CNNs, RNNs, and cutting-edge AI techniques.",
      topics: ["Neural Networks", "CNN", "RNN", "Transfer Learning"],
      enrolled: false,
    },
    {
      id: "ds5",
      title: "Big Data Analytics",
      instructor: "Dr. James Wilson",
      duration: "7 weeks",
      price: "$149",
      rating: 4.5,
      students: 780,
      image: "https://www.oxfordinstitute.in/img/data-science-course.jpg",
      difficulty: "Advanced",
      description:
        "Handle massive datasets using distributed computing and cloud technologies.",
      topics: [
        "Apache Spark",
        "Hadoop",
        "Cloud Computing",
        "Distributed Systems",
      ],
      enrolled: true,
      progress: 20,
    },
    {
      id: "ds6",
      title: "Statistics for Data Science",
      instructor: "Prof. Lisa Anderson",
      duration: "5 weeks",
      price: "$79",
      rating: 4.8,
      students: 1680,
      image:
        "https://www.oxfordinstitute.in/img/all-software-development/data-analayes.jpg",
      difficulty: "Intermediate",
      description:
        "Master statistical concepts essential for data science and machine learning.",
      topics: [
        "Descriptive Statistics",
        "Inferential Statistics",
        "Hypothesis Testing",
        "Probability",
      ],
      enrolled: false,
    },
  ];

  // Learning paths
  const learningPaths = [
    {
      id: "path1",
      title: "Data Science Beginner Path",
      courses: 4,
      duration: "16 weeks",
      description: "Start your data science journey from scratch",
      color: "#4CAF50",
      icon: "trending-up",
    },
    {
      id: "path2",
      title: "Machine Learning Expert Path",
      courses: 6,
      duration: "24 weeks",
      description: "Become an ML expert with advanced techniques",
      color: "#2196F3",
      icon: "hardware-chip",
    },
    {
      id: "path3",
      title: "Big Data Specialist Path",
      courses: 5,
      duration: "20 weeks",
      description: "Master big data technologies and tools",
      color: "#FF9800",
      icon: "server",
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

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() =>
        navigation.navigate("CourseDetails", { courseId: item.id })
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

      {/* Enrollment Status */}
      {item.enrolled && (
        <View
          style={[styles.enrolledBadge, { backgroundColor: colors.accent }]}
        >
          <Text style={styles.enrolledText}>Enrolled</Text>
        </View>
      )}

      <View style={styles.courseContent}>
        <Text style={[styles.courseTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text
          style={[styles.courseInstructor, { color: colors.textSecondary }]}
        >
          By {item.instructor}
        </Text>
        <Text
          style={[styles.courseDescription, { color: colors.textSecondary }]}
        >
          {item.description}
        </Text>

        {/* Topics */}
        <View style={styles.topicsContainer}>
          {item.topics.slice(0, 2).map((topic, index) => (
            <View
              key={index}
              style={[styles.topicTag, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
          {item.topics.length > 2 && (
            <Text style={[styles.moreTopics, { color: colors.textSecondary }]}>
              +{item.topics.length - 2} more
            </Text>
          )}
        </View>

        {/* Progress bar for enrolled courses */}
        {item.enrolled && item.progress && (
          <View style={styles.progressContainer}>
            <Text
              style={[styles.progressText, { color: colors.textSecondary }]}
            >
              Progress: {item.progress}%
            </Text>
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
          </View>
        )}

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

        <View style={styles.courseFooter}>
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

  const renderLearningPath = ({ item }) => (
    <TouchableOpacity
      style={[styles.pathCard, { backgroundColor: colors.cardBackground }]}
    >
      <View style={[styles.pathIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.pathContent}>
        <Text style={[styles.pathTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.pathDescription, { color: colors.textSecondary }]}>
          {item.description}
        </Text>
        <View style={styles.pathStats}>
          <Text style={[styles.pathStat, { color: colors.accent }]}>
            {item.courses} courses • {item.duration}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const tabs = [
    { id: "courses", title: "Courses", icon: "library" },
    { id: "paths", title: "Learning Paths", icon: "map" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.accent} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Data Science
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.accent }]}>
            Master the Art of Data
          </Text>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View
          style={[styles.statCard, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.statNumber, { color: colors.accent }]}>
            {dataScienceCourses.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Courses Available
          </Text>
        </View>
        <View
          style={[styles.statCard, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {dataScienceCourses.filter((course) => course.enrolled).length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Enrolled
          </Text>
        </View>
        <View
          style={[styles.statCard, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.statNumber, { color: colors.warning }]}>
            4.7★
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Avg Rating
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && { backgroundColor: colors.accent },
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={
                selectedTab === tab.id
                  ? colors.background
                  : colors.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === tab.id
                      ? colors.background
                      : colors.textSecondary,
                },
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === "courses" && (
          <FlatList
            data={dataScienceCourses}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.coursesList}
          />
        )}

        {selectedTab === "paths" && (
          <View style={styles.pathsContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Structured Learning Paths
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
            >
              Follow curated paths to master data science step by step
            </Text>
            <FlatList
              data={learningPaths}
              renderItem={renderLearningPath}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.pathsList}
            />
          </View>
        )}

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
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
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
  searchButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: "#1A1A2E",
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  coursesList: {
    paddingHorizontal: 20,
  },
  courseCard: {
    borderRadius: 16,
    marginBottom: 20,
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
    height: 160,
  },
  difficultyBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  difficultyText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  enrolledBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  enrolledText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 22,
  },
  courseInstructor: {
    fontSize: 14,
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
  },
  topicTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  topicText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  moreTopics: {
    fontSize: 12,
    fontStyle: "italic",
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressText: {
    fontSize: 12,
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
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
  courseFooter: {
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
    fontSize: 18,
    fontWeight: "bold",
  },
  pathsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  pathsList: {
    paddingBottom: 20,
  },
  pathCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pathIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  pathContent: {
    flex: 1,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  pathDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  pathStats: {
    marginTop: 4,
  },
  pathStat: {
    fontSize: 12,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 20,
  },
});

export default DataScienceScreen;
