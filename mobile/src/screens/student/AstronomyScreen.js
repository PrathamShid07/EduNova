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
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AstronomyScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

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

  // Astronomy courses data
  const astronomyCourses = [
    {
      id: "ast_1",
      title: "Introduction to Solar System",
      instructor: "Dr. Sarah Wilson",
      duration: "6 weeks",
      price: "$89",
      rating: 4.8,
      students: 2340,
      image:
        "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
      difficulty: "Beginner",
      description:
        "Explore the planets, moons, and other celestial bodies in our solar system.",
      lessons: 24,
      certificate: true,
      tags: ["Planets", "Solar System", "Space"],
    },
    {
      id: "ast_2",
      title: "Deep Space Exploration",
      instructor: "Prof. Michael Chen",
      duration: "8 weeks",
      price: "$129",
      rating: 4.9,
      students: 1890,
      image:
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=500",
      difficulty: "Intermediate",
      description:
        "Journey beyond our solar system to explore distant galaxies and nebulae.",
      lessons: 32,
      certificate: true,
      tags: ["Galaxies", "Deep Space", "Exploration"],
    },
    {
      id: "ast_3",
      title: "Stellar Evolution and Lifecycle",
      instructor: "Dr. Emily Rodriguez",
      duration: "5 weeks",
      price: "$99",
      rating: 4.7,
      students: 1560,
      image:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500",
      difficulty: "Intermediate",
      description:
        "Understanding how stars are born, live, and die in the universe.",
      lessons: 28,
      certificate: true,
      tags: ["Stars", "Evolution", "Lifecycle"],
    },
    {
      id: "ast_4",
      title: "Black Holes and Exotic Objects",
      instructor: "Prof. David Kumar",
      duration: "7 weeks",
      price: "$149",
      rating: 4.9,
      students: 1230,
      image:
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=500",
      difficulty: "Advanced",
      description:
        "Dive deep into the mysteries of black holes and other exotic cosmic phenomena.",
      lessons: 35,
      certificate: true,
      tags: ["Black Holes", "Exotic Objects", "Physics"],
    },
    {
      id: "ast_5",
      title: "Exoplanet Discovery",
      instructor: "Dr. Lisa Thompson",
      duration: "4 weeks",
      price: "$79",
      rating: 4.6,
      students: 980,
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500",
      difficulty: "Beginner",
      description:
        "Learn about planets orbiting other stars and methods to detect them.",
      lessons: 20,
      certificate: true,
      tags: ["Exoplanets", "Discovery", "Research"],
    },
    {
      id: "ast_6",
      title: "Astronomy Observation Techniques",
      instructor: "Prof. James Parker",
      duration: "6 weeks",
      price: "$119",
      rating: 4.8,
      students: 1450,
      image:
        "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=500",
      difficulty: "Intermediate",
      description:
        "Master the art of astronomical observation using telescopes and modern tools.",
      lessons: 30,
      certificate: true,
      tags: ["Observation", "Telescopes", "Techniques"],
    },
    {
      id: "ast_7",
      title: "Cosmology and the Big Bang",
      instructor: "Dr. Robert Anderson",
      duration: "9 weeks",
      price: "$169",
      rating: 4.9,
      students: 890,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      difficulty: "Advanced",
      description:
        "Explore the origin, evolution, and ultimate fate of the universe.",
      lessons: 40,
      certificate: true,
      tags: ["Cosmology", "Big Bang", "Universe"],
    },
    {
      id: "ast_8",
      title: "Space Weather and Solar Activity",
      instructor: "Dr. Maria Gonzalez",
      duration: "5 weeks",
      price: "$95",
      rating: 4.7,
      students: 1120,
      image:
        "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=500",
      difficulty: "Intermediate",
      description:
        "Understanding solar flares, cosmic rays, and their effects on Earth.",
      lessons: 26,
      certificate: true,
      tags: ["Space Weather", "Solar Activity", "Earth Effects"],
    },
  ];

  const filterOptions = ["All", "Beginner", "Intermediate", "Advanced"];

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

  const filteredCourses = astronomyCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "All" || course.difficulty === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleCoursePress = (course) => {
    // Navigate to MyCourses screen or create a CourseDetail screen in your navigator
    // For now, navigating to MyCourses as a placeholder
    navigation.navigate("MyCourses", { selectedCourse: course });
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => handleCoursePress(item)}
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

      {/* Certificate Badge */}
      {item.certificate && (
        <View
          style={[styles.certificateBadge, { backgroundColor: colors.accent }]}
        >
          <Ionicons name="trophy" size={12} color="#FFFFFF" />
        </View>
      )}

      <View style={styles.courseContent}>
        <Text
          style={[styles.courseTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.courseInstructor, { color: colors.textSecondary }]}
        >
          By {item.instructor}
        </Text>
        <Text
          style={[styles.courseDescription, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        {/* Course Stats */}
        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Ionicons name="time" size={14} color={colors.accent} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {item.duration}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="book" size={14} color={colors.accent} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {item.lessons} lessons
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={14} color={colors.accent} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {item.students}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 2).map((tag, index) => (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.tagText, { color: colors.accent }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>

        {/* Rating and Price */}
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

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        {
          backgroundColor:
            selectedFilter === filter ? colors.accent : colors.cardBackground,
          borderColor: colors.accent,
        },
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          {
            color:
              selectedFilter === filter ? colors.background : colors.accent,
          },
        ]}
      >
        {filter}
      </Text>
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
            styles.backButton,
            { backgroundColor: colors.cardBackground },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.accent} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerTitleContainer}>
            <View style={[styles.categoryIcon, { backgroundColor: "#45B7D1" }]}>
              <Ionicons name="planet" size={20} color="#FFFFFF" />
            </View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Astronomy
            </Text>
          </View>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            {astronomyCourses.length} courses available
          </Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            /* Handle favorite */
          }}
        >
          <Ionicons name="heart-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[styles.searchBar, { backgroundColor: colors.cardBackground }]}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search astronomy courses..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContainer}
        >
          {filterOptions.map(renderFilterButton)}
        </ScrollView>
      </View>

      {/* Course List */}
      <FlatList
        data={filteredCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.coursesList}
        columnWrapperStyle={
          filteredCourses.length > 1 ? styles.courseRow : null
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No courses found matching your search
            </Text>
          </View>
        )}
      />

      {/* Course Summary */}
      <View
        style={[
          styles.summaryContainer,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.accent }]}>
            {filteredCourses.length}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Courses
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.accent }]}>
            {filteredCourses
              .reduce((total, course) => total + course.students, 0)
              .toLocaleString()}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Students
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.accent }]}>
            4.8
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Avg Rating
          </Text>
        </View>
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
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  favoriteButton: {
    padding: 12,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersScrollContainer: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 12,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  coursesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  courseRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  courseCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  courseImage: {
    width: "100%",
    height: 120,
  },
  difficultyBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  certificateBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 12,
  },
  courseContent: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 18,
    minHeight: 36,
  },
  courseInstructor: {
    fontSize: 12,
    marginBottom: 6,
  },
  courseDescription: {
    fontSize: 11,
    marginBottom: 12,
    lineHeight: 14,
    minHeight: 28,
  },
  courseStats: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 4,
  },
  statText: {
    fontSize: 10,
    marginLeft: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 4,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 9,
    fontWeight: "500",
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
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  summaryContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#333",
    marginHorizontal: 16,
  },
});

export default AstronomyScreen;
