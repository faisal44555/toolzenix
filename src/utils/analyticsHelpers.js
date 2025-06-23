export const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let deviceType = 'desktop';
  let browser = 'unknown';
  let browserVersion = 'unknown';
  let os = 'unknown';

  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
    deviceType = 'mobile';
  }

  if (ua.indexOf('Chrome') > -1) {
    browser = 'Chrome';
    browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'unknown';
  } else if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox';
    browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'unknown';
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Safari';
    browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || 'unknown';
  } else if (ua.indexOf('Edge') > -1) {
    browser = 'Edge';
    browserVersion = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'unknown';
  }

  if (ua.indexOf('Windows') > -1) os = 'Windows';
  else if (ua.indexOf('Mac') > -1) os = 'macOS';
  else if (ua.indexOf('Linux') > -1) os = 'Linux';
  else if (ua.indexOf('Android') > -1) os = 'Android';
  else if (ua.indexOf('iOS') > -1) os = 'iOS';

  return {
    deviceType,
    browser,
    browserVersion,
    os,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    connectionType: navigator.connection?.effectiveType || 'unknown'
  };
};

export const getTrafficSourceData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  
  let source = 'direct';
  let medium = 'none';
  
  if (referrer) {
    if (referrer.includes('google.com')) {
      source = 'google';
      medium = 'organic';
    } else if (referrer.includes('facebook.com')) {
      source = 'facebook';
      medium = 'social';
    } else if (referrer.includes('instagram.com')) {
      source = 'instagram';
      medium = 'social';
    } else if (referrer.includes('twitter.com') || referrer.includes('t.co')) {
      source = 'twitter';
      medium = 'social';
    } else if (referrer.includes('linkedin.com')) {
      source = 'linkedin';
      medium = 'social';
    } else {
      source = 'referral';
      medium = 'referral';
    }
  }

  return {
    source: urlParams.get('utm_source') || source,
    medium: urlParams.get('utm_medium') || medium,
    campaign: urlParams.get('utm_campaign') || '',
    referrer: referrer,
    utmSource: urlParams.get('utm_source') || '',
    utmMedium: urlParams.get('utm_medium') || '',
    utmCampaign: urlParams.get('utm_campaign') || ''
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};