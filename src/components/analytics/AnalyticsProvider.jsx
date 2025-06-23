import React, { createContext, useContext, useEffect } from 'react';
import { initializeAnalytics } from '@/utils/analytics';

const AnalyticsContext = createContext();

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  const value = {
    initialized: true
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};