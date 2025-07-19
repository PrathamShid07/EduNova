import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Card = styled.View`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  padding: 16px;
  width: 30%;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const ValueText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.color || props.theme.colors.text};
  margin: 8px 0;
`;

const TitleText = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`;

const IconContainer = styled.View`
  background-color: ${props => `${props.color}20`};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const StatsCard = ({ title, value, icon, color = '#6a5acd' }) => {
  return (
    <Card>
      <IconContainer color={color}>
        <Icon name={icon} size={20} color={color} />
      </IconContainer>
      <ValueText color={color}>{value}</ValueText>
      <TitleText>{title}</TitleText>
    </Card>
  );
};

export default StatsCard;