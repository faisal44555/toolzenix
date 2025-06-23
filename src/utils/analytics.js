import { initializeGA } from './analyticsCore';
import * as eventTrackers from './analyticsEvents';
import { getDeviceInfo, getTrafficSourceData, generateSessionId } from './analyticsHelpers';
import { setupScrollTracking, setupPerformanceTracking, setupErrorTracking } from './analyticsSetup';

export * from './analyticsCore';
export * from './analyticsEvents';

export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    initializeGA();
    
    const deviceInfo = getDeviceInfo();
    eventTrackers.trackDeviceInfo(deviceInfo);

    const trafficData = getTrafficSourceData();
    eventTrackers.trackTrafficSource(trafficData);

    eventTrackers.trackSessionStart(
      trafficData.source,
      deviceInfo.deviceType,
      localStorage.getItem('returning_user') ? 'returning' : 'new',
      generateSessionId()
    );
    
    localStorage.setItem('returning_user', 'true');
    
    setupScrollTracking();
    setupPerformanceTracking();
    setupErrorTracking();
  }
};