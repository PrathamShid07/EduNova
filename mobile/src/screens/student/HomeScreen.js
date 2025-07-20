import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Enhanced recommended courses with better visibility
  const recommendedCourses = [
    {
      id: '1',
      title: 'Introduction to Astrophysics',
      instructor: 'Dr. Neil Jonas',
      duration: '4 weeks',
      price: '$99',
      rating: 4.8,
      students: 1250,
      image: 'https://images.careerindia.com/img/2017/03/26-astronomycourse-23-1490266933.jpg',
      difficulty: 'Beginner',
    },
    {
      id: '2',
      title: 'Quantum Mechanics Basics',
      instructor: 'Prof. John Leap',
      duration: '6 weeks',
      price: '$129',
      rating: 4.9,
      students: 850,
      image: 'https://online.stanford.edu/sites/default/files/styles/card_header/public/2018-04/electrical-engineering-applied-quantum-mechanics_ee222.jpg?h=66807ab2&itok=KmFrPPKh',
      difficulty: 'Intermediate',
    },
    {
      id: '3',
      title: 'Data Science',
      instructor: 'Prof. Mukesh',
      duration: '5 weeks',
      price: '$89',
      rating: 4.7,
      students: 920,
      image: 'https://www.oxfordinstitute.in/img/data-science-course.jpg',
      difficulty: 'Beginner',
    },
    {
      id: '4',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Lalita',
      duration: '8 weeks',
      price: '$159',
      rating: 4.6,
      students: 650,
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F762927919%2F1221918410073%2F1%2Foriginal.20240508-193018?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C44%2C1400%2C700&s=5f04da72028e4f9ac261f7619443b6ea',
      difficulty: 'Advanced',
    },
  ];

  // Enhanced ongoing courses
  const ongoingCourses = [
    {
      id: '5',
      title: 'Cyber Security',
      instructor: 'Prof. Alex Smith',
      progress: 60,
      totalLessons: 24,
      completedLessons: 14,
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQF7A0bqGYMj0A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733136423495?e=2147483647&v=beta&t=GnQ8yuIoj6U5PB0Ib9BekWLUGgZoOafcfBMpeJH8ZE8',
      nextLesson: 'Data Analytics',
    },
    {
      id: '6',
      title: 'Data Analysis',
      instructor: 'Prof. Jones',
      progress: 25,
      totalLessons: 20,
      completedLessons: 5,
      image: 'https://www.oxfordinstitute.in/img/all-software-development/data-analayes.jpg',
      nextLesson: 'Business Management',
    },
    {
      id: '7',
      title: 'Ethical Hacking',
      instructor: 'Prof. Mathew',
      progress: 80,
      totalLessons: 16,
      completedLessons: 13,
      image: 'https://thedigitaladda.com/wp-content/uploads/Ethical-Hacking-Course-Training-in-Jalandhar.png',
      nextLesson: 'MERN Stack',
    },
  ];

  // Featured categories
  const categories = [
    { id: '1', name: 'Astrophysics', icon: 'telescope', courses: 45, color: '#FF6B6B' },
    { id: '2', name: 'Space Tech', icon: 'rocket', courses: 32, color: '#4ECDC4' },
    { id: '3', name: 'Astronomy', icon: 'planet', courses: 28, color: '#45B7D1' },
    { id: '4', name: 'Cosmology', icon: 'infinite', courses: 19, color: '#96CEB4' },
  ];

  // Sidebar navigation options - Updated Profile navigation
  const sidebarOptions = [
    { name: 'My Courses', screen: 'MyCourses', icon: 'book' },
    { name: 'Profile', screen: 'Profile', icon: 'person' },
    { name: 'Events', screen: 'Events', icon: 'calendar' },
    { name: 'Certificates', screen: 'Certificates', icon: 'trophy' },
    { name: 'Notifications', screen: 'Notifications', icon: 'notifications' },
    { name: 'Settings', screen: 'Settings', icon: 'settings' },
  ];

  const colors = {
    primary: '#0B3D91',
    secondary: '#FC3D21',
    accent: '#00e6e6',
    background: '#0A0A1A',
    cardBackground: '#1A1A2E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    success: '#4CAF50',
    warning: '#FF9800',
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return colors.accent;
    }
  };

  const renderRecommendedCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.recommendedCourseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.courseImage} />

      {/* Difficulty Badge */}
      <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
        <Text style={styles.difficultyText}>{item.difficulty}</Text>
      </View>

      <View style={styles.courseContent}>
        <Text style={[styles.courseTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
        <Text style={[styles.instructorName, { color: colors.textSecondary }]}>{item.instructor}</Text>

        <View style={styles.courseMetrics}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text>
            <Text style={[styles.studentsText, { color: colors.textSecondary }]}>({item.students})</Text>
          </View>
        </View>

        <View style={styles.courseFooter}>
          <View style={styles.durationContainer}>
            <Ionicons name="time" size={14} color={colors.accent} />
            <Text style={[styles.durationText, { color: colors.accent }]}>{item.duration}</Text>
          </View>
          <Text style={[styles.priceText, { color: colors.success }]}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderOngoingCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.ongoingCourseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.ongoingCourseImage} />

      <View style={styles.ongoingCourseContent}>
        <Text style={[styles.ongoingCourseTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
        <Text style={[styles.ongoingInstructor, { color: colors.textSecondary }]}>{item.instructor}</Text>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              Progress: {item.completedLessons}/{item.totalLessons} lessons
            </Text>
            <Text style={[styles.progressPercentage, { color: colors.accent }]}>{item.progress}%</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${item.progress}%`,
                  backgroundColor: item.progress > 70 ? colors.success : item.progress > 40 ? colors.warning : colors.accent
                }
              ]}
            />
          </View>

          <Text style={[styles.nextLessonText, { color: colors.textSecondary }]}>
            Next: {item.nextLesson}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigation.navigate('CategoryCourses', { categoryId: item.id })}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={[styles.categoryName, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>{item.courses} courses</Text>
    </TouchableOpacity>
  );

  // Updated renderSidebarOption to handle ProfileScreen navigation
  const renderSidebarOption = ({ item }) => (
    <TouchableOpacity
      style={[styles.sidebarItem, { backgroundColor: colors.cardBackground }]}
      onPress={() => {
        setSidebarVisible(false);
        // Navigate to the ProfileScreen
        navigation.navigate(item.screen);
      }}
    >
      <Ionicons name={item.icon} size={24} color={colors.accent} />
      <Text style={[styles.sidebarText, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: colors.cardBackground }]}
            onPress={() => setSidebarVisible(true)}
          >
            <Ionicons name="menu" size={24} color={colors.accent} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Space Academy</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Explore the Universe</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.accent} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Welcome back!</Text>
          <Text style={[styles.welcomeSubtext, { color: colors.textSecondary }]}>
            Ready to continue your cosmic journey?
          </Text>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Recommended Courses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended Courses</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.accent }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedCourses}
            renderItem={renderRecommendedCourse}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesList}
          />
        </View>

        {/* Ongoing Courses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Continue Learning</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.accent }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={ongoingCourses}
            renderItem={renderOngoingCourse}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesList}
          />
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Sidebar Modal */}
      <Modal
        visible={isSidebarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.sidebarContainer}>
          <View style={[styles.sidebar, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.sidebarHeader}>
              <Text style={[styles.sidebarTitle, { color: colors.text }]}>Space Academy</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSidebarVisible(false)}
              >
                <Ionicons name="close" size={24} color={colors.accent} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={sidebarOptions}
              renderItem={renderSidebarOption}
              keyExtractor={(item) => item.name}
              style={styles.sidebarList}
            />
          </View>
          <TouchableOpacity
            style={styles.sidebarOverlay}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8, // Added padding for better touch area
  },
  notificationBadge: {
    position: 'absolute',
    top: 6, // Adjusted position due to padding
    right: 6, // Adjusted position due to padding
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeSubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesList: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginRight: 15,
    minWidth: 100,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
  },
  coursesList: {
    paddingLeft: 20,
  },
  recommendedCourseCard: {
    width: 280,
    borderRadius: 16,
    marginRight: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: 160,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 22,
  },
  instructorName: {
    fontSize: 13,
    marginBottom: 12,
  },
  courseMetrics: {
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  studentsText: {
    fontSize: 12,
    marginLeft: 4,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ongoingCourseCard: {
    width: 300,
    borderRadius: 16,
    marginRight: 20,
    overflow: 'hidden',
  },
  ongoingCourseImage: {
    width: '100%',
    height: 120,
  },
  ongoingCourseContent: {
    padding: 16,
  },
  ongoingCourseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ongoingInstructor: {
    fontSize: 13,
    marginBottom: 16,
  },
  progressSection: {

  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  nextLessonText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  bottomPadding: {
    height: 20,
  },
  sidebarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '75%',
    paddingTop: 50,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  sidebarText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;