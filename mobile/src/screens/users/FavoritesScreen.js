import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const FavoritesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [eventId, setEventId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchFavorites();
  }, [user, navigation]);

  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users/favorites');
      setFavorites(response.data.favorites || []);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFavorite = async () => {
    if (!eventId) {
      Alert.alert('Error', 'Please enter an event ID');
      return;
    }
    try {
      const response = await api.post(`/users/favorites/${eventId}`);
      setFavorites(response.data.favorites || []);
      setEventId('');
      Alert.alert('Success', 'Event added to favorites');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add favorite');
    }
  };

  const handleRemoveFavorite = async (eventId) => {
    try {
      const response = await api.delete(`/users/favorites/${eventId}`);
      setFavorites(response.data.favorites || []);
      Alert.alert('Success', 'Event removed from favorites');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to remove favorite');
    }
  };

  const renderFavorite = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Text style={styles.favoriteText}>{item.title || `Event ${item.eventId}`}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item.eventId)}
        accessibilityLabel={`Remove ${item.title || item.eventId} from favorites`}
      >
        <Icon name="heart-broken" size={20} color="white" />
      </TouchableOpacity>
    </View>
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
      accessibilityLabel="Favorites background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Favorites logo">
          <Icon name="heart" size={50} color="#6A5ACD" />
          <Text style={styles.title}>FAVORITES</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ADD EVENT ID</Text>
            <View style={styles.inputWrapper}>
              <Icon name="plus" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter event ID"
                placeholderTextColor="#888"
                value={eventId}
                onChangeText={setEventId}
                accessibilityLabel="Event ID input"
                accessibilityHint="Enter an event ID to add to favorites"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleAddFavorite}
            accessibilityLabel="Add to favorites button"
            accessibilityHint="Press to add event to favorites"
          >
            <Text style={styles.buttonText}>ADD TO FAVORITES</Text>
          </TouchableOpacity>
          <FlatList
            data={favorites}
            renderItem={renderFavorite}
            keyExtractor={(item) => item.eventId.toString()}
            style={styles.favoritesList}
            ListEmptyComponent={<Text style={styles.emptyText}>No favorites yet</Text>}
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
  inputContainer: { marginBottom: 20 },
  label: { color: '#aaa', fontSize: 12, marginBottom: 8 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: 'white', paddingVertical: 15, fontSize: 16 },
  loginButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  favoritesList: { marginTop: 20 },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    marginBottom: 10,
  },
  favoriteText: { color: 'white', fontSize: 16 },
  removeButton: { padding: 5 },
  emptyText: { color: '#aaa', textAlign: 'center', fontSize: 16 },
});

export default FavoritesScreen;