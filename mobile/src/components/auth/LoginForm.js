import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import Button from '../common/Button';
import Input from '../common/Input';

const LoginContainer = styled.View`
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  flex: 1;
  justify-content: center;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const SpaceLogo = styled.Image`
  width: 150px;
  height: 150px;
`;

const FooterText = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

const HighlightText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`;

const LoginForm = ({ onLogin, isLoading, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      onLogin(email, password);
    }
  };

  return (
    <LoginContainer>
      <LogoContainer>
        <SpaceLogo source={require('../../assets/images/astronaut.png')} />
      </LogoContainer>
      
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        icon="email"
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        icon="lock"
        error={errors.password}
      />
      
      <Button 
        title="Launch to Learning" 
        onPress={handleLogin}
        loading={isLoading}
      />
      
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <FooterText>Forgot Password?</FooterText>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <FooterText>
          Don't have an account? <HighlightText>Sign up</HighlightText>
        </FooterText>
      </TouchableOpacity>
    </LoginContainer>
  );
};

export default LoginForm;