const GA_TRACKING_ID = 'G-595ZG69BQ2';

export const initializeGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
      enhanced_measurement: {
        scrolls: true,
        outbound_clicks: true,
        site_search: true,
        file_downloads: true,
        video_engagement: true
      }
    });
  }
};

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventData = {
      event_category: parameters.category || 'general',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      custom_parameter_1: parameters.custom_parameter_1 || '',
      custom_parameter_2: parameters.custom_parameter_2 || '',
      page_path: window.location.pathname,
      page_title: document.title,
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      timestamp: new Date().toISOString(),
      ...parameters
    };

    window.gtag('event', eventName, eventData);
    
    console.log(`GA4 Event Tracked: ${eventName}`, eventData);
  }
};

export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href
    });
    
    trackEvent('page_view', {
      category: 'navigation',
      page_path: pagePath,
      page_title: pageTitle,
      referrer: document.referrer,
      user_engagement: 'page_view'
    });
  }
};