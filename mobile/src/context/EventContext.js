// src/context/EventContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const EventContext = createContext();

// Create the provider component
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <EventContext.Provider value={{ events, setEvents, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
