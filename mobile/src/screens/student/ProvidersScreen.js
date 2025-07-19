import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import ProviderCard from '../../components/provider/ProviderCard';
import SearchBar from '../../components/common/SearchBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${props => props.theme.colors.background};
`;

const ProvidersScreen = ({ navigation }) => {
  const [providers, setProviders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProviders([
        {
          id: '1',
          name: 'Tech Academy',
          specialization: 'Programming Courses',
          rating: 4.8,
          students: 1250,
          courses: 24,
          avatar: 'https://example.com/avatar1.jpg'
        },
        // More providers...
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <SearchBar
        placeholder="Search providers..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => navigation.navigate('ProviderProfile', { provider: item })}
            style={{ marginBottom: 16 }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

export default ProvidersScreen;