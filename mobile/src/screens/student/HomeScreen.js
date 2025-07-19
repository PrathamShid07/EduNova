import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: 'Astro Learner',
    email: 'astro@space.com',
    bio: 'Space enthusiast and lifelong learner',
    editable: false
  });

  // Define colors directly in the component
  const colors = {
    primary: '#0B3D91',
    secondary: '#FC3D21',
    accent: '#00e6e6',
    background: '#000033',
    cardBackground: '#1A1A40',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  };

  // All available routes from your backend
  const routes = [
    { name: 'Auth', icon: 'lock', screen: 'Auth' },
    { name: 'Users', icon: 'users', screen: 'Users' },
    { name: 'Events', icon: 'calendar', screen: 'Events' },
    { name: 'Providers', icon: 'user-tie', screen: 'Providers' },
    { name: 'Contacts', icon: 'address-book', screen: 'Contacts' },
    { name: 'Notifications', icon: 'bell', screen: 'Notifications' },
    { name: 'Admin', icon: 'shield-alt', screen: 'Admin' },
    { name: 'Health', icon: 'heartbeat', screen: 'Health' },
  ];

  const toggleEdit = () => {
    setUser({...user, editable: !user.editable});
  };

  const handleSave = () => {
    // Here you would typically call your API to update the user
    // For example: axios.put('/api/users/update', user)
    toggleEdit();
    alert('Profile updated successfully!');
  };

  const renderRoute = ({ item }) => (
    <TouchableOpacity 
      style={[styles.routeCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <FontAwesome5 name={item.icon} size={20} color={colors.accent} />
      <Text style={[styles.routeText, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Section */}
      <View style={[styles.profileContainer, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
            style={[styles.profileImage, { borderColor: colors.accent }]}
          />
          <View style={styles.profileActions}>
            {user.editable ? (
              <>
                <TouchableOpacity onPress={handleSave}>
                  <Ionicons name="checkmark" size={24} color={colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleEdit} style={{ marginLeft: 15 }}>
                  <Ionicons name="close" size={24} color={colors.error} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={toggleEdit}>
                <Ionicons name="create" size={24} color={colors.accent} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {user.editable ? (
          <>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={user.name}
              onChangeText={(text) => setUser({...user, name: text})}
              placeholder="Your name"
              placeholderTextColor={colors.textSecondary}
            />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={user.email}
              onChangeText={(text) => setUser({...user, email: text})}
              placeholder="Your email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={user.bio}
              onChangeText={(text) => setUser({...user, bio: text})}
              placeholder="Your bio"
              placeholderTextColor={colors.textSecondary}
              multiline
            />
          </>
        ) : (
          <>
            <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user.email}</Text>
            <Text style={[styles.userBio, { color: colors.text }]}>{user.bio}</Text>
          </>
        )}
      </View>

      {/* API Routes Section */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>API Routes</Text>
      <FlatList
        data={routes}
        renderItem={renderRoute}
        keyExtractor={(item) => item.name}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.routesContainer}
      />

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.cardBackground }]}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Ionicons name="add" size={24} color={colors.accent} />
          <Text style={[styles.actionText, { color: colors.text }]}>New Event</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.cardBackground }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings" size={24} color={colors.accent} />
          <Text style={[styles.actionText, { color: colors.text }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
  profileActions: {
    flexDirection: 'row',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 10,
  },
  userBio: {
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  routesContainer: {
    justifyContent: 'space-between',
  },
  routeCard: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  routeText: {
    marginTop: 10,
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    width: '48%',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default HomeScreen;