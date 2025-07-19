import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

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
    { name: 'Contacts', icon: 'address-book', screen: 'Contacts' },
    { name: 'Notifications', icon: 'bell', screen: 'Notifications' },
  ];

  const renderRoute = ({ item }) => (
    <TouchableOpacity
      style={[styles.routeCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <FontAwesome5 name={item.icon} size={24} color={colors.accent} />
      <Text style={[styles.routeText, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>


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