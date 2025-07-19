import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const GalaxyCard = styled(View)`
  background-color: rgba(11, 61, 145, 0.7);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.accent};
  shadow-color: #1CB5E0;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 5;
`;

export default GalaxyCard;