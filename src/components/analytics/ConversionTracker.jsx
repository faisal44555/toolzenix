import React, { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

const ConversionTracker = ({ 
  conversionType, 
  toolName, 
  toolCategory, 
  value = 1, 
  trigger = 'mount',
  children 
}) => {
  useEffect(() => {
    if (trigger === 'mount') {
      trackEvent('conversion', {
        category: 'conversion_tracking',
        conversion_type: conversionType,
        tool_name: toolName,
        tool_category: toolCategory,
        value: value,
        label: `${conversionType} - ${toolName}`
      });
    }
  }, [conversionType, toolName, toolCategory, value, trigger]);

  const handleClick = () => {
    if (trigger === 'click') {
      trackEvent('conversion', {
        category: 'conversion_tracking',
        conversion_type: conversionType,
        tool_name: toolName,
        tool_category: toolCategory,
        value: value,
        label: `${conversionType} - ${toolName}`
      });
    }
  };

  if (children && trigger === 'click') {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return children || null;
};

export default ConversionTracker;