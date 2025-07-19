import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Button from '../common/Button';
import Input from '../common/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormContainer = styled.View`
  padding: 20px;
`;

const FormTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;  
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const DatePickerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const DatePickerText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  margin-left: 10px;
`;

const EventForm = ({ 
  initialData, 
  onSubmit, 
  loading, 
  isEdit = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '',
    location: '',
    price: '',
    imageUrl: '',
    learningOutcomes: '',
    capacity: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date ? new Date(initialData.date) : new Date(),
      });
    }
  }, [initialData]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({
        ...formData,
        date: selectedDate,
      });
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView>
      <FormContainer>
        <FormTitle>{isEdit ? 'Edit Event' : 'Create New Event'}</FormTitle>
        
        <Section>
          <Input
            label="Event Title"
            placeholder="Enter event title"
            value={formData.title}
            onChangeText={(text) => handleChange('title', text)}
          />
          
          <Input
            label="Description"
            placeholder="Enter event description"
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            multiline
            numberOfLines={4}
          />
        </Section>
        
        <Section>
          <DatePickerButton onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar-today" size={20} color="#666" />
            <DatePickerText>
              {formatDate(formData.date)}
            </DatePickerText>
          </DatePickerButton>
          
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          
          <Input
            label="Time"
            placeholder="HH:MM AM/PM"
            value={formData.time}
            onChangeText={(text) => handleChange('time', text)}
          />
          
          <Input
            label="Location"
            placeholder="Enter event location"
            value={formData.location}
            onChangeText={(text) => handleChange('location', text)}
          />
        </Section>
        
        <Section>
          <Input
            label="Price (USD)"
            placeholder="0.00 (leave empty for free event)"
            value={formData.price}
            onChangeText={(text) => handleChange('price', text)}
            keyboardType="decimal-pad"
          />
          
          <Input
            label="Capacity"
            placeholder="Maximum attendees"
            value={formData.capacity}
            onChangeText={(text) => handleChange('capacity', text)}
            keyboardType="numeric"
          />
          
          <Input
            label="Image URL"
            placeholder="Enter image URL"
            value={formData.imageUrl}
            onChangeText={(text) => handleChange('imageUrl', text)}
          />
        </Section>
        
        <Section>
          <Input
            label="Learning Outcomes"
            placeholder="What will attendees learn?"
            value={formData.learningOutcomes}
            onChangeText={(text) => handleChange('learningOutcomes', text)}
            multiline
            numberOfLines={3}
          />
        </Section>
        
        <Button
          title={isEdit ? 'Update Event' : 'Create Event'}
          onPress={handleSubmit}
          loading={loading}
        />
      </FormContainer>
    </ScrollView>
  );
};

export default EventForm;