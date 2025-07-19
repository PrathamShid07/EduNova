import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Add this import

const ToastContainer = styled(Animated.View)`
  position: absolute;
  bottom: 50px;
  left: 20px;
  right: 20px;
  background-color: ${props => {
    switch(props.type) {
      case 'success': return props.theme.colors.success;
      case 'error': return props.theme.colors.error;
      case 'warning': return props.theme.colors.warning;
      default: return props.theme.colors.primary;
    }
  }};
  padding: 15px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  z-index: 999;
  elevation: 4; /* Add shadow for Android */
  shadow-color: #000; /* Add shadow for iOS */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;

const ToastText = styled.Text`
  color: white;
  margin-left: 10px;
  flex: 1;
  font-size: 14px;
`;

const ToastIcon = styled.View`
  margin-right: 10px;
`;

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onDismiss 
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.(); // Optional chaining for safety
    });
  });

  const getIconName = () => {
    switch(type) {
      case 'success': return 'check-circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  };

  return (
    <ToastContainer style={{ opacity }} type={type}>
      <ToastIcon>
        <Icon 
          name={getIconName()} 
          size={24} 
          color="white" 
        />
      </ToastIcon>
      <ToastText>{message}</ToastText>
    </ToastContainer>
  );
};

export default Toast;