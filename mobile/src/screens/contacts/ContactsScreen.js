import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const ContactsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchContacts();
  }, [user, navigation]);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/contacts/');
      setContacts(response.data.contacts || []);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('ContactDetails', { contactId: item.id })}
      accessibilityLabel={`View contact: ${item.subject}`}
    >
      <Text style={styles.contactText}>{item.subject}</Text>
      <Text style={styles.contactSubText}>{item.status}</Text>
      <Text style={styles.contactDate}>{new Date(item.createdAt).toLocaleString()}</Text>
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
      accessibilityLabel="Contacts background"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer} accessibilityLabel="Contacts logo">
          <Icon name="message" size={50} color="#6A5ACD" />
          <Text style={styles.title}>CONTACTS</Text>
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('CreateContact')}
            accessibilityLabel="Create new contact button"
          >
            <Text style={styles.buttonText}>CREATE NEW CONTACT</Text>
          </TouchableOpacity>
          <FlatList
            data={contacts}
            renderItem={renderContact}
            keyExtractor={(item) => item.id.toString()}
            style={styles.contactsList}
            ListEmptyComponent={<Text style={styles.emptyText}>No contacts</Text>}
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
    marginBottom: 15,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  contactsList: { marginTop: 10 },
  contactItem: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    marginBottom: 10,
  },
  contactText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  contactSubText: { color: '#aaa', fontSize: 14 },
  contactDate: { color: '#aaa', fontSize: 12, marginTop: 5 },
  emptyText: { color: '#aaa', textAlign: 'center', fontSize: 16 },
});

export default ContactsScreen;