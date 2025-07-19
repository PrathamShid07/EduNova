import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

const NEBULA_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564';

const ResetPasswordScreen = ({ navigation, route }) => {
    const [token, setToken] = useState(route.params?.token || '');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!token || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        setIsLoading(true);
        try {
            await api.post('/auth/reset-password', { token, password });
            Alert.alert('Success', 'Password reset successfully');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={{ uri: NEBULA_BG }}
            style={styles.background}
            blurRadius={1}
            accessibilityLabel="Reset password background"
        >
            <View style={styles.overlay}>
                <View style={styles.logoContainer} accessibilityLabel="Reset password logo">
                    <Icon name="lock-reset" size={50} color="#6A5ACD" />
                    <Text style={styles.title}>RESET PASSWORD</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>RESET TOKEN</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="key" size={20} color="#aaa" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter reset token"
                                placeholderTextColor="#888"
                                value={token}
                                onChangeText={setToken}
                                accessibilityLabel="Reset token input"
                                accessibilityHint="Enter the reset token from your email"
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>NEW PASSWORD</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="lock" size={20} color="#aaa" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter new password"
                                placeholderTextColor="#888"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                accessibilityLabel="New password input"
                                accessibilityHint="Enter your new password"
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleResetPassword}
                        disabled={isLoading}
                        accessibilityLabel="Reset password button"
                        accessibilityHint="Press to reset your password"
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>RESET PASSWORD</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('Login')}
                        accessibilityLabel="Back to login button"
                        accessibilityHint="Return to login screen"
                    >
                        <Text style={styles.backButtonText}>BACK TO LOGIN</Text>
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
    backButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    backButtonText: { color: '#6A5ACD', fontSize: 16, fontWeight: 'bold' },
});

export default ResetPasswordScreen;