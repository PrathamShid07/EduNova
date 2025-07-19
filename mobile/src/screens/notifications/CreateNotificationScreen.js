import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const CreateNotificationScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!user || user.role !== 'provider') {
    navigation.navigate('Login');
    return null;
  }

  const handleCreateNotification = async () => {
    if (!title || !message) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    setIsLoading(true);
    try {
      await api.post('/notifications/', { title, message, type });
      Alert.alert('Success', 'Notification created successfully');
      navigation.navigate('Notifications');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create notification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: NEBULA_BG }}
      style={styles.background}
      blurRadius={1}
      accessibilityLabel="Create notification background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Create notification logo">
          <Icon name="bell-plus" size={50} color="#6A5ACD" />
          <Text style={styles.title}>CREATE NOTIFICATION</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>TITLE</Text>
            <View style={styles.inputWrapper}>
              <Icon name="bell" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Notification title"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
                accessibilityLabel="Title input"
                accessibilityHint="Enter notification title"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>MESSAGE</Text>
            <View style={styles.inputWrapper}>
              <Icon name="text" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Notification message"
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                accessibilityLabel="Message input"
                accessibilityHint="Enter notification message"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>TYPE (Optional)</Text>
            <View style={styles.inputWrapper}>
              <Icon name="tag" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Notification type"
                placeholderTextColor="#888"
                value={type}
                onChangeText={setType}
                accessibilityLabel="Type input"
                accessibilityHint="Enter notification type (optional)"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleCreateNotification}
            disabled={isLoading}
            accessibilityLabel="Create notification button"
            accessibilityHint="Press to create notification"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>CREATE NOTIFICATION</Text>
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
  loginButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default CreateNotificationScreen;