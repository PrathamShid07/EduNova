import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate } from '../../utils/dateUtils';

const CardContainer = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  elevation: 2;
`;

const EventImage = styled.Image`
  width: 100%;
  height: 160px;
`;

const CardContent = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const DetailsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const DetailText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-left: 8px;
`;

const PriceContainer = styled.View`
  background-color: ${props => props.theme.colors.primary};
  padding: 6px 12px;
  border-radius: 20px;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const PriceText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const EventCard = ({ event, onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <EventImage 
        source={{ uri: event.imageUrl }} 
        resizeMode="cover"
      />
      <PriceContainer>
        <PriceText>${event.price || 'Free'}</PriceText>
      </PriceContainer>
      <CardContent>
        <Title>{event.title}</Title>
        
        <DetailsRow>
          <Icon name="calendar-today" size={16} color="#666" />
          <DetailText>{formatDate(event.date)}</DetailText>
        </DetailsRow>
        
        <DetailsRow>
          <Icon name="access-time" size={16} color="#666" />
          <DetailText>{event.time}</DetailText>
        </DetailsRow>
        
        <DetailsRow>
          <Icon name="location-on" size={16} color="#666" />
          <DetailText>{event.location}</DetailText>
        </DetailsRow>
      </CardContent>
    </CardContainer>
  );
};

export default EventCard;