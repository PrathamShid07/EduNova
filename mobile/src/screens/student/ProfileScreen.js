import React from 'react';
import { ScrollView, Modal, Alert, TouchableOpacity, TextInput, Switch, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background || '#0A0A1A'};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 50px;
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
`;

const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EditButton = styled.TouchableOpacity`
  background-color: ${props => props.theme?.colors?.accent || '#00E6E6'};
  padding: 8px 16px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`;

const EditButtonText = styled.Text`
  color: ${props => props.theme?.colors?.background || '#0A0A1A'};
  font-size: 14px;
  font-weight: 600;
  margin-left: 6px;
`;

const ProfileContent = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

// Profile Header Section
const ProfileHeaderSection = styled.View`
  align-items: center;
  padding: 20px;
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 20px;
  margin-bottom: 20px;
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-bottom: 16px;
`;

const Avatar = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${props => props.theme?.colors?.accent || '#00E6E6'};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AvatarImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const AvatarPlaceholder = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.background || '#0A0A1A'};
`;

const EditAvatarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${props => props.theme?.colors?.accent || '#00E6E6'};
  border-radius: 20px;
  padding: 8px;
  border: 3px solid ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
`;

const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  margin-bottom: 8px;
`;

const UserRole = styled.Text`
  font-size: 16px;
  color: ${props => props.theme?.colors?.accent || '#00E6E6'};
  margin-bottom: 12px;
`;

const UserBio = styled.Text`
  font-size: 14px;
  color: ${props => props.theme?.colors?.textSecondary || '#B0B0B0'};
  text-align: center;
  line-height: 20px;
`;

// Stats Section
const StatsSection = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const StatItem = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  border-right-width: 1px;
  border-right-color: rgba(255, 255, 255, 0.1);
`;

const StatNumber = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.accent || '#00E6E6'};
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  font-size: 12px;
  color: ${props => props.theme?.colors?.textSecondary || '#B0B0B0'};
  text-align: center;
`;

// Info Sections
const InfoSection = styled.View`
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const SectionHeader = styled.View`
  padding: 20px 20px 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.05);
`;

const InfoItemContent = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const InfoItemLabel = styled.Text`
  font-size: 14px;
  color: ${props => props.theme?.colors?.textSecondary || '#B0B0B0'};
  margin-bottom: 4px;
`;

const InfoItemValue = styled.Text`
  font-size: 16px;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  font-weight: 500;
`;

const SwitchContainer = styled.View`
  margin-left: 12px;
`;

// Modal Styles
const ModalContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background || '#0A0A1A'};
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 50px;
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
`;

const ModalButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${props => props.primary ?
    (props.theme?.colors?.accent || '#00E6E6') :
    'transparent'};
  border: 1px solid ${props => props.primary ? 'transparent' :
    (props.theme?.colors?.accent || '#00E6E6')};
`;

const ModalButtonText = styled.Text`
  color: ${props => props.primary ?
    (props.theme?.colors?.background || '#0A0A1A') :
    (props.theme?.colors?.accent || '#00E6E6')};
  font-weight: 600;
  font-size: 14px;
`;

const FormContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const FormGroup = styled.View`
  margin-bottom: 24px;
`;

const FormLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  margin-bottom: 8px;
`;

const FormInput = styled.TextInput`
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: ${props => props.multiline ? '120px' : '50px'};
`;

const FormRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 12px;
  margin-bottom: 16px;
`;

const FormRowLabel = styled.Text`
  font-size: 16px;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  flex: 1;
`;

// Loading Spinner
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme?.colors?.background || '#0A0A1A'};
`;

const LoadingText = styled.Text`
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  font-size: 16px;
  margin-top: 16px;
`;

const LoadingSpinner = ({ message = "Loading profile..." }) => {
  const [rotation, setRotation] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 45) % 360);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContainer>
      <Ionicons name="refresh" size={32} color="#00E6E6" style={{ transform: [{ rotate: `${rotation}deg` }] }} />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

const ProfileScreen = ({ navigation }) => {
  // Profile data state
  const [profile, setProfile] = React.useState({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Space Enthusiast',
    bio: 'Passionate about space exploration and astronomy. Love attending workshops and connecting with fellow space enthusiasts.',
    location: 'San Francisco, CA',
    website: 'www.alexjohnson.dev',
    joinDate: '2023-01-15',
    avatar: null, // Set to null to show placeholder
    // Stats
    eventsAttended: 24,
    eventsCreated: 7,
    followers: 156,
    // Settings
    notifications: true,
    publicProfile: true,
    emailUpdates: false,
  });

  const [loading, setLoading] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  const [editForm, setEditForm] = React.useState({});
  const [saving, setSaving] = React.useState(false);

  // Initialize edit form when modal opens
  React.useEffect(() => {
    if (isEditModalVisible) {
      setEditForm({ ...profile });
    }
  }, [isEditModalVisible, profile]);

  const handleEditProfile = () => {
    setEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProfile({ ...editForm });
      setEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Avatar',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Camera selected') },
        { text: 'Gallery', onPress: () => console.log('Gallery selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const updateFormField = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <HeaderTitle>Profile</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <EditButton onPress={handleEditProfile}>
            <Ionicons name="pencil" size={16} color="#0A0A1A" />
            <EditButtonText>Edit</EditButtonText>
          </EditButton>
        </HeaderRight>
      </Header>

      <ProfileContent showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <ProfileHeaderSection>
          <AvatarContainer>
            <Avatar>
              {profile.avatar ? (
                <AvatarImage source={{ uri: profile.avatar }} />
              ) : (
                <AvatarPlaceholder>{getInitials(profile.name)}</AvatarPlaceholder>
              )}
            </Avatar>
            <EditAvatarButton onPress={handleChangeAvatar}>
              <Ionicons name="camera" size={16} color="#0A0A1A" />
            </EditAvatarButton>
          </AvatarContainer>

          <UserName>{profile.name}</UserName>
          <UserRole>{profile.role}</UserRole>
          <UserBio>{profile.bio}</UserBio>
        </ProfileHeaderSection>

        {/* Stats Section */}
        <StatsSection>
          <StatItem>
            <StatNumber>{profile.eventsAttended}</StatNumber>
            <StatLabel>Events{'\n'}Attended</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{profile.eventsCreated}</StatNumber>
            <StatLabel>Events{'\n'}Created</StatLabel>
          </StatItem>
          <StatItem style={{ borderRightWidth: 0 }}>
            <StatNumber>{profile.followers}</StatNumber>
            <StatLabel>Followers</StatLabel>
          </StatItem>
        </StatsSection>

        {/* Personal Information */}
        <InfoSection>
          <SectionHeader>
            <SectionTitle>Personal Information</SectionTitle>
          </SectionHeader>

          <InfoItem>
            <Ionicons name="mail-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Email</InfoItemLabel>
              <InfoItemValue>{profile.email}</InfoItemValue>
            </InfoItemContent>
          </InfoItem>

          <InfoItem>
            <Ionicons name="call-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Phone</InfoItemLabel>
              <InfoItemValue>{profile.phone}</InfoItemValue>
            </InfoItemContent>
          </InfoItem>

          <InfoItem>
            <Ionicons name="location-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Location</InfoItemLabel>
              <InfoItemValue>{profile.location}</InfoItemValue>
            </InfoItemContent>
          </InfoItem>

          <InfoItem>
            <Ionicons name="globe-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Website</InfoItemLabel>
              <InfoItemValue>{profile.website}</InfoItemValue>
            </InfoItemContent>
          </InfoItem>

          <InfoItem style={{ borderBottomWidth: 0 }}>
            <Ionicons name="calendar-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Member Since</InfoItemLabel>
              <InfoItemValue>{formatJoinDate(profile.joinDate)}</InfoItemValue>
            </InfoItemContent>
          </InfoItem>
        </InfoSection>

        {/* Settings */}
        <InfoSection>
          <SectionHeader>
            <SectionTitle>Settings</SectionTitle>
          </SectionHeader>

          <InfoItem>
            <Ionicons name="notifications-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Push Notifications</InfoItemLabel>
              <InfoItemValue>Stay updated with latest events</InfoItemValue>
            </InfoItemContent>
            <SwitchContainer>
              <Switch
                value={profile.notifications}
                onValueChange={(value) => setProfile(prev => ({ ...prev, notifications: value }))}
                trackColor={{ false: '#767577', true: '#00E6E6' }}
                thumbColor={profile.notifications ? '#0A0A1A' : '#f4f3f4'}
              />
            </SwitchContainer>
          </InfoItem>

          <InfoItem>
            <Ionicons name="eye-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Public Profile</InfoItemLabel>
              <InfoItemValue>Allow others to view your profile</InfoItemValue>
            </InfoItemContent>
            <SwitchContainer>
              <Switch
                value={profile.publicProfile}
                onValueChange={(value) => setProfile(prev => ({ ...prev, publicProfile: value }))}
                trackColor={{ false: '#767577', true: '#00E6E6' }}
                thumbColor={profile.publicProfile ? '#0A0A1A' : '#f4f3f4'}
              />
            </SwitchContainer>
          </InfoItem>

          <InfoItem style={{ borderBottomWidth: 0 }}>
            <Ionicons name="mail-open-outline" size={20} color="#00E6E6" />
            <InfoItemContent>
              <InfoItemLabel>Email Updates</InfoItemLabel>
              <InfoItemValue>Receive event updates via email</InfoItemValue>
            </InfoItemContent>
            <SwitchContainer>
              <Switch
                value={profile.emailUpdates}
                onValueChange={(value) => setProfile(prev => ({ ...prev, emailUpdates: value }))}
                trackColor={{ false: '#767577', true: '#00E6E6' }}
                thumbColor={profile.emailUpdates ? '#0A0A1A' : '#f4f3f4'}
              />
            </SwitchContainer>
          </InfoItem>
        </InfoSection>
      </ProfileContent>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <ModalContainer>
          <ModalHeader>
            <ModalButton onPress={() => setEditModalVisible(false)}>
              <ModalButtonText>Cancel</ModalButtonText>
            </ModalButton>
            <ModalTitle>Edit Profile</ModalTitle>
            <ModalButton primary onPress={handleSaveProfile} disabled={saving}>
              <ModalButtonText primary>
                {saving ? 'Saving...' : 'Save'}
              </ModalButtonText>
            </ModalButton>
          </ModalHeader>

          {saving ? (
            <LoadingSpinner message="Saving profile..." />
          ) : (
            <FormContainer>
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <FormInput
                  value={editForm.name}
                  onChangeText={(text) => updateFormField('name', text)}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Role/Title</FormLabel>
                <FormInput
                  value={editForm.role}
                  onChangeText={(text) => updateFormField('role', text)}
                  placeholder="e.g. Space Enthusiast, Astronomer"
                  placeholderTextColor="#666"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Bio</FormLabel>
                <FormInput
                  value={editForm.bio}
                  onChangeText={(text) => updateFormField('bio', text)}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor="#666"
                  multiline
                  textAlignVertical="top"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  value={editForm.email}
                  onChangeText={(text) => updateFormField('email', text)}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormInput
                  value={editForm.phone}
                  onChangeText={(text) => updateFormField('phone', text)}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Location</FormLabel>
                <FormInput
                  value={editForm.location}
                  onChangeText={(text) => updateFormField('location', text)}
                  placeholder="City, State/Country"
                  placeholderTextColor="#666"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Website</FormLabel>
                <FormInput
                  value={editForm.website}
                  onChangeText={(text) => updateFormField('website', text)}
                  placeholder="www.yourwebsite.com"
                  placeholderTextColor="#666"
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Notification Settings</FormLabel>

                <FormRow>
                  <FormRowLabel>Push Notifications</FormRowLabel>
                  <Switch
                    value={editForm.notifications}
                    onValueChange={(value) => updateFormField('notifications', value)}
                    trackColor={{ false: '#767577', true: '#00E6E6' }}
                    thumbColor={editForm.notifications ? '#0A0A1A' : '#f4f3f4'}
                  />
                </FormRow>

                <FormRow>
                  <FormRowLabel>Public Profile</FormRowLabel>
                  <Switch
                    value={editForm.publicProfile}
                    onValueChange={(value) => updateFormField('publicProfile', value)}
                    trackColor={{ false: '#767577', true: '#00E6E6' }}
                    thumbColor={editForm.publicProfile ? '#0A0A1A' : '#f4f3f4'}
                  />
                </FormRow>

                <FormRow>
                  <FormRowLabel>Email Updates</FormRowLabel>
                  <Switch
                    value={editForm.emailUpdates}
                    onValueChange={(value) => updateFormField('emailUpdates', value)}
                    trackColor={{ false: '#767577', true: '#00E6E6' }}
                    thumbColor={editForm.emailUpdates ? '#0A0A1A' : '#f4f3f4'}
                  />
                </FormRow>
              </FormGroup>
            </FormContainer>
          )}
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default ProfileScreen;