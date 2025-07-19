import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import ContactItem from '../../components/provider/ContactItem';
import SearchBar from '../../components/common/SearchBar';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
`;

const ContactsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const contacts = []; // Replace with actual contacts data

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <SearchBar 
        placeholder="Search contacts..." 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem contact={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

export default ContactsScreen;