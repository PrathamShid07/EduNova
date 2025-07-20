import React from 'react';
import { FlatList, Modal, Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${props => props.theme?.colors?.background || '#0A0A1A'};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 10px;
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

const RoleIndicator = styled.View`
  background-color: ${props => props.theme?.colors?.accent || '#00E6E6'};
  padding: 8px 12px;
  border-radius: 16px;
  margin-right: 8px;
`;

const RoleText = styled.Text`
  color: ${props => props.theme?.colors?.background || '#0A0A1A'};
  font-size: 12px;
  font-weight: 600;
`;

const FilterContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: 20px;
  max-height: 50px;
`;

const FilterButton = styled.TouchableOpacity`
  background-color: ${props => props.active ?
    (props.theme?.colors?.accent || '#00E6E6') :
    (props.theme?.colors?.cardBackground || '#1A1A2E')};
  padding: 10px 16px;
  border-radius: 25px;
  margin-right: 12px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props.active ? 'transparent' : '#333'};
  min-height: 40px;
`;

const FilterText = styled.Text`
  color: ${props => props.active ?
    (props.theme?.colors?.background || '#0A0A1A') :
    (props.theme?.colors?.text || '#FFFFFF')};
  font-size: 14px;
  font-weight: 500;
  margin-left: 6px;
`;

const FAB = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => props.theme?.colors?.accent || '#00E6E6'};
  justify-content: center;
  align-items: center;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 8px;
  z-index: 1000;
`;

const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 80px;
`;

const EmptyStateText = styled.Text`
  color: ${props => props.theme?.colors?.textSecondary || '#B0B0B0'};
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
`;

// Event Card Styled Components
const EventCardContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin-bottom: 16px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const EventImage = styled.Image`
  width: 100%;
  height: 180px;
  background-color: #333;
`;

const StatusBadge = styled.View`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: ${props => props.isPast ? 'rgba(176, 176, 176, 0.9)' : 'rgba(76, 175, 80, 0.9)'};
  padding: 6px 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const StatusText = styled.Text`
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 8px;
  backdrop-filter: blur(10px);
`;

const EventContent = styled.View`
  padding: 20px;
`;

const EventTitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const EventTitle = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  line-height: 26px;
  margin-right: 12px;
`;

const ProviderActions = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: ${props => props.danger ? '#FF4444' : '#00E6E6'};
  border-radius: 8px;
  padding: 8px;
  min-width: 36px;
  align-items: center;
  justify-content: center;
`;

const EventDescription = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme?.colors?.textSecondary || '#B0B0B0'};
  margin-bottom: 20px;
`;

const EventDetails = styled.View`
  margin-bottom: 20px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const DetailText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme?.colors?.textSecondary || '#B0B0B0'};
  margin-left: 12px;
  flex: 1;
`;

const EventFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const AttendeesInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AttendeesText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #4CAF50;
  margin-left: 6px;
`;

const PriceText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.isFree ? '#4CAF50' : '#00E6E6'};
`;

const OrganizerText = styled.Text`
  font-size: 13px;
  font-style: italic;
  color: ${props => props.theme?.colors?.textSecondary || '#888'};
`;

// Loading Spinner Component
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

// const RotatingIcon = styled(Ionicons)`
//   transform: ${props => rotate(${ props.rotation || 0 }, deg)};
// `;

const LoadingSpinner = () => {
  const [rotation, setRotation] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 45) % 360);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContainer>
      <RotatingIcon name="refresh" size={32} color="#00E6E6" rotation={rotation} />
      <LoadingText>Loading events...</LoadingText>
    </LoadingContainer>
  );
};

const RoleToggleButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const EventsScreen = ({ navigation }) => {
  // Hard-coded sample data
  const [events, setEvents] = React.useState([
    {
      id: '1',
      title: 'Webinar on Real-World Data Science Applications',
      description: 'Join our experts as they walk you through practical applications of data science in industries like healthcare, finance, and e-commerce.',
      date: '2025-08-15',
      time: '14:00',
      location: 'Online via Zoom',
      category: 'webinar',
      attendees: 45,
      maxAttendees: 100,
      price: 0,
      image: 'https://lsmt.org.uk/_next/image?url=https%3A%2F%2Fadmin.lsmt.org.uk%2Fuploads%2Fimages-admin%2Fblogs%2F1752060948_3425.png&w=2048&q=75',
      organizer: 'DataSci Network',
    },
    {
      id: '2',
      title: 'Workshop: Building a Cybersecurity Aware Web App',
      description: 'Hands-on workshop focusing on secure coding practices and how to prevent common web vulnerabilities using OWASP guidelines.',
      date: '2025-08-20',
      time: '10:00',
      location: 'TechLab Building, Room 204',
      category: 'workshop',
      attendees: 60,
      maxAttendees: 80,
      price: 20,
      image: 'https://www.webasha.com/uploads/course/slider_images/65d9ddd25468a1708776914.cyber-security-training.jpg',
      organizer: 'SecureWeb Initiative',
    },
    {
      id: '3',
      title: 'Masterclass: Deploying Scalable AI Models',
      description: 'A professional deep dive into best practices for training and deploying machine learning models at scale using cloud platforms.',
      date: '2025-07-10',
      time: '19:00',
      location: 'AI Innovation Hub, Pune',
      category: 'masterclass',
      attendees: 40,
      maxAttendees: 50,
      price: 30,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAkMTXEIu6N8pERz9QJO512NE7Iu0ruMBMQ&s',
      organizer: 'ML Engineers Guild',
    },
    {
      id: '4',
      title: 'Virtual Tour: Behind the Scenes of a Fintech Startup',
      description: 'Explore how modern fintech companies operate, from backend architecture to payment security, with a live Q&A from the team.',
      date: '2025-08-25',
      time: '16:00',
      location: 'Virtual Reality Center',
      category: 'tour',
      attendees: 30,
      maxAttendees: 60,
      price: 10,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjuxXopJZZLk3nnck8Q9VITPiY_bMv-rQuqK8Wfq9_-59QkzBG0f1FfBhmUapQkZXy2s&usqp=CAU',
      organizer: 'FinTech Founders Club',
    },
    {
      id: '5',
      title: 'Showcase: Blockchain Projects by Final Year Students',
      description: 'A demonstration of innovative blockchain solutions for voting systems, academic credentials, and supply chain management by engineering students.',
      date: '2025-08-30',
      time: '06:00',
      location: 'College Auditorium',
      category: 'event',
      attendees: 75,
      maxAttendees: 100,
      price: 0,
      image: 'https://crypto-economy.com//wp-content/uploads/2017/12/blockchanin-1024x576.jpg',
      organizer: 'Department of Computer Engineering, VJTI',
    }
  ]);


  const [user, setUser] = React.useState({ role: 'user' });
  const [loading, setLoading] = React.useState(false);
  const [filterType, setFilterType] = React.useState('all');
  const [favoriteEvents, setFavoriteEvents] = React.useState(new Set(['1', '3']));
  const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const isProvider = user?.role === 'provider';

  // Mock functions
  const fetchEvents = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const createEvent = async (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      attendees: 0,
      organizer: 'You',
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = async (eventId, eventData) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId ? { ...event, ...eventData } : event
    ));
  };

  const deleteEvent = async (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const filters = [
    { id: 'all', label: 'All Events', icon: 'calendar' },
    { id: 'upcoming', label: 'Upcoming', icon: 'time' },
    { id: 'past', label: 'Past', icon: 'checkmark-circle' },
    { id: 'favorites', label: 'Favorites', icon: 'heart' },
  ];

  const toggleFavorite = (eventId) => {
    const newFavorites = new Set(favoriteEvents);
    if (favoriteEvents.has(eventId)) {
      newFavorites.delete(eventId);
    } else {
      newFavorites.add(eventId);
    }
    setFavoriteEvents(newFavorites);
  };

  const getFilteredEvents = () => {
    let filtered = events;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filterType) {
      case 'upcoming':
        filtered = events.filter(event => new Date(event.date) >= today);
        break;
      case 'past':
        filtered = events.filter(event => new Date(event.date) < today);
        break;
      case 'favorites':
        filtered = events.filter(event => favoriteEvents.has(event.id));
        break;
      default:
        filtered = events;
    }

    return filtered;
  };

  const handleCreateEvent = async (eventData) => {
    try {
      await createEvent(eventData);
      setCreateModalVisible(false);
      Alert.alert('Success', 'Event created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create event');
    }
  };

  const handleEditEvent = async (eventData) => {
    try {
      await updateEvent(selectedEvent.id, eventData);
      setEditModalVisible(false);
      setSelectedEvent(null);
      Alert.alert('Success', 'Event updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update event');
    }
  };

  const handleDeleteEvent = (eventId) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(eventId);
              Alert.alert('Success', 'Event deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete event');
            }
          }
        }
      ]
    );
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setEditModalVisible(true);
  };

  const renderFilterButton = (filter) => (
    <FilterButton
      key={filter.id}
      active={filterType === filter.id}
      onPress={() => setFilterType(filter.id)}
    >
      <Ionicons
        name={filter.icon}
        size={18}
        color={filterType === filter.id ? '#0A0A1A' : '#FFFFFF'}
      />
      <FilterText active={filterType === filter.id}>
        {filter.label}
      </FilterText>
    </FilterButton>
  );

  const renderEventCard = ({ item }) => {
    const isFavorite = favoriteEvents.has(item.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPastEvent = new Date(item.date) < today;

    return (
      <EventCardContainer>
        <EventImage source={{ uri: item.image }} />

        <StatusBadge isPast={isPastEvent}>
          <StatusText>{isPastEvent ? 'PAST' : 'UPCOMING'}</StatusText>
        </StatusBadge>

        <FavoriteButton onPress={() => toggleFavorite(item.id)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#FF6B9D" : "#FFFFFF"}
          />
        </FavoriteButton>

        <EventContent>
          <EventTitleRow>
            <EventTitle numberOfLines={2}>{item.title}</EventTitle>
            {isProvider && (
              <ProviderActions>
                <ActionButton onPress={() => openEditModal(item)}>
                  <Ionicons name="pencil" size={16} color="#0A0A1A" />
                </ActionButton>
                <ActionButton danger onPress={() => handleDeleteEvent(item.id)}>
                  <Ionicons name="trash" size={16} color="#FFFFFF" />
                </ActionButton>
              </ProviderActions>
            )}
          </EventTitleRow>

          <EventDescription numberOfLines={3}>{item.description}</EventDescription>

          <EventDetails>
            <DetailRow>
              <Ionicons name="calendar-outline" size={16} color="#00E6E6" />
              <DetailText>{item.date} at {item.time}</DetailText>
            </DetailRow>
            <DetailRow>
              <Ionicons name="location-outline" size={16} color="#00E6E6" />
              <DetailText>{item.location}</DetailText>
            </DetailRow>
            <DetailRow>
              <Ionicons name="pricetag-outline" size={16} color="#4ECDC4" />
              <DetailText>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</DetailText>
            </DetailRow>
          </EventDetails>

          <EventFooter>
            <AttendeesInfo>
              <Ionicons name="people-outline" size={16} color="#4CAF50" />
              <AttendeesText>{item.attendees}/{item.maxAttendees}</AttendeesText>
            </AttendeesInfo>
            <PriceText isFree={item.price === 0}>
              {/* {item.price === 0 ? 'FREE' : $${item.price}} */}
            </PriceText>
          </EventFooter>

          <OrganizerText>Organized by {item.organizer}</OrganizerText>
        </EventContent>
      </EventCardContainer>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <HeaderTitle>Events</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <RoleIndicator>
            <RoleText>{isProvider ? 'PROVIDER' : 'USER'}</RoleText>
          </RoleIndicator>
          <RoleToggleButton
            onPress={() => setUser(prev => ({
              ...prev,
              role: prev.role === 'user' ? 'provider' : 'user'
            }))}
          >
            <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
          </RoleToggleButton>
        </HeaderRight>
      </Header>

      <FilterContainer>
        {filters.map(renderFilterButton)}
      </FilterContainer>

      <FlatList
        data={getFilteredEvents()}
        keyExtractor={item => item.id}
        renderItem={renderEventCard}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshing={loading}
        onRefresh={fetchEvents}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState>
            <Ionicons name="calendar-outline" size={80} color="#B0B0B0" />
            <EmptyStateText>No events found</EmptyStateText>
            <EmptyStateText style={{ fontSize: 14, marginTop: 8 }}>
              {filterType === 'favorites' ? 'No favorite events yet' : 'Check back later for new events'}
            </EmptyStateText>
          </EmptyState>
        }
      />

      {isProvider && (
        <FAB onPress={() => setCreateModalVisible(true)}>
          <Ionicons name="add" size={28} color="#0A0A1A" />
        </FAB>
      )}

      {/* Temporary Modal Placeholders */}
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <Container>
          <Header>
            <HeaderLeft>
              <HeaderTitle>Create Event</HeaderTitle>
            </HeaderLeft>
            <HeaderRight>
              <RoleToggleButton onPress={() => setCreateModalVisible(false)}>
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </RoleToggleButton>
            </HeaderRight>
          </Header>
          <EmptyState>
            <Ionicons name="document-text-outline" size={80} color="#B0B0B0" />
            <EmptyStateText>EventForm component will be rendered here</EmptyStateText>
            <EmptyStateText style={{ fontSize: 14, marginTop: 8 }}>
              Uncomment the EventForm import and Modal components
            </EmptyStateText>
          </EmptyState>
        </Container>
      </Modal>

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Container>
          <Header>
            <HeaderLeft>
              <HeaderTitle>Edit Event</HeaderTitle>
            </HeaderLeft>
            <HeaderRight>
              <RoleToggleButton onPress={() => {
                setEditModalVisible(false);
                setSelectedEvent(null);
              }}>
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </RoleToggleButton>
            </HeaderRight>
          </Header>
          <EmptyState>
            <Ionicons name="document-text-outline" size={80} color="#B0B0B0" />
            <EmptyStateText>EventForm component will be rendered here</EmptyStateText>
            <EmptyStateText style={{ fontSize: 14, marginTop: 8 }}>
              Event: {selectedEvent?.title}
            </EmptyStateText>
          </EmptyState>
        </Container>
      </Modal>
    </Container>
  );
};

export default EventsScreen;