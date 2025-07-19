import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import EventForm from '../../components/events/EventForm';
import { useEvents } from '../../hooks/useEvents';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
`;

const CreateEventScreen = ({ navigation }) => {
  const { createEvent } = useEvents();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (eventData) => {
    setLoading(true);
    try {
      await createEvent(eventData);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Container>
        <EventForm 
          onSubmit={handleSubmit} 
          loading={loading} 
        />
      </Container>
    </ScrollView>
  );
};

export default CreateEventScreen;