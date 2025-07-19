import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchEvent();
    checkFavorite();
  }, [user, navigation]);

  const fetchEvent = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/events/${eventId}`);
      setEvent(response.data);
      if (user.role === 'provider') {
        fetchParticipants();
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load event');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await api.get(`/events/${eventId}/participants`);
      setParticipants(response.data.participants || []);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load participants');
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await api.get('/users/favorites');
      const favorites = response.data.favorites || [];
      setIsFavorite(favorites.some((fav) => fav.eventId === eventId));
    } catch (error) {
      console.log('Error checking favorite:', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await api.post(`/events/${eventId}/register`);
      setIsRegistered(true);
      Alert.alert('Success', 'Registered for event');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to register');
    }
  };

  const handleUnregister = async () => {
    try {
      await api.delete(`/events/${eventId}/register`);
      setIsRegistered(false);
      Alert.alert('Success', 'Unregistered from event');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to unregister');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete(`/users/favorites/${eventId}`);
        setIsFavorite(false);
        Alert.alert('Success', 'Removed from favorites');
      } else {
        await api.post(`/users/favorites/${eventId}`);
        setIsFavorite(true);
        Alert.alert('Success', 'Added to favorites');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update favorites');
    }
  };

  const renderParticipant = ({ item }) => (
    <View style={styles.participantItem}>
      <Text style={styles.participantText}>{item.name} ({item.email})</Text>
    </View>
  );

  if (isLoading || !event) {
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
      accessibilityLabel="Event details background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Event details logo">
          <Icon name="calendar-star" size={50} color="#6A5ACD" />
          <Text style={styles.title}>{event.title}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.eventText}>Description: {event.description}</Text>
          <Text style={styles.eventText}>Date: {event.date}</Text>
          <Text style={styles.eventText}>Location: {event.location}</Text>
          {event.image && <Image source={{ uri: event.image }} style={styles.eventImage} />}
          {user.role === 'provider' && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('EditEvent', { eventId })}
              accessibilityLabel="Edit event button"
            >
              <Text style={styles.buttonText}>EDIT EVENT</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.loginButton, isFavorite ? styles.removeButton : null]}
            onPress={handleToggleFavorite}
            accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Text style={styles.buttonText}>
              {isFavorite ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
            </Text>
          </TouchableOpacity>
          {!isRegistered ? (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleRegister}
              accessibilityLabel="Register for event button"
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleUnregister}
              accessibilityLabel="Unregister from event button"
            >
              <Text style={styles.buttonText}>UNREGISTER</Text>
            </TouchableOpacity>
          )}
          {user.role === 'provider' && (
            <>
              <Text style={styles.subtitle}>Participants</Text>
              <FlatList
                data={participants}
                renderItem={renderParticipant}
                keyExtractor={(item) => item.userId.toString()}
                style={styles.participantsList}
                ListEmptyComponent={<Text style={styles.emptyText}>No participants yet</Text>}
              />
            </>
          )}
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
  eventText: { color: 'white', fontSize: 16, marginBottom: 10 },
  subtitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  eventImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 20 },
  loginButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  removeButton: {
    backgroundColor: '#FF4444',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  participantsList: { marginTop: 10 },
  participantItem: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    marginBottom: 10,
  },
  participantText: { color: 'white', fontSize: 16 },
  emptyText: { color: '#aaa', textAlign: 'center', fontSize: 16 },
});

export default EventDetailsScreen;