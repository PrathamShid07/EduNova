import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';
import EventCard from './EventCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ListContainer = styled.View`
  padding: 16px;
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`;

const EventList = ({ events, loading, onEventPress, onRefresh, refreshing }) => {
  if (loading && !refreshing) {
    return <LoadingSpinner text="Loading events..." />;
  }

  if (events.length === 0 && !loading) {
    return (
      <EmptyState>
        <EmptyText>No events found. Check back later!</EmptyText>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            onPress={() => onEventPress(item)} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </ListContainer>
  );
};

export default EventList;