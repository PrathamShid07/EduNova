import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import EventDetails from '../../components/events/EventDetails';
import Button from '../../components/common/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const ActionButton = styled(Button)`
  margin: 20px;
`;

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;

  const handleRegister = () => {
    navigation.navigate('EventRegister', { eventId: event.id });
  };

  return (
    <ScrollView>
      <Container>
        <EventDetails event={event} />
        <ActionButton 
          title="Enroll Now" 
          onPress={handleRegister}
        />
      </Container>
    </ScrollView>
  );
};

export default EventDetailScreen;