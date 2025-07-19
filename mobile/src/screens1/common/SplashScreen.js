import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
`;

const AppName = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
`;

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth'); // Or 'Main' if already authenticated
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#000033', '#6a5acd']}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" />
      <Container>
        /*<Logo source={require('../../assets/images/app_logo.png')} />*/
        <AppName>CourseSpace</AppName>
      </Container>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default SplashScreen;