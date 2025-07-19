import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useEvents } from '../../hooks/useEvents';
import EventCard from '../../components/events/EventCard';
import SearchBar from '../../components/common/SearchBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${props => props.theme.colors.background};
`;

const EventsScreen = ({ navigation }) => {
  const { events, loading, fetchEvents } = useEvents();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <SearchBar
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
            style={{ marginBottom: 16 }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={loading}
        onRefresh={fetchEvents}
      />
    </Container>
  );
};

export default EventsScreen;