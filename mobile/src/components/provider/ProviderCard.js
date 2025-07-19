import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Rating from '../common/Rating';

const CardContainer = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  flex-direction: row;
  elevation: 2;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 16px;
`;

const Content = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
`;

const Specialization = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

const StatText = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.textTertiary};
  margin-left: 4px;
`;

const ProviderCard = ({ provider, onPress }) => {
  return (
    <CardContainer onPress={onPress} activeOpacity={0.8}>
      <Avatar source={{ uri: provider.avatar }} />
      <Content>
        <Name>{provider.name}</Name>
        <Specialization>{provider.specialization}</Specialization>
        <Rating rating={provider.rating} />
        <StatsContainer>
          <StatItem>
            <Icon name="people" size={16} color="#666" />
            <StatText>{provider.students} students</StatText>
          </StatItem>
          <StatItem>
            <Icon name="event" size={16} color="#666" />
            <StatText>{provider.courses} courses</StatText>
          </StatItem>
        </StatsContainer>
      </Content>
      <Icon name="chevron-right" size={24} color="#999" />
    </CardContainer>
  );
};

export default ProviderCard;