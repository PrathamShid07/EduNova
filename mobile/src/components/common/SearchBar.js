import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 10px;
  padding-horizontal: 15px;
  padding-vertical: 8px;
  margin: 10px 0;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 8px;
  color: ${props => props.theme.colors.text};
`;

const ClearButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

const SearchBar = ({ 
  placeholder = 'Search...', 
  onSearch, 
  onClear,
  autoFocus = false 
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text) => {
    setQuery(text);
    if (onSearch) onSearch(text);
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) onClear();
  };

  return (
    <SearchContainer>
      <Icon name="search" size={20} color="#999" />
      <SearchInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleSearch}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {query.length > 0 && (
        <ClearButton onPress={handleClear}>
          <Icon name="close" size={20} color="#999" />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default SearchBar;