import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, RotateCcw, ExternalLink, AlertTriangle, Globe } from 'lucide-react';
import SocialShareButtons from '@/components/common/SocialShareButtons';
import { allToolCategories, individualTools } from '@/config/navigation';
import { useToolAnalytics } from '@/hooks/useAnalytics';

const ToolResultPage = ({
  pageTitle,
  metaDescription,
  toolName,
  toolIcon: IconComponent,
  processedFileName,
  fileDescription,
  filePreview,
  onDownload,
  downloadButtonText = "Download File",
  onGoBack,
  goBackPath,
  additionalInfo,
  toolCategory,
  currentToolPath,
  showRelatedTools = true,
  showTryAgain = true,
  customSuccessMessage,
  fileSize,
  processingTime,
  qualityInfo,
  actionButtons
}) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const navigate = useNavigate();
  const { trackFileDownload, trackToolError } = useToolAnalytics(toolName, toolCategory);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isInApp = /FBAN|FBAV|Instagram/.test(userAgent);
    setIsInAppBrowser(isInApp);
  }, []);

  const handleDownload = () => {
    try {
      if (onDownload) {
        onDownload();
        trackFileDownload(processedFileName, fileSize);
      }
    } catch (error) {
      trackToolError('download_error', error.message);
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (goBackPath) {
      navigate(goBackPath);
    } else {
      navigate(-1);
    }
  };

  const handleOpenInBrowser = () => {
    const url = window.location.href;
    const ua = navigator.userAgent;

    if (ua.includes("Instagram") || ua.includes("FBAN") || ua.includes("FBAV")) {
      if (/Android/.test(ua)) {
        window.location.href = "intent://" + url.replace(/^https?:\/\//, '') + "#Intent;scheme=https;package=com.android.chrome;end";
      } else if (/iPhone|iPad|iPod/.test(ua)) {
        alert("Please tap the browser icon (•••) and choose 'Open in Safari' to download your file.");
      } else {
        window.open(url, "_blank");
      }
    } else {
      window.open(url, "_blank");
    }
  };

  const getRelatedTools = () => {
    if (!toolCategory || !currentToolPath) return [];
    
    return individualTools
      .filter(tool => 
        tool.category === toolCategory && 
        tool.path !== currentToolPath
      )
      .slice(0, 4);
  };

  const relatedTools = getRelatedTools();

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {isInAppBrowser && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          >
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                  ⚠️ Please open this page in your browser (e.g., Chrome or Safari) to download your file. In-app browsers may not support downloads.
                </p>
                <Button
                  onClick={handleOpenInBrowser}
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  🌐 Open in Browser
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            {IconComponent && <div className="mr-3"><IconComponent className="w-8 h-8 text-slate-500" /></div>}
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {customSuccessMessage || `${toolName} - Success!`}
            </h1>
          </div>
          
          {fileDescription && (
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
              {fileDescription}
            </p>
          )}

          {(fileSize || processingTime || qualityInfo) && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
              {fileSize && <span>Size: {fileSize}</span>}
              {processingTime && <span>Processed in: {processingTime}</span>}
              {qualityInfo && <span>Quality: {qualityInfo}</span>}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8"
        >
          {filePreview && (
            <div className="mb-6 text-center">
              {filePreview}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isInAppBrowser && onDownload && (
              <Button
                onClick={handleDownload}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download className="w-5 h-5 mr-2" />
                {downloadButtonText}
              </Button>
            )}

            {actionButtons && actionButtons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                size="lg"
                variant={button.variant || "outline"}
                className={button.className || ""}
              >
                {button.icon && <span className="mr-2">{button.icon}</span>}
                {button.text}
              </Button>
            ))}

            {showTryAgain && (
              <Button
                onClick={handleGoBack}
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            )}
          </div>

          {additionalInfo && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {additionalInfo}
              </p>
            </div>
          )}
        </motion.div>

        <SocialShareButtons
          url={currentUrl}
          title={`Check out this ${toolName} result from Toolzenix!`}
          description={fileDescription}
          className="mb-8"
        />

        {showRelatedTools && relatedTools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Related {toolCategory}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <h3 className="font-medium text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Toolzenix Home
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default ToolResultPage;