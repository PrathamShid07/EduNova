import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Button from '../common/Button';
import Input from '../common/Input';

const FormContainer = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const ContactForm = ({ provider, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      providerId: provider.id,
      providerName: provider.name,
    });
  };

  return (
    <ScrollView>
      <FormContainer>
        <Title>Contact {provider.name}</Title>
        
        <Input
          label="Your Name"
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        
        <Input
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Input
          label="Phone (Optional)"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          keyboardType="phone-pad"
        />
        
        <Input
          label="Message"
          placeholder="Type your message here"
          value={formData.message}
          onChangeText={(text) => handleChange('message', text)}
          multiline
          numberOfLines={4}
        />
        
        <Button
          title="Send Message"
          onPress={handleSubmit}
          loading={loading}
        />
      </FormContainer>
    </ScrollView>
  );
};

export default ContactForm;