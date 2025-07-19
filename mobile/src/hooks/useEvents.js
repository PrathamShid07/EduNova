import { useState, useEffect, useContext, useCallback } from 'react';
import { EventContext } from '../context/EventContext';
import api from '../services/api';

export const useEvents = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const eventContext = useContext(EventContext);

  // Add null check for EventContext
  if (!eventContext) {
    throw new Error('useEvents must be used within an EventProvider');
  }

  const { events, setEvents } = eventContext;

  // Fixed dependencies - removed state setters from useCallback dependencies
  const fetchEvents = useCallback(async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await api.get('/events');

      // Validate response structure
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      // More robust array extraction
      let fetchedEvents = [];
      if (Array.isArray(response.data)) {
        fetchedEvents = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        fetchedEvents = response.data.data;
      } else if (response.data && Array.isArray(response.data.events)) {
        fetchedEvents = response.data.events;
      } else {
        console.warn('Unexpected response structure:', response.data);
        fetchedEvents = [];
      }

      setEvents(fetchedEvents);

    } catch (error) {
      console.error('Failed to fetch events:', error);

      let errorMessage = 'Failed to load events. Please try again.';
      if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication required. Please log in again.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied. Please check your permissions.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setError(errorMessage);
      setEvents([]); // Fallback to empty array

    } finally {
      if (refresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []); // Empty dependencies array

  const createEvent = async (eventData) => {
    // Validate input data
    if (!eventData || typeof eventData !== 'object') {
      const error = new Error('Invalid event data provided');
      setError('Invalid event data. Please check your input.');
      throw error;
    }

    // Basic validation for required fields
    const { title, description, date, location } = eventData;
    if (!title || !description || !date) {
      const error = new Error('Missing required fields');
      setError('Please fill in all required fields (title, description, date).');
      throw error;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/events', eventData);

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      // Ensure events is an array before spreading
      const currentEvents = Array.isArray(events) ? events : [];
      setEvents([...currentEvents, response.data]);

      return response.data;

    } catch (error) {
      console.error('Failed to create event:', error);

      let errorMessage = 'Failed to create event. Please try again.';
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid event data.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication required. Please log in again.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied. You may not have permission to create events.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your connection.';
      }

      setError(errorMessage);
      throw error;

    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId) => {
    // Validate eventId
    if (!eventId) {
      const error = new Error('Event ID is required');
      setError('Invalid event selected.');
      throw error;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/events/${eventId}/register`);

      // Ensure events is an array
      const currentEvents = Array.isArray(events) ? events : [];

      // Find the event to check if it exists
      const eventExists = currentEvents.find(event =>
        event.id === eventId || event._id === eventId
      );

      if (!eventExists) {
        throw new Error('Event not found in local data');
      }

      // Update the events array with registration info
      const updatedEvents = currentEvents.map(event => {
        const isCurrentEvent = event.id === eventId || event._id === eventId;
        if (isCurrentEvent) {
          return {
            ...event,
            isRegistered: true,
            attendees: (event.attendees || 0) + 1,
            // Add any additional data from response if available
            ...(response.data?.event || {})
          };
        }
        return event;
      });

      setEvents(updatedEvents);
      return response.data;

    } catch (error) {
      console.error('Registration failed:', error);

      let errorMessage = 'Registration failed. Please try again.';
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid registration request.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication required. Please log in again.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied. You may not have permission to register.';
      } else if (error.response?.status === 409) {
        errorMessage = 'You are already registered for this event.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your connection.';
      }

      setError(errorMessage);
      throw error;

    } finally {
      setLoading(false);
    }
  };

  const unregisterFromEvent = async (eventId) => {
    if (!eventId) {
      const error = new Error('Event ID is required');
      setError('Invalid event selected.');
      throw error;
    }

    setLoading(true);
    setError(null);

    try {
      await api.delete(`/events/${eventId}/register`);

      const currentEvents = Array.isArray(events) ? events : [];
      const updatedEvents = currentEvents.map(event => {
        const isCurrentEvent = event.id === eventId || event._id === eventId;
        if (isCurrentEvent) {
          return {
            ...event,
            isRegistered: false,
            attendees: Math.max((event.attendees || 1) - 1, 0)
          };
        }
        return event;
      });

      setEvents(updatedEvents);

    } catch (error) {
      console.error('Unregistration failed:', error);
      setError('Failed to unregister from event. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Use effect with empty dependency array and call fetchEvents inside
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array to avoid infinite loops

  return {
    events: Array.isArray(events) ? events : [],
    loading,
    refreshing,
    error,
    fetchEvents,
    createEvent,
    registerForEvent,
    unregisterFromEvent,
    clearError
  };
};