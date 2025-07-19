import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import Button from '../common/Button';
import Input from '../common/Input';

const SignupContainer = styled.View`
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

const SignupForm = ({ onSignup, isLoading, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      onSignup({ name, email, password });
    }
  };

  return (
    <SignupContainer>
      <LogoContainer>
        <SpaceLogo source={require('../../assets/images/astronaut.png')} />
      </LogoContainer>
      
      <Input
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        icon="account"
        error={errors.name}
      />
      
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
      
      <Input
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        icon="lock-check"
        error={errors.confirmPassword}
      />
      
      <Button 
        title="Create Account" 
        onPress={handleSignup}
        loading={isLoading}
      />
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <FooterText>
          Already have an account? <HighlightText>Log in</HighlightText>
        </FooterText>
      </TouchableOpacity>
    </SignupContainer>
  );
};

export default SignupForm;