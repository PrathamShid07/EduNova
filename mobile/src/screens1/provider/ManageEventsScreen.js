import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useEvents } from '../../hooks/useEvents';
import EventCard from '../../components/events/EventCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
`;

const ManageEventsScreen = ({ navigation }) => {
  const { events, loading, fetchEvents } = useEvents();

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
            showActions
            onEdit={() => navigation.navigate('CreateEvent', { event: item })}
          />
        )}
        refreshing={loading}
        onRefresh={fetchEvents}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

export default ManageEventsScreen;