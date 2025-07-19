import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../components/common/Button';
import ProviderProfile from '../../components/provider/ProviderProfile';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
`;

const ProviderProfileScreen = ({ navigation }) => {
  const provider = {
    name: 'John Doe',
    specialization: 'Web Development Instructor',
    rating: 4.8,
    bio: '10+ years experience teaching web development. Specialized in React, Node.js, and modern JavaScript frameworks.',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.dev',
    coursesList: [
      { name: 'React Masterclass', description: 'Complete React guide' },
      { name: 'Node.js Fundamentals', description: 'Backend development' }
    ]
  };

  return (
    <ScrollView>
      <Container>
        <ProviderProfile provider={provider} />
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
          style={{ marginTop: 20 }}
        />
      </Container>
    </ScrollView>
  );
};

export default ProviderProfileScreen;