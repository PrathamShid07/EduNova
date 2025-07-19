import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationContainer = styled(TouchableOpacity)`
  padding: 16px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: flex-start;
`;

const IconContainer = styled.View`
  margin-right: 12px;
  padding-top: 2px;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
`;

const Message = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const Time = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.textTertiary};
`;

const NotificationItem = ({ notification, onPress }) => {
  const getIconName = () => {
    switch (notification.type) {
      case 'event':
        return 'event';
      case 'alert':
        return 'warning';
      case 'message':
        return 'message';
      default:
        return 'notifications';
    }
  };

  const getIconColor = () => {
    if (notification.read) {
      return '#999';
    }
    switch (notification.type) {
      case 'alert':
        return '#FF3B30';
      default:
        return '#007AFF';
    }
  };

  return (
    <NotificationContainer 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconContainer>
        <Icon 
          name={getIconName()} 
          size={20} 
          color={getIconColor()} 
        />
      </IconContainer>
      <ContentContainer>
        <Title>{notification.title}</Title>
        <Message>{notification.message}</Message>
        <Time>{notification.time}</Time>
      </ContentContainer>
      {!notification.read && (
        <Icon name="fiber-manual-record" size={12} color="#007AFF" />
      )}
    </NotificationContainer>
  );
};

export default NotificationItem;