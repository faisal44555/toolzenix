import { trackEvent } from './analyticsCore';

export const trackToolOpened = (toolName, toolCategory, toolPath) => {
  trackEvent('tool_opened', {
    category: 'tool_interaction',
    tool_name: toolName,
    tool_category: toolCategory,
    tool_path: toolPath,
    label: `${toolCategory} - ${toolName}`,
    engagement_time_msec: Date.now()
  });
};

export const trackToolUsed = (toolName, toolCategory, toolAction, fileType = '', fileSize = 0) => {
  trackEvent('tool_used', {
    category: 'tool_usage',
    tool_name: toolName,
    tool_category: toolCategory,
    tool_action: toolAction,
    file_type: fileType,
    file_size: fileSize,
    label: `${toolName} - ${toolAction}`,
    value: 1
  });
};

export const trackToolDownloaded = (toolName, toolCategory, fileName, fileSize, processingTime) => {
  trackEvent('tool_downloaded', {
    category: 'conversion',
    tool_name: toolName,
    tool_category: toolCategory,
    file_name: fileName,
    file_size: fileSize,
    processing_time: processingTime,
    label: `Download - ${toolName}`,
    value: 1,
    conversion: true
  });
};

export const trackImageUploaded = (toolName, imageType, imageSize, imageDimensions) => {
  trackEvent('image_uploaded', {
    category: 'file_upload',
    tool_name: toolName,
    image_type: imageType,
    image_size: imageSize,
    image_dimensions: imageDimensions,
    label: `Image Upload - ${toolName}`,
    value: 1
  });
};

export const trackFileConverted = (toolName, fromFormat, toFormat, fileSize, conversionTime) => {
  trackEvent('file_converted', {
    category: 'conversion_success',
    tool_name: toolName,
    from_format: fromFormat,
    to_format: toFormat,
    file_size: fileSize,
    conversion_time: conversionTime,
    label: `${fromFormat} to ${toFormat}`,
    value: 1
  });
};

export const trackQRGenerated = (qrType, qrSize, errorLevel, customization) => {
  trackEvent('qr_generated', {
    category: 'qr_tools',
    qr_type: qrType,
    qr_size: qrSize,
    error_level: errorLevel,
    customization: customization,
    label: `QR Generated - ${qrType}`,
    value: 1
  });
};

export const trackPDFAction = (action, pageCount, fileSize, processingTime) => {
  const eventName = `pdf_${action}`;
  trackEvent(eventName, {
    category: 'pdf_tools',
    pdf_action: action,
    page_count: pageCount,
    file_size: fileSize,
    processing_time: processingTime,
    label: `PDF ${action}`,
    value: 1
  });
};

export const trackShareButtonClicked = (platform, contentType, toolName) => {
  trackEvent('share_button_clicked', {
    category: 'social_sharing',
    platform: platform,
    content_type: contentType,
    tool_name: toolName,
    label: `Share on ${platform}`,
    value: 1
  });
};

export const trackCTAClicked = (ctaText, ctaLocation, targetTool) => {
  trackEvent('cta_clicked', {
    category: 'user_engagement',
    cta_text: ctaText,
    cta_location: ctaLocation,
    target_tool: targetTool,
    label: `CTA: ${ctaText}`,
    value: 1
  });
};

export const trackBlogRead = (blogTitle, blogCategory, readingTime, scrollDepth) => {
  trackEvent('blog_read', {
    category: 'content_engagement',
    blog_title: blogTitle,
    blog_category: blogCategory,
    reading_time: readingTime,
    scroll_depth: scrollDepth,
    label: `Blog: ${blogTitle}`,
    value: 1
  });
};

export const trackBlogToolClick = (blogTitle, toolName, toolCategory) => {
  trackEvent('blog_tool_clicked', {
    category: 'blog_conversion',
    blog_title: blogTitle,
    tool_name: toolName,
    tool_category: toolCategory,
    label: `Blog to Tool: ${toolName}`,
    value: 1
  });
};

export const trackScrollDepth = (depth, pagePath, pageTitle) => {
  const eventName = `scroll_depth_${depth}`;
  trackEvent(eventName, {
    category: 'user_engagement',
    scroll_depth: depth,
    page_path: pagePath,
    page_title: pageTitle,
    label: `Scroll ${depth}%`,
    value: depth
  });
};

export const trackSessionStart = (trafficSource, deviceType, userType, sessionId) => {
  trackEvent('session_start', {
    category: 'session_tracking',
    traffic_source: trafficSource,
    device_type: deviceType,
    user_type: userType,
    session_id: sessionId,
    label: `Session Start - ${trafficSource}`,
    value: 1
  });
};

export const trackToolPageFromBlog = (blogTitle, toolName, toolCategory) => {
  trackEvent('tool_page_from_blog', {
    category: 'blog_funnel',
    blog_title: blogTitle,
    tool_name: toolName,
    tool_category: toolCategory,
    label: `Blog Funnel: ${blogTitle} → ${toolName}`,
    value: 1
  });
};

export const trackSearchQuery = (query, resultsCount, selectedResult) => {
  trackEvent('site_search', {
    category: 'search',
    search_term: query,
    results_count: resultsCount,
    selected_result: selectedResult,
    label: `Search: ${query}`,
    value: resultsCount
  });
};

export const trackErrorOccurred = (errorType, errorMessage, toolName, userAgent) => {
  trackEvent('error_occurred', {
    category: 'error_tracking',
    error_type: errorType,
    error_message: errorMessage,
    tool_name: toolName,
    user_agent: userAgent,
    label: `Error: ${errorType}`,
    value: 0
  });
};

export const trackUserEngagement = (engagementType, duration, toolName) => {
  trackEvent('user_engagement', {
    category: 'engagement_metrics',
    engagement_type: engagementType,
    engagement_duration: duration,
    tool_name: toolName,
    label: `Engagement: ${engagementType}`,
    value: duration
  });
};

export const trackConversionFunnel = (funnelStep, toolName, toolCategory, stepValue) => {
  trackEvent('conversion_funnel', {
    category: 'funnel_tracking',
    funnel_step: funnelStep,
    tool_name: toolName,
    tool_category: toolCategory,
    step_value: stepValue,
    label: `Funnel: ${funnelStep} - ${toolName}`,
    value: stepValue
  });
};

export const trackDeviceInfo = (deviceInfo) => {
  trackEvent('device_info', {
    category: 'device_tracking',
    device_type: deviceInfo.deviceType,
    browser: deviceInfo.browser,
    browser_version: deviceInfo.browserVersion,
    os: deviceInfo.os,
    screen_resolution: deviceInfo.screenResolution,
    viewport_size: deviceInfo.viewportSize,
    connection_type: deviceInfo.connectionType,
    label: `Device: ${deviceInfo.deviceType} - ${deviceInfo.browser}`,
    value: 1
  });
};

export const trackTrafficSource = (trafficData) => {
  trackEvent('traffic_source', {
    category: 'traffic_analysis',
    source: trafficData.source,
    medium: trafficData.medium,
    campaign: trafficData.campaign,
    referrer: trafficData.referrer,
    utm_source: trafficData.utmSource,
    utm_medium: trafficData.utmMedium,
    utm_campaign: trafficData.utmCampaign,
    label: `Traffic: ${trafficData.source}`,
    value: 1
  });
};

export const trackPerformanceMetrics = (pagePath, loadTime, domContentLoaded, firstPaint) => {
  trackEvent('performance_metrics', {
    category: 'performance',
    page_path: pagePath,
    load_time: loadTime,
    dom_content_loaded: domContentLoaded,
    first_paint: firstPaint,
    label: `Performance: ${pagePath}`,
    value: loadTime
  });
};