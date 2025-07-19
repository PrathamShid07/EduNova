import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 16px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const NameText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const EmailText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

const ContactItem = ({ contact, onPress }) => {
  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <Avatar 
        source={{ uri: contact.avatar || 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70) }} 
      />
      <TextContainer>
        <NameText>{contact.name}</NameText>
        <EmailText>{contact.email}</EmailText>
      </TextContainer>
      <Icon name="chevron-right" size={24} color="#999" />
    </Container>
  );
};

export default ContactItem;