import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  // More robust email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const handleForgotPassword = async () => {
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address');
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    setEmailError('');

    try {
      const response = await api.post('/auth/forgot-password', { 
        email: email.trim().toLowerCase() 
      });
      
      Alert.alert(
        'Success', 
        'Password reset link sent to your email. Please check your inbox and spam folder.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      console.error('Forgot password error:', error);
      
      let errorMessage = 'Failed to send reset link. Please try again.';
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 404) {
          errorMessage = 'Email address not found. Please check your email or create an account.';
        } else if (status === 429) {
          errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
        } else if (data && data.message) {
          errorMessage = data.message;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Login');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={{ uri: NEBULA_BG }}
        style={styles.background}
        blurRadius={1}
        accessibilityLabel="Forgot password background"
        //defaultSource={require('../../assets/default-bg.jpg')} // Add fallback image
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <View style={styles.logoContainer}>
              <Icon name="email-send" size={50} color="#3B82F6" />
              <Text style={styles.title}>FORGOT PASSWORD</Text>
              <Text style={styles.subtitle}>
                Enter your email address to receive a password reset link
              </Text>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>EMAIL</Text>
                <View style={[
                  styles.inputWrapper, 
                  emailError ? styles.inputError : null
                ]}>
                  <Icon name="email" size={20} color="#aaa" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    value={email}
                    onChangeText={handleEmailChange}
                    editable={!loading}
                    accessibilityLabel="Email input field"
                    accessibilityHint="Enter your email to receive a reset link"
                  />
                </View>
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
              </View>
              
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (loading || !email.trim()) ? styles.buttonDisabled : null
                ]}
                onPress={handleForgotPassword}
                disabled={loading || !email.trim()}
                accessibilityLabel="Send reset link button"
                accessibilityHint="Press to send a password reset link to your email"
                accessibilityState={{ disabled: loading || !email.trim() }}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="white" size="small" />
                    <Text style={[styles.buttonText, { marginLeft: 10 }]}>
                      SENDING...
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>SEND RESET LINK</Text>
                )}
              </TouchableOpacity>
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Remember your password? </Text>
                <TouchableOpacity 
                  onPress={handleBackToLogin}
                  accessibilityLabel="Back to login"
                  accessibilityHint="Navigate back to login screen"
                >
                  <Text style={styles.loginLink}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: { 
    flex: 1, 
    resizeMode: 'cover' 
  },
  scrollContainer: {
    flexGrow: 1,
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,30,0.8)', 
    padding: 20,
    paddingHorizontal: 30, 
    justifyContent: 'center',
    minHeight: '100%',
  },
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  title: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(106, 90, 205, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: { 
    marginBottom: 20 
  },
  label: { 
    color: '#aaa', 
    fontSize: 12, 
    marginBottom: 8,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    minHeight: 50,
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 1,
  },
  inputIcon: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    color: 'white', 
    paddingVertical: 15, 
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    minHeight: 50,
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#6b7280',
    opacity: 0.7,
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  loginText: { 
    color: '#aaa',
    fontSize: 14,
  },
  loginLink: { 
    color: '#3B82F6', 
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;