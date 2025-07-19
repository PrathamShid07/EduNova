import React from 'react';
import { ScrollView, Image, Linking } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../common/Button';
import { formatDate } from '../../utils/dateUtils';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const EventImage = styled.Image`
  width: 100%;
  height: 250px;
`;

const Content = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 12px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  line-height: 24px;
  margin-bottom: 20px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const DetailText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  margin-left: 10px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ActionButton = styled(Button)`
  margin-top: 20px;
`;

const EventDetails = ({ event, onRegister }) => {
  const handleWebsitePress = () => {
    if (event.website) {
      Linking.openURL(event.website);
    }
  };

  return (
    <ScrollView>
      <Container>
        <EventImage source={{ uri: event.imageUrl }} resizeMode="cover" />
        
        <Content>
          <Title>{event.title}</Title>
          
          <DetailRow>
            <Icon name="calendar-today" size={20} color="#666" />
            <DetailText>{formatDate(event.date)} at {event.time}</DetailText>
          </DetailRow>
          
          <DetailRow>
            <Icon name="location-on" size={20} color="#666" />
            <DetailText>{event.location}</DetailText>
          </DetailRow>
          
          <DetailRow>
            <Icon name="person" size={20} color="#666" />
            <DetailText>Hosted by {event.providerName}</DetailText>
          </DetailRow>
          
          <DetailRow>
            <Icon name="attach-money" size={20} color="#666" />
            <DetailText>{event.price ? `$${event.price}` : 'Free'}</DetailText>
          </DetailRow>
          
          {event.website && (
            <DetailRow>
              <Icon name="link" size={20} color="#666" />
              <DetailText onPress={handleWebsitePress} style={{ color: '#007AFF' }}>
                {event.website}
              </DetailText>
            </DetailRow>
          )}
          
          <SectionTitle>About This Event</SectionTitle>
          <Description>{event.description}</Description>
          
          <SectionTitle>What You'll Learn</SectionTitle>
          <Description>{event.learningOutcomes || 'Details coming soon'}</Description>
          
          <ActionButton 
            title="Register Now" 
            onPress={onRegister} 
          />
        </Content>
      </Container>
    </ScrollView>
  );
};

export default EventDetails;