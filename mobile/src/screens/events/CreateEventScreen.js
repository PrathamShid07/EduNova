import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const CreateEventScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!user || user.role !== 'provider') {
    navigation.navigate('Login');
    return null;
  }

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to pick image');
        return;
      }
      setImage(response.assets[0]);
    });
  };

  const handleCreateEvent = async () => {
    if (!title || !description || !date || !location) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('location', location);
      if (image && image.uri) {
        formData.append('image', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.fileName || 'event.jpg',
        });
      }
      await api.post('/events/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Event created successfully');
      navigation.navigate('Events');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: NEBULA_BG }}
      style={styles.background}
      blurRadius={1}
      accessibilityLabel="Create event background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Create event logo">
          <Icon name="calendar-plus" size={50} color="#6A5ACD" />
          <Text style={styles.title}>CREATE EVENT</Text>
        </View>
        <View style={styles.formContainer}>
          {image && <Image source={{ uri: image.uri }} style={styles.eventImage} />}
          <TouchableOpacity onPress={pickImage} style={styles.avatarButton}>
            <Text style={styles.buttonText}>Choose Event Image</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>TITLE</Text>
            <View style={styles.inputWrapper}>
              <Icon name="calendar" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Event title"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
                accessibilityLabel="Title input"
                accessibilityHint="Enter event title"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <View style={styles.inputWrapper}>
              <Icon name="text" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Event description"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
                multiline
                accessibilityLabel="Description input"
                accessibilityHint="Enter event description"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>DATE</Text>
            <View style={styles.inputWrapper}>
              <Icon name="calendar" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#888"
                value={date}
                onChangeText={setDate}
                accessibilityLabel="Date input"
                accessibilityHint="Enter event date"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>LOCATION</Text>
            <View style={styles.inputWrapper}>
              <Icon name="map-marker" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Event location"
                placeholderTextColor="#888"
                value={location}
                onChangeText={setLocation}
                accessibilityLabel="Location input"
                accessibilityHint="Enter event location"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleCreateEvent}
            disabled={isLoading}
            accessibilityLabel="Create event button"
            accessibilityHint="Press to create event"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>CREATE EVENT</Text>
            )}
          </TouchableOpacity>
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
  eventImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 20 },
  avatarButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default CreateEventScreen;