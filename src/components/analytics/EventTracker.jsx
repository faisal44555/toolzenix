import React from 'react';
import { trackEvent } from '@/utils/analytics';

const EventTracker = ({ 
  eventName, 
  eventData = {}, 
  trigger = 'click', 
  children 
}) => {
  const handleEvent = () => {
    trackEvent(eventName, {
      category: eventData.category || 'user_interaction',
      label: eventData.label || '',
      value: eventData.value || 1,
      ...eventData
    });
  };

  const eventHandlers = {
    click: { onClick: handleEvent },
    hover: { onMouseEnter: handleEvent },
    focus: { onFocus: handleEvent },
    submit: { onSubmit: handleEvent }
  };

  if (children) {
    return React.cloneElement(children, eventHandlers[trigger] || {});
  }

  return null;
};

export default EventTracker;