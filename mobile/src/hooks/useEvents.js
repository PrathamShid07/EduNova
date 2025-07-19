import { useState, useEffect, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import api from '../services/api';

export const useEvents = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { events, setEvents } = useContext(EventContext);

  const fetchEvents = async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    try {
      const response = await api.get('/events');
      
      // Handle both direct array or nested data structure
      const fetchedEvents = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setEvents([]); // fallback to empty array to avoid crash
    } finally {
      refresh ? setRefreshing(false) : setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      setEvents([...events, response.data]);
      return response.data;
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/register`);
      const updatedEvents = events.map(event =>
        event.id === eventId
          ? { ...event, isRegistered: true, attendees: event.attendees + 1 }
          : event
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // <- added dependency array

  return {
    events: Array.isArray(events) ? events : [],
    loading,
    refreshing,
    fetchEvents,
    createEvent,
    registerForEvent
  };
};
