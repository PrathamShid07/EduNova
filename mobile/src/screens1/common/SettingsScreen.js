import React, { useContext } from 'react';
import { ScrollView, Switch } from 'react-native';
import styled from 'styled-components/native';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
`;

const Section = styled.View`
  margin-bottom: 30px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
`;

const SettingItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

const SettingText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
`;

const SettingsScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView>
      <Container>
        <Section>
          <SectionTitle>Account</SectionTitle>
          <SettingItem>
            <SettingText>Logged in as</SettingText>
            <SettingText>{user?.email || 'Guest'}</SettingText>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Preferences</SectionTitle>
          <SettingItem>
            <SettingText>Dark Mode</SettingText>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor="#6a5acd"
              trackColor={{ false: '#767577', true: '#6a5acd77' }}
            />
          </SettingItem>
          <SettingItem>
            <SettingText>Notifications</SettingText>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor="#6a5acd"
              trackColor={{ false: '#767577', true: '#6a5acd77' }}
            />
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>About</SectionTitle>
          <SettingItem>
            <SettingText>Version</SettingText>
            <SettingText>1.0.0</SettingText>
          </SettingItem>
        </Section>

        <Button 
          title="Log Out" 
          onPress={logout} 
          backgroundColor="#FF3B30"
          textColor="white"
        />
      </Container>
    </ScrollView>
  );
};

export default SettingsScreen;