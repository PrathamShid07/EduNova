import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';
import NotificationItem from './NotificationItem';
import LoadingSpinner from '../common/LoadingSpinner';

const ListContainer = styled.View`
  padding: 16px;
  flex: 1;
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

const Header = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

const NotificationList = ({ 
  notifications, 
  loading, 
  onRefresh, 
  refreshing, 
  onNotificationPress,
  headerText = 'Notifications'
}) => {
  if (loading && !refreshing) {
    return <LoadingSpinner text="Loading notifications..." />;
  }

  if (notifications.length === 0 && !loading) {
    return (
      <EmptyState>
        <EmptyText>No notifications yet</EmptyText>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem 
            notification={item} 
            onPress={() => onNotificationPress(item)}
          />
        )}
        ListHeaderComponent={
          <Header>
            <HeaderText>{headerText}</HeaderText>
          </Header>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </ListContainer>
  );
};

export default NotificationList;