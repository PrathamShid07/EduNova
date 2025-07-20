import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AnalyticsScreen = () => {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

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
    purple: "#9C27B0",
    blue: "#2196F3",
  };

  const periods = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "quarter", label: "Quarter" },
    { id: "year", label: "Year" },
  ];

  // Dynamic analytics data based on selected period
  const getAnalyticsData = (period) => {
    const dataMap = {
      week: [
        {
          id: "1",
          title: "Learning Progress",
          value: "45%",
          change: "+8%",
          icon: "trending-up",
          color: colors.success,
          description: "This week",
          trend: "up",
        },
        {
          id: "2",
          title: "Courses Completed",
          value: "2",
          change: "+1",
          icon: "checkmark-circle",
          color: colors.blue,
          description: "This week",
          trend: "up",
        },
        {
          id: "3",
          title: "Study Hours",
          value: "32h",
          change: "+5h",
          icon: "time",
          color: colors.warning,
          description: "This week",
          trend: "up",
        },
        {
          id: "4",
          title: "Certificates Earned",
          value: "1",
          change: "+1",
          icon: "trophy",
          color: colors.purple,
          description: "This week",
          trend: "up",
        },
      ],
      month: [
        {
          id: "1",
          title: "Learning Progress",
          value: "75%",
          change: "+12%",
          icon: "trending-up",
          color: colors.success,
          description: "This month",
          trend: "up",
        },
        {
          id: "2",
          title: "Courses Completed",
          value: "8",
          change: "+3",
          icon: "checkmark-circle",
          color: colors.blue,
          description: "This month",
          trend: "up",
        },
        {
          id: "3",
          title: "Study Hours",
          value: "124h",
          change: "+28h",
          icon: "time",
          color: colors.warning,
          description: "This month",
          trend: "up",
        },
        {
          id: "4",
          title: "Certificates Earned",
          value: "5",
          change: "+2",
          icon: "trophy",
          color: colors.purple,
          description: "This month",
          trend: "up",
        },
      ],
      quarter: [
        {
          id: "1",
          title: "Learning Progress",
          value: "92%",
          change: "+25%",
          icon: "trending-up",
          color: colors.success,
          description: "This quarter",
          trend: "up",
        },
        {
          id: "2",
          title: "Courses Completed",
          value: "24",
          change: "+12",
          icon: "checkmark-circle",
          color: colors.blue,
          description: "This quarter",
          trend: "up",
        },
        {
          id: "3",
          title: "Study Hours",
          value: "380h",
          change: "+95h",
          icon: "time",
          color: colors.warning,
          description: "This quarter",
          trend: "up",
        },
        {
          id: "4",
          title: "Certificates Earned",
          value: "15",
          change: "+8",
          icon: "trophy",
          color: colors.purple,
          description: "This quarter",
          trend: "up",
        },
      ],
      year: [
        {
          id: "1",
          title: "Learning Progress",
          value: "88%",
          change: "+45%",
          icon: "trending-up",
          color: colors.success,
          description: "This year",
          trend: "up",
        },
        {
          id: "2",
          title: "Courses Completed",
          value: "96",
          change: "+48",
          icon: "checkmark-circle",
          color: colors.blue,
          description: "This year",
          trend: "up",
        },
        {
          id: "3",
          title: "Study Hours",
          value: "1,520h",
          change: "+380h",
          icon: "time",
          color: colors.warning,
          description: "This year",
          trend: "up",
        },
        {
          id: "4",
          title: "Certificates Earned",
          value: "60",
          change: "+32",
          icon: "trophy",
          color: colors.purple,
          description: "This year",
          trend: "up",
        },
      ],
    };
    return dataMap[period] || dataMap.month;
  };

  // Dynamic course performance based on period
  const getCoursePerformance = (period) => {
    const dataMap = {
      week: [
        {
          id: "1",
          name: "Cyber Security",
          progress: 45,
          timeSpent: "8h",
          grade: "B+",
          color: colors.warning,
        },
        {
          id: "2",
          name: "Data Analysis",
          progress: 30,
          timeSpent: "6h",
          grade: "B",
          color: colors.blue,
        },
      ],
      month: [
        {
          id: "1",
          name: "Cyber Security",
          progress: 60,
          timeSpent: "24h",
          grade: "A-",
          color: colors.success,
        },
        {
          id: "2",
          name: "Data Analysis",
          progress: 25,
          timeSpent: "12h",
          grade: "B+",
          color: colors.warning,
        },
        {
          id: "3",
          name: "Ethical Hacking",
          progress: 80,
          timeSpent: "32h",
          grade: "A",
          color: colors.success,
        },
        {
          id: "4",
          name: "Machine Learning",
          progress: 45,
          timeSpent: "18h",
          grade: "B",
          color: colors.blue,
        },
      ],
      quarter: [
        {
          id: "1",
          name: "Cyber Security",
          progress: 100,
          timeSpent: "72h",
          grade: "A",
          color: colors.success,
        },
        {
          id: "2",
          name: "Data Analysis",
          progress: 85,
          timeSpent: "54h",
          grade: "A-",
          color: colors.success,
        },
        {
          id: "3",
          name: "Ethical Hacking",
          progress: 100,
          timeSpent: "68h",
          grade: "A+",
          color: colors.success,
        },
        {
          id: "4",
          name: "Machine Learning",
          progress: 75,
          timeSpent: "48h",
          grade: "A-",
          color: colors.success,
        },
        {
          id: "5",
          name: "Cloud Computing",
          progress: 60,
          timeSpent: "36h",
          grade: "B+",
          color: colors.warning,
        },
      ],
      year: [
        {
          id: "1",
          name: "Cyber Security",
          progress: 100,
          timeSpent: "288h",
          grade: "A+",
          color: colors.success,
        },
        {
          id: "2",
          name: "Data Analysis",
          progress: 100,
          timeSpent: "216h",
          grade: "A",
          color: colors.success,
        },
        {
          id: "3",
          name: "Ethical Hacking",
          progress: 100,
          timeSpent: "272h",
          grade: "A+",
          color: colors.success,
        },
        {
          id: "4",
          name: "Machine Learning",
          progress: 100,
          timeSpent: "192h",
          grade: "A",
          color: colors.success,
        },
        {
          id: "5",
          name: "Cloud Computing",
          progress: 90,
          timeSpent: "144h",
          grade: "A-",
          color: colors.success,
        },
        {
          id: "6",
          name: "DevOps",
          progress: 75,
          timeSpent: "120h",
          grade: "B+",
          color: colors.warning,
        },
      ],
    };
    return dataMap[period] || dataMap.month;
  };

  // Learning streaks and habits (can also be dynamic if needed)
  const learningHabits = [
    {
      id: "1",
      title: "Current Streak",
      value: "12 days",
      icon: "flame",
      color: colors.secondary,
    },
    {
      id: "2",
      title: "Best Streak",
      value: "28 days",
      icon: "trophy",
      color: colors.warning,
    },
    {
      id: "3",
      title: "Avg. Session",
      value: "45 min",
      icon: "time",
      color: colors.accent,
    },
    {
      id: "4",
      title: "Weekly Goal",
      value: "5 of 7 days",
      icon: "target",
      color: colors.success,
    },
  ];

  // Skills progress
  const skillsProgress = [
    { skill: "Programming", level: 85, color: colors.success },
    { skill: "Data Analysis", level: 70, color: colors.blue },
    { skill: "Cybersecurity", level: 60, color: colors.warning },
    { skill: "Machine Learning", level: 45, color: colors.purple },
    { skill: "Astronomy", level: 90, color: colors.accent },
  ];

  // Study time by category (for the week)
  const studyTimeData = [
    { category: "Astrophysics", hours: 15, color: colors.accent },
    { category: "Programming", hours: 12, color: colors.success },
    { category: "Data Science", hours: 8, color: colors.blue },
    { category: "Cybersecurity", hours: 6, color: colors.warning },
    { category: "Others", hours: 4, color: colors.purple },
  ];

  const renderMainAnalyticCard = ({ item }) => (
    <View
      style={[
        styles.mainAnalyticCard,
        { backgroundColor: colors.cardBackground },
      ]}
    >
      <View style={styles.analyticCardHeader}>
        <View style={[styles.analyticIcon, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.trendContainer}>
          <Ionicons
            name={item.trend === "up" ? "trending-up" : "trending-down"}
            size={16}
            color={item.trend === "up" ? colors.success : colors.error}
          />
          <Text style={[styles.changeText, { color: item.color }]}>
            {item.change}
          </Text>
        </View>
      </View>
      <Text style={[styles.analyticValue, { color: colors.text }]}>
        {item.value}
      </Text>
      <Text style={[styles.analyticTitle, { color: colors.textSecondary }]}>
        {item.title}
      </Text>
      <Text
        style={[styles.analyticDescription, { color: colors.textSecondary }]}
      >
        {item.description}
      </Text>
    </View>
  );

  const renderCoursePerformance = ({ item }) => (
    <View
      style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.courseHeader}>
        <Text style={[styles.courseName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.gradeText, { color: item.color }]}>
          {item.grade}
        </Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            Progress: {item.progress}%
          </Text>
          <Text style={[styles.timeSpentText, { color: colors.textSecondary }]}>
            {item.timeSpent} spent
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${item.progress}%`,
                backgroundColor: item.color,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );

  const renderLearningHabit = ({ item }) => (
    <View
      style={[styles.habitCard, { backgroundColor: colors.cardBackground }]}
    >
      <View style={[styles.habitIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={20} color="#FFFFFF" />
      </View>
      <Text style={[styles.habitValue, { color: colors.text }]}>
        {item.value}
      </Text>
      <Text style={[styles.habitTitle, { color: colors.textSecondary }]}>
        {item.title}
      </Text>
    </View>
  );

  const renderSkillProgress = ({ item }) => (
    <View style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <Text style={[styles.skillName, { color: colors.text }]}>
          {item.skill}
        </Text>
        <Text style={[styles.skillLevel, { color: item.color }]}>
          {item.level}%
        </Text>
      </View>
      <View style={styles.skillProgressContainer}>
        <View
          style={[
            styles.skillProgressBar,
            {
              width: `${item.level}%`,
              backgroundColor: item.color,
            },
          ]}
        />
      </View>
    </View>
  );

  const renderStudyTimeItem = ({ item }) => (
    <View style={styles.studyTimeItem}>
      <View style={styles.studyTimeInfo}>
        <View
          style={[styles.colorIndicator, { backgroundColor: item.color }]}
        />
        <Text style={[styles.categoryName, { color: colors.text }]}>
          {item.category}
        </Text>
      </View>
      <Text style={[styles.hoursText, { color: colors.textSecondary }]}>
        {item.hours}h
      </Text>
    </View>
  );

  const renderPeriodButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        {
          backgroundColor:
            selectedPeriod === item.id ? colors.accent : colors.cardBackground,
        },
      ]}
      onPress={() => setSelectedPeriod(item.id)}
    >
      <Text
        style={[
          styles.periodButtonText,
          {
            color: selectedPeriod === item.id ? colors.background : colors.text,
          },
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Single Header */}
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
            Analytics
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.accent }]}>
            Your Learning Journey
          </Text>
        </View>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => {
            // Handle export functionality
          }}
        >
          <Ionicons name="download-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Period Selection */}
        <View style={styles.periodSection}>
          <FlatList
            data={periods}
            renderItem={renderPeriodButton}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodList}
          />
        </View>

        {/* Main Analytics Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Overview
          </Text>
          <View style={styles.analyticsGrid}>
            {getAnalyticsData(selectedPeriod).map((item, index) => (
              <View key={item.id} style={styles.gridItem}>
                {renderMainAnalyticCard({ item })}
              </View>
            ))}
          </View>
        </View>

        {/* Learning Habits */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Learning Habits
          </Text>
          <FlatList
            data={learningHabits}
            renderItem={renderLearningHabit}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.habitsList}
          />
        </View>

        {/* Course Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Course Performance
          </Text>
          <FlatList
            data={getCoursePerformance(selectedPeriod)}
            renderItem={renderCoursePerformance}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Skills Progress */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Skills Progress
          </Text>
          <View
            style={[
              styles.skillsContainer,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <FlatList
              data={skillsProgress}
              renderItem={renderSkillProgress}
              keyExtractor={(item) => item.skill}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Study Time Breakdown */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Study Time This Week
          </Text>
          <View
            style={[
              styles.studyTimeContainer,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <FlatList
              data={studyTimeData}
              renderItem={renderStudyTimeItem}
              keyExtractor={(item) => item.category}
              scrollEnabled={false}
            />
            <View style={styles.totalTime}>
              <Text style={[styles.totalTimeText, { color: colors.accent }]}>
                Total: 45h
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Padding */}
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
  exportButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  periodSection: {
    marginBottom: 20,
  },
  periodList: {
    paddingHorizontal: 20,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  analyticsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: (width - 60) / 2,
    marginBottom: 15,
  },
  mainAnalyticCard: {
    padding: 16,
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
  analyticCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  analyticIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  analyticValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  analyticTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  analyticDescription: {
    fontSize: 12,
  },
  habitsList: {
    paddingLeft: 0,
  },
  habitCard: {
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginRight: 15,
    width: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  habitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  habitValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  habitTitle: {
    fontSize: 12,
    textAlign: "center",
  },
  courseCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
  },
  gradeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressSection: {
    // Empty for now
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
  },
  timeSpentText: {
    fontSize: 12,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  skillsContainer: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skillItem: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: "500",
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  skillProgressContainer: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 4,
  },
  skillProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  studyTimeContainer: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  studyTimeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  studyTimeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
  },
  hoursText: {
    fontSize: 14,
    fontWeight: "600",
  },
  totalTime: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: "center",
  },
  totalTimeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomPadding: {
    height: 20,
  },
});

export default AnalyticsScreen;
