import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background || '#0A0A1A'};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: ${Platform.OS === 'ios' ? '60px' : '16px'};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme?.colors?.border || '#2A2A3A'};
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
`;

const HeaderButton = styled.TouchableOpacity`
  padding: 8px;
`;

const HeaderButtonText = styled.Text`
  color: ${props => props.primary ? '#00e6e6' : props.theme?.colors?.textSecondary || '#B0B0B0'};
  font-size: 16px;
  font-weight: ${props => props.primary ? '600' : '400'};
`;

const FormContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const FormSection = styled.View`
  margin-bottom: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  margin-bottom: 12px;
`;

const InputGroup = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  margin-bottom: 8px;
`;

const TextInput = styled.TextInput`
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  border-width: 1px;
  border-color: ${props => props.theme?.colors?.border || '#2A2A3A'};
  min-height: ${props => props.multiline ? '100px' : '50px'};
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HalfInput = styled.View`
  flex: 0.48;
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const CategoryButton = styled.TouchableOpacity`
  background-color: ${props => props.selected ? '#00e6e6' : props.theme?.colors?.cardBackground || '#1A1A2E'};
  padding: 10px 16px;
  border-radius: 20px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${props => props.selected ? '#00e6e6' : props.theme?.colors?.border || '#2A2A3A'};
`;

const CategoryText = styled.Text`
  color: ${props => props.selected ? '#0A0A1A' : props.theme?.colors?.text || '#FFFFFF'};
  font-size: 14px;
  font-weight: 500;
`;

const ImagePreview = styled.View`
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  border-radius: 12px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${props => props.theme?.colors?.border || '#2A2A3A'};
  border-style: dashed;
  min-height: 120px;
`;

const ImagePreviewText = styled.Text`
  color: ${props => props.theme?.colors?.textSecondary || '#B0B0B0'};
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`;

const SwitchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme?.colors?.cardBackground || '#1A1A2E'};
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${props => props.theme?.colors?.border || '#2A2A3A'};
`;

const SwitchLabel = styled.Text`
  color: ${props => props.theme?.colors?.text || '#FFFFFF'};
  font-size: 16px;
`;

const CustomSwitch = styled.TouchableOpacity`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  background-color: ${props => props.active ? '#4CAF50' : '#333'};
  justify-content: center;
  padding: 2px;
`;

const SwitchThumb = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
  align-self: ${props => props.active ? 'flex-end' : 'flex-start'};
`;

const ErrorText = styled.Text`
  color: #F44336;
  font-size: 12px;
  margin-top: 4px;
`;

const EventForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    title = 'Create Event',
    isEdit = false
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'workshop',
        maxAttendees: '',
        price: '',
        image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        isFree: true,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        { id: 'workshop', label: 'Workshop', icon: 'construct' },
        { id: 'seminar', label: 'Seminar', icon: 'school' },
        { id: 'masterclass', label: 'Masterclass', icon: 'library' },
        { id: 'tour', label: 'Tour', icon: 'map' },
        { id: 'event', label: 'Event', icon: 'calendar' },
        { id: 'conference', label: 'Conference', icon: 'people' },
    ];

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                date: initialData.date || '',
                time: initialData.time || '',
                location: initialData.location || '',
                category: initialData.category || 'workshop',
                maxAttendees: initialData.maxAttendees?.toString() || '',
                price: initialData.price?.toString() || '',
                image: initialData.image || 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                isFree: initialData.price === 0,
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.date.trim()) {
            newErrors.date = 'Date is required';
        } else {
            // Basic date validation (YYYY-MM-DD format)
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(formData.date)) {
                newErrors.date = 'Date must be in YYYY-MM-DD format';
            }
        }

        if (!formData.time.trim()) {
            newErrors.time = 'Time is required';
        } else {
            // Basic time validation (HH:MM format)
            const timeRegex = /^\d{2}:\d{2}$/;
            if (!timeRegex.test(formData.time)) {
                newErrors.time = 'Time must be in HH:MM format';
            }
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.maxAttendees.trim()) {
            newErrors.maxAttendees = 'Maximum attendees is required';
        } else if (isNaN(formData.maxAttendees) || parseInt(formData.maxAttendees) <= 0) {
            newErrors.maxAttendees = 'Maximum attendees must be a positive number';
        }

        if (!formData.isFree && (!formData.price.trim() || isNaN(formData.price) || parseFloat(formData.price) < 0)) {
            newErrors.price = 'Price must be a valid number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Alert.alert('Validation Error', 'Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = {
                ...formData,
                maxAttendees: parseInt(formData.maxAttendees),
                price: formData.isFree ? 0 : parseFloat(formData.price),
            };

            await onSubmit(submitData);
        } catch (error) {
            Alert.alert('Error', 'Failed to save event');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleFreeToggle = () => {
        const newIsFree = !formData.isFree;
        setFormData(prev => ({
            ...prev,
            isFree: newIsFree,
            price: newIsFree ? '0' : prev.price
        }));
    };

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header>
                <HeaderButton onPress={onCancel}>
                    <HeaderButtonText>Cancel</HeaderButtonText>
                </HeaderButton>

                <HeaderTitle>{title}</HeaderTitle>

                <HeaderButton onPress={handleSubmit} disabled={isSubmitting}>
                    <HeaderButtonText primary>
                        {isSubmitting ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
                    </HeaderButtonText>
                </HeaderButton>
            </Header>

            <FormContainer showsVerticalScrollIndicator={false}>
                {/* Basic Information */}
                <FormSection>
                    <SectionTitle>Basic Information</SectionTitle>

                    <InputGroup>
                        <Label>Event Title</Label>
                        <TextInput
                            value={formData.title}
                            onChangeText={(value) => updateFormData('title', value)}
                            placeholder="Enter event title"
                            placeholderTextColor="#666"
                        />
                        {errors.title && <ErrorText>{errors.title}</ErrorText>}
                    </InputGroup>

                    <InputGroup>
                        <Label>Description</Label>
                        <TextInput
                            value={formData.description}
                            onChangeText={(value) => updateFormData('description', value)}
                            placeholder="Describe your event..."
                            placeholderTextColor="#666"
                            multiline
                            textAlignVertical="top"
                        />
                        {errors.description && <ErrorText>{errors.description}</ErrorText>}
                    </InputGroup>

                    <InputGroup>
                        <Label>Image URL</Label>
                        <TextInput
                            value={formData.image}
                            onChangeText={(value) => updateFormData('image', value)}
                            placeholder="https://example.com/image.jpg"
                            placeholderTextColor="#666"
                        />
                    </InputGroup>
                </FormSection>

                {/* Date & Time */}
                <FormSection>
                    <SectionTitle>Date & Time</SectionTitle>

                    <RowContainer>
                        <HalfInput>
                            <Label>Date</Label>
                            <TextInput
                                value={formData.date}
                                onChangeText={(value) => updateFormData('date', value)}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#666"
                            />
                            {errors.date && <ErrorText>{errors.date}</ErrorText>}
                        </HalfInput>

                        <HalfInput>
                            <Label>Time</Label>
                            <TextInput
                                value={formData.time}
                                onChangeText={(value) => updateFormData('time', value)}
                                placeholder="HH:MM"
                                placeholderTextColor="#666"
                            />
                            {errors.time && <ErrorText>{errors.time}</ErrorText>}
                        </HalfInput>
                    </RowContainer>
                </FormSection>

                {/* Location & Category */}
                <FormSection>
                    <SectionTitle>Details</SectionTitle>

                    <InputGroup>
                        <Label>Location</Label>
                        <TextInput
                            value={formData.location}
                            onChangeText={(value) => updateFormData('location', value)}
                            placeholder="Enter event location"
                            placeholderTextColor="#666"
                        />
                        {errors.location && <ErrorText>{errors.location}</ErrorText>}
                    </InputGroup>

                    <InputGroup>
                        <Label>Category</Label>
                        <CategoryContainer>
                            {categories.map(category => (
                                <CategoryButton
                                    key={category.id}
                                    selected={formData.category === category.id}
                                    onPress={() => updateFormData('category', category.id)}
                                >
                                    <CategoryText selected={formData.category === category.id}>
                                        {category.label}
                                    </CategoryText>
                                </CategoryButton>
                            ))}
                        </CategoryContainer>
                    </InputGroup>
                </FormSection>

                {/* Capacity & Pricing */}
                <FormSection>
                    <SectionTitle>Capacity & Pricing</SectionTitle>

                    <InputGroup>
                        <Label>Maximum Attendees</Label>
                        <TextInput
                            value={formData.maxAttendees}
                            onChangeText={(value) => updateFormData('maxAttendees', value)}
                            placeholder="50"
                            placeholderTextColor="#666"
                            keyboardType="numeric"
                        />
                        {errors.maxAttendees && <ErrorText>{errors.maxAttendees}</ErrorText>}
                    </InputGroup>

                    <InputGroup>
                        <SwitchRow>
                            <SwitchLabel>Free Event</SwitchLabel>
                            <CustomSwitch active={formData.isFree} onPress={handleFreeToggle}>
                                <SwitchThumb active={formData.isFree} />
                            </CustomSwitch>
                        </SwitchRow>
                    </InputGroup>

                    {!formData.isFree && (
                        <InputGroup>
                            <Label>Price ($)</Label>
                            <TextInput
                                value={formData.price}
                                onChangeText={(value) => updateFormData('price', value)}
                                placeholder="25.00"
                                placeholderTextColor="#666"
                                keyboardType="decimal-pad"
                            />
                            {errors.price && <ErrorText>{errors.price}</ErrorText>}
                        </InputGroup>
                    )}
                </FormSection>
            </FormContainer>
        </Container>
    );
};

export default EventForm;