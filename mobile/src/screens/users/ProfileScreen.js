import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchProfile();
  }, [user, navigation]);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users/profile');
      setName(response.data.name || '');
      setEmail(response.data.email || '');
      setAvatar(response.data.avatar || null);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid name and email');
      return;
    }
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (avatar && avatar.uri) {
        formData.append('avatar', {
          uri: avatar.uri,
          type: avatar.type || 'image/jpeg',
          name: avatar.fileName || 'avatar.jpg',
        });
      }
      await api.put('/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProfile = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete('/users/profile');
              await logout();
              navigation.navigate('Login');
              Alert.alert('Success', 'Account deleted successfully');
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to delete account');
            }
          },
        },
      ]
    );
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to pick image');
        return;
      }
      setAvatar(response.assets[0]);
    });
  };

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
      accessibilityLabel="Profile background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Profile logo">
          <Icon name="account-circle" size={50} color="#6A5ACD" />
          <Text style={styles.title}>PROFILE</Text>
        </View>
        <View style={styles.formContainer}>
          {avatar && <Image source={{ uri: avatar.uri || avatar }} style={styles.avatar} />}
          <TouchableOpacity onPress={pickImage} style={styles.avatarButton}>
            <Text style={styles.buttonText}>Change Avatar</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>NAME</Text>
            <View style={styles.inputWrapper}>
              <Icon name="account" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                accessibilityLabel="Name input"
                accessibilityHint="Enter your name"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.inputWrapper}>
              <Icon name="email" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Your email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                accessibilityLabel="Email input"
                accessibilityHint="Enter your email"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleUpdateProfile}
            disabled={isUpdating}
            accessibilityLabel="Update profile button"
            accessibilityHint="Press to update profile"
          >
            {isUpdating ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>UPDATE PROFILE</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteProfile}
            accessibilityLabel="Delete account button"
            accessibilityHint="Press to delete your account"
          >
            <Text style={styles.deleteButtonText}>DELETE ACCOUNT</Text>
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
  avatar: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20 },
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
  deleteButton: {
    backgroundColor: '#FF4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default ProfileScreen;