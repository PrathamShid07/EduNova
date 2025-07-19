import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled(TouchableOpacity)`
  background-color: ${props => props.backgroundColor || props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  flex-direction: row;
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const ButtonText = styled(Text)`
  color: ${props => props.textColor || props.theme.colors.text};
  font-family: ${props => props.theme.fonts.mainBold};
  font-size: 16px;
  margin-left: ${props => props.icon ? '8px' : 0};
`;

const Button = ({ 
  title, 
  onPress, 
  icon, 
  loading, 
  disabled, 
  backgroundColor, 
  textColor,
  style 
}) => {
  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled || loading}
      backgroundColor={backgroundColor}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={textColor || 'white'} />
      ) : (
        <>
          {icon}
          <ButtonText textColor={textColor}>
            {title}
          </ButtonText>
        </>
      )}
    </StyledButton>
  );
};

export default Button;