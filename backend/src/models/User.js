import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Hardcoded recommended courses with high-quality space-themed images from Unsplash
  const recommendedCourses = [
    {
      id: '1',
      title: 'Introduction to Astrophysics',
      instructor: 'Dr. Neil Cosmos',
      duration: '4 weeks',
      image: 'https://images.unsplash.com/photo-1446941611759-9d0d7e40c318?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '2',
      title: 'Quantum Mechanics Basics',
      instructor: 'Prof. Quantum Leap',
      duration: '6 weeks',
      image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '3',
      title: 'Galactic Exploration',
      instructor: 'Dr. Starry Night',
      duration: '5 weeks',
      image: 'https://images.unsplash.com/photo-1506702315530-c7f8f0430d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  // Hardcoded ongoing courses with high-quality space-themed images from Unsplash
  const ongoingCourses = [
    {
      id: '4',
      title: 'Stellar Dynamics',
      instructor: 'Dr. Orbit Smith',
      progress: '60%',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '5',
      title: 'Cosmology 101',
      instructor: 'Prof. Galaxy Jones',
      progress: '25%',
      image: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  // Sidebar navigation options
  const sidebarOptions = [
    { name: 'Profile', screen: 'Profile', icon: 'person' },
    { name: 'Events', screen: 'Events', icon: 'calendar' },
    { name: 'Notifications', screen: 'Notifications', icon: 'notifications' },
  ];

  const colors = {
    primary: '#0B3D91',
    secondary: '#FC3D21',
    accent: '#00e6e6',
    background: '#000033',
    cardBackground: '#1A1A40',
    text: '#FFFFFF',
    textSecondary: '#E0E0E0',
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={[styles.courseTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.courseDetails, { color: colors.textSecondary }]}>
          {item.instructor} • {item.duration || item.progress}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSidebarOption = ({ item }) => (
    <TouchableOpacity
      style={[styles.sidebarItem, { backgroundColor: colors.cardBackground }]}
      onPress={() => {
        setSidebarVisible(false);
        navigation.navigate(item.screen);
      }}
    >
      <Ionicons name={item.icon} size={24} color={colors.accent} />
      <Text style={[styles.sidebarText, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Sidebar Trigger on Top-Left */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <Ionicons name="menu" size={36} color={colors.accent} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Space Academy</Text>
      </View>

      {/* Recommended Courses Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended Courses</Text>
        <FlatList
          data={recommendedCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}
        />
      </View>

      {/* Ongoing Courses Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ongoing Courses</Text>
        <FlatList
          data={ongoingCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}
        />
      </View>

      {/* Sidebar Modal */}
      <Modal
        visible={isSidebarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.sidebarContainer}>
          <View style={[styles.sidebar, { backgroundColor: colors.cardBackground }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSidebarVisible(false)}
            >
              <Ionicons name="close" size={30} color={colors.accent} />
            </TouchableOpacity>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#2A2A60',
    borderRadius: 10,
    padding: 8,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  courseList: {
    flexGrow: 0,
  },
  courseCard: {
    width: 250,
    borderRadius: 15,
    marginRight: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  courseImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseInfo: {
    flex: 1,
    backgroundColor: '#2A2A60',
    padding: 10,
    borderRadius: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseDetails: {
    fontSize: 14,
  },
  sidebarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align sidebar to the left
  },
  sidebar: {
    width: '70%',
    padding: 20,
    paddingTop: 40,
    // Ensure sidebar starts from the left edge
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  sidebarList: {
    flexGrow: 0,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  sidebarText: {
    marginLeft: 15,
    fontSize: 18,
  },
});

export default HomeScreen;