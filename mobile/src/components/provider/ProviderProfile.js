import React from 'react';
import { ScrollView, View, Image, Linking, Text } from 'react-native'; // Added Text to imports
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../common/Button';
import Rating from '../common/Rating';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Header = styled.View`
  padding: 20px;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 16px;
`;

const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const Section = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 12px;
`;

const BioText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
  line-height: 22px;
`;

const ContactItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

const ContactText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
  margin-left: 12px;
`;

const ProviderProfile = ({ provider }) => {
  const handleContactPress = (type, value) => {
    switch (type) {
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'website':
        Linking.openURL(value);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView>
      <Container>
        <Header>
          <ProfileImage source={{ uri: provider.avatar }} />
          <Name>{provider.name}</Name>
          <Title>{provider.specialization}</Title>
          <Rating rating={provider.rating} showLabel />
        </Header>

        <Section>
          <SectionTitle>About</SectionTitle>
          <BioText>{provider.bio}</BioText>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          {provider.email && (
            <ContactItem onPress={() => handleContactPress('email', provider.email)}>
              <Icon name="email" size={20} color="#666" />
              <ContactText>{provider.email}</ContactText>
            </ContactItem>
          )}
          {provider.phone && (
            <ContactItem onPress={() => handleContactPress('phone', provider.phone)}>
              <Icon name="phone" size={20} color="#666" />
              <ContactText>{provider.phone}</ContactText>
            </ContactItem>
          )}
          {provider.website && (
            <ContactItem onPress={() => handleContactPress('website', provider.website)}>
              <Icon name="link" size={20} color="#666" />
              <ContactText>{provider.website}</ContactText>
            </ContactItem>
          )}
        </Section>

        <Section>
          <SectionTitle>Courses Offered</SectionTitle>
          {provider.coursesList && provider.coursesList.length > 0 ? (
            provider.coursesList.map((course, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
                <Text>{course.description}</Text>
              </View>
            ))
          ) : (
            <BioText>No courses listed yet</BioText>
          )}
        </Section>

        <View style={{ padding: 20 }}>
          <Button title="Contact Provider" onPress={() => {}} />
        </View>
      </Container>
    </ScrollView>
  );
};

export default ProviderProfile;