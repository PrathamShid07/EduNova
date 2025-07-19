import React from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.secondary};
  padding: ${props => props.theme.spacing.md}px;
`;

const Input = ({ icon, ...props }) => {
  return (
    <InputContainer>
      {icon && <Icon name={icon} size={20} color="#1CB5E0" style={{ marginRight: 8 }} />}
      <StyledInput 
        placeholderTextColor="#888"
        {...props}
      />
    </InputContainer>
  );
};

export default Input;