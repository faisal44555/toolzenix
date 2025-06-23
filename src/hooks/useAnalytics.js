import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as analytics from '@/utils/analytics';

export const useAnalytics = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const engagementTimerRef = useRef(null);

  useEffect(() => {
    analytics.trackPageView(location.pathname, document.title);
    startTimeRef.current = Date.now();

    engagementTimerRef.current = setInterval(() => {
      analytics.trackUserEngagement(
        'time_on_page',
        Date.now() - startTimeRef.current,
        location.pathname
      );
    }, 30000);

    return () => {
      if (engagementTimerRef.current) {
        clearInterval(engagementTimerRef.current);
      }
      
      const timeOnPage = Date.now() - startTimeRef.current;
      if (timeOnPage > 5000) {
        analytics.trackUserEngagement('page_exit', timeOnPage, location.pathname);
      }
    };
  }, [location.pathname]);

  const trackToolInteraction = (toolName, toolCategory, action, additionalData = {}) => {
    switch (action) {
      case 'opened':
        analytics.trackToolOpened(toolName, toolCategory, location.pathname);
        break;
      case 'used':
        analytics.trackToolUsed(toolName, toolCategory, additionalData.toolAction, additionalData.fileType, additionalData.fileSize);
        break;
      case 'downloaded':
        analytics.trackToolDownloaded(toolName, toolCategory, additionalData.fileName, additionalData.fileSize, additionalData.processingTime);
        break;
      default:
        analytics.trackEvent('tool_interaction', {
          category: 'tool_usage',
          tool_name: toolName,
          tool_category: toolCategory,
          action: action,
          ...additionalData
        });
    }
  };

  const trackFileOperation = (operation, fileData) => {
    switch (operation) {
      case 'upload':
        analytics.trackImageUploaded(
          fileData.toolName,
          fileData.fileType,
          fileData.fileSize,
          fileData.dimensions
        );
        break;
      case 'convert':
        analytics.trackFileConverted(
          fileData.toolName,
          fileData.fromFormat,
          fileData.toFormat,
          fileData.fileSize,
          fileData.conversionTime
        );
        break;
      case 'pdf_action':
        analytics.trackPDFAction(
          fileData.action,
          fileData.pageCount,
          fileData.fileSize,
          fileData.processingTime
        );
        break;
      case 'qr_generated':
        analytics.trackQRGenerated(
          fileData.qrType,
          fileData.qrSize,
          fileData.errorLevel,
          fileData.customization
        );
        break;
    }
  };

  const trackUserAction = (actionType, actionData) => {
    switch (actionType) {
      case 'share':
        analytics.trackShareButtonClicked(
          actionData.platform,
          actionData.contentType,
          actionData.toolName
        );
        break;
      case 'cta_click':
        analytics.trackCTAClicked(
          actionData.ctaText,
          actionData.ctaLocation,
          actionData.targetTool
        );
        break;
      case 'search':
        analytics.trackSearchQuery(
          actionData.query,
          actionData.resultsCount,
          actionData.selectedResult
        );
        break;
      case 'blog_read':
        analytics.trackBlogRead(
          actionData.blogTitle,
          actionData.blogCategory,
          actionData.readingTime,
          actionData.scrollDepth
        );
        break;
      case 'blog_tool_click':
        analytics.trackBlogToolClick(
          actionData.blogTitle,
          actionData.toolName,
          actionData.toolCategory
        );
        break;
      case 'tool_from_blog':
        analytics.trackToolPageFromBlog(
          actionData.blogTitle,
          actionData.toolName,
          actionData.toolCategory
        );
        break;
    }
  };

  const trackConversion = (conversionType, conversionData) => {
    analytics.trackConversionFunnel(
      conversionType,
      conversionData.toolName,
      conversionData.toolCategory,
      conversionData.value || 1
    );
  };

  const trackError = (errorType, errorMessage, toolName) => {
    analytics.trackErrorOccurred(errorType, errorMessage, toolName, navigator.userAgent);
  };

  return {
    trackToolInteraction,
    trackFileOperation,
    trackUserAction,
    trackConversion,
    trackError,
    trackEvent: analytics.trackEvent
  };
};

export const useToolAnalytics = (toolName, toolCategory) => {
  const { trackToolInteraction, trackFileOperation, trackConversion, trackError } = useAnalytics();
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    trackToolInteraction(toolName, toolCategory, 'opened');
    startTimeRef.current = Date.now();

    return () => {
      const timeSpent = Date.now() - startTimeRef.current;
      if (timeSpent > 3000) {
        analytics.trackUserEngagement('tool_session', timeSpent, toolName);
      }
    };
  }, [toolName, toolCategory]);

  const trackToolUsage = (action, fileData = {}) => {
    const processingTime = Date.now() - startTimeRef.current;
    
    trackToolInteraction(toolName, toolCategory, 'used', {
      toolAction: action,
      fileType: fileData.type,
      fileSize: fileData.size,
      processingTime
    });

    trackConversion('tool_used', {
      toolName,
      toolCategory,
      value: 1
    });
  };

  const trackFileUpload = (file, dimensions = null) => {
    trackFileOperation('upload', {
      toolName,
      fileType: file.type,
      fileSize: file.size,
      dimensions: dimensions
    });
  };

  const trackFileDownload = (fileName, fileSize) => {
    const processingTime = Date.now() - startTimeRef.current;
    
    trackToolInteraction(toolName, toolCategory, 'downloaded', {
      fileName,
      fileSize,
      processingTime
    });

    trackConversion('tool_downloaded', {
      toolName,
      toolCategory,
      value: 1
    });
  };

  const trackConversionSuccess = (fromFormat, toFormat, fileSize) => {
    const conversionTime = Date.now() - startTimeRef.current;
    
    trackFileOperation('convert', {
      toolName,
      fromFormat,
      toFormat,
      fileSize,
      conversionTime
    });
  };

  const trackToolError = (errorType, errorMessage) => {
    trackError(errorType, errorMessage, toolName);
  };

  return {
    trackToolUsage,
    trackFileUpload,
    trackFileDownload,
    trackConversionSuccess,
    trackToolError
  };
};

export const useBlogAnalytics = (blogTitle, blogCategory) => {
  const { trackUserAction } = useAnalytics();
  const startTimeRef = useRef(Date.now());
  const scrollDepthRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      scrollDepthRef.current = Math.max(scrollDepthRef.current, scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      const readingTime = Date.now() - startTimeRef.current;
      if (readingTime > 10000) {
        trackUserAction('blog_read', {
          blogTitle,
          blogCategory,
          readingTime,
          scrollDepth: scrollDepthRef.current
        });
      }
    };
  }, [blogTitle, blogCategory]);

  const trackBlogToolClick = (toolName, toolCategory) => {
    trackUserAction('blog_tool_click', {
      blogTitle,
      toolName,
      toolCategory
    });
  };

  return {
    trackBlogToolClick
  };
};