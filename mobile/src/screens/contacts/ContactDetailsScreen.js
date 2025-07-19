import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const ContactDetailsScreen = ({ route, navigation }) => {
  const { contactId } = route.params;
  const { user } = useAuth();
  const [contact, setContact] = useState(null);
  const [status, setStatus] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchContact();
  }, [user, navigation]);

  const fetchContact = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/contacts/${contactId}`);
      setContact(response.data);
      setStatus(response.data.status);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load contact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!status) {
      Alert.alert('Error', 'Please enter a status');
      return;
    }
    try {
      const response = await api.put(`/contacts/${contactId}`, { status });
      setContact({ ...contact, status: response.data.status });
      Alert.alert('Success', 'Contact status updated');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update status');
    }
  };

  const handleReply = async () => {
    if (!reply) {
      Alert.alert('Error', 'Please enter a reply');
      return;
    }
    try {
      const response = await api.post(`/contacts/${contactId}/reply`, { reply });
      setContact({ ...contact, reply: response.data.reply });
      setReply('');
      Alert.alert('Success', 'Reply sent successfully');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send reply');
    }
  };

  const handleDeleteContact = async () => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/contacts/${contactId}`);
              Alert.alert('Success', 'Contact deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to delete contact');
            }
          },
        },
      ]
    );
  };

  if (isLoading || !contact) {
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
      accessibilityLabel="Contact details background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Contact details logo">
          <Icon name="message-text" size={50} color="#6A5ACD" />
          <Text style={styles.title}>{contact.subject}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.contactText}>Message: {contact.message}</Text>
          <Text style={styles.contactText}>Status: {contact.status}</Text>
          <Text style={styles.contactText}>
            Date: {new Date(contact.createdAt).toLocaleString()}
          </Text>
          {contact.reply && (
            <Text style={styles.contactText}>Reply: {contact.reply}</Text>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>UPDATE STATUS</Text>
            <View style={styles.inputWrapper}>
              <Icon name="tag" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter status (e.g., open, closed)"
                placeholderTextColor="#888"
                value={status}
                onChangeText={setStatus}
                accessibilityLabel="Status input"
                accessibilityHint="Enter contact status"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleUpdateStatus}
            accessibilityLabel="Update status button"
          >
            <Text style={styles.buttonText}>UPDATE STATUS</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>REPLY</Text>
            <View style={styles.inputWrapper}>
              <Icon name="reply" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter reply"
                placeholderTextColor="#888"
                value={reply}
                onChangeText={setReply}
                multiline
                accessibilityLabel="Reply input"
                accessibilityHint="Enter reply to contact"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleReply}
            accessibilityLabel="Send reply button"
          >
            <Text style={styles.buttonText}>SEND REPLY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteContact}
            accessibilityLabel="Delete contact button"
          >
            <Text style={styles.buttonText}>DELETE CONTACT</Text>
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
  contactText: { color: 'white', fontSize: 16, marginBottom: 10 },
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
    marginTop: 15,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default ContactDetailsScreen;