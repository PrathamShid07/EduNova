import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoadingText = styled.Text`
  margin-top: 10px;
  color: ${props => props.theme.colors.textSecondary};
`;

const LoadingSpinner = ({ size = 'large', color, text }) => {
  return (
    <Container>
      <ActivityIndicator 
        size={size} 
        color={color || '#007AFF'} 
      />
      {text && <LoadingText>{text}</LoadingText>}
    </Container>
  );
};

export default LoadingSpinner;