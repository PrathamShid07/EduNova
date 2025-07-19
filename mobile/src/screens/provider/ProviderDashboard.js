import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

const EventImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

const EventInfo = styled.View`
  flex: 1;
`;

const EventTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const EventDate = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

const EventItem = ({ event, onPress }) => {
  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <EventImage source={{ uri: event.imageUrl }} />
      <EventInfo>
        <EventTitle>{event.title}</EventTitle>
        <EventDate>{event.date} • {event.time}</EventDate>
      </EventInfo>
      <Icon name="chevron-right" size={24} color="#999" />
    </Container>
  );
};

export default EventItem;