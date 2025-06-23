import { trackScrollDepth, trackPerformanceMetrics, trackErrorOccurred } from './analyticsEvents';
import { throttle } from './analyticsHelpers';

export const setupScrollTracking = () => {
  let scrollDepths = [25, 50, 75, 100];
  let trackedDepths = new Set();
  
  const trackScrollDepthThrottled = throttle(() => {
    if (document.documentElement.scrollHeight <= window.innerHeight) return;
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    
    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        trackScrollDepth(depth, window.location.pathname, document.title);
      }
    });
  }, 500);

  window.addEventListener('scroll', trackScrollDepthThrottled);
  
  return () => {
    window.removeEventListener('scroll', trackScrollDepthThrottled);
  };
};

export const setupPerformanceTracking = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          trackPerformanceMetrics(
            window.location.pathname,
            Math.round(perfData.loadEventEnd - perfData.fetchStart),
            Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
            Math.round(perfData.responseStart - perfData.fetchStart)
          );
        }
      }, 1000);
    });
  }
};

export const setupErrorTracking = () => {
  window.addEventListener('error', (event) => {
    trackErrorOccurred(
      'javascript_error',
      event.message,
      window.location.pathname,
      navigator.userAgent
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackErrorOccurred(
      'promise_rejection',
      event.reason?.message || 'Unhandled promise rejection',
      window.location.pathname,
      navigator.userAgent
    );
  });
};