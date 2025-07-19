import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const EventsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/events/');
      setEvents(response.data.events || []);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.eventId })}
      accessibilityLabel={`View details for ${item.title}`}
    >
      <Text style={styles.eventText}>{item.title}</Text>
      <Text style={styles.eventSubText}>{item.date} - {item.location}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.background}>
        <ActivityIndicator size="large" color="#6A5ACD" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: NEBULA_BG }}
      style={styles.background}
      blurRadius={1}
      accessibilityLabel="Events background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Events logo">
          <Icon name="calendar" size={50} color="#6A5ACD" />
          <Text style={styles.title}>EVENTS</Text>
        </View>
        <View style={styles.formContainer}>
          {user?.role === 'provider' && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('CreateEvent')}
              accessibilityLabel="Create new event button"
            >
              <Text style={styles.buttonText}>CREATE NEW EVENT</Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={(item) => item.eventId.toString()}
            style={styles.eventsList}
            ListEmptyComponent={<Text style={styles.emptyText}>No events available</Text>}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,30,0.8)', padding: 30, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(106, 90, 205, 0.3)',
  },
  loginButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  eventsList: { marginTop: 10 },
  eventItem: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    marginBottom: 10,
  },
  eventText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  eventSubText: { color: '#aaa', fontSize: 14 },
  emptyText: { color: '#aaa', textAlign: 'center', fontSize: 16 },
});

export default EventsScreen;