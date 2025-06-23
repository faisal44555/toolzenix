import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Sparkles, Shield, Zap } from 'lucide-react';
import SocialShareButtons from '@/components/common/SocialShareButtons';
import { allToolCategories } from '@/config/navigation';

const ToolPageLayout = ({ children, pageTitle, pageDescription, canonicalPath }) => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const fullPageTitle = `${pageTitle} | Toolzenix`;
  const shareTitle = `Check out this tool: ${pageTitle} on Toolzenix!`;
  
  const getCategoryFromPath = (path) => {
    return allToolCategories.find(cat => path.startsWith(cat.path));
  };

  const category = getCategoryFromPath(canonicalPath || '');

  const toolFeatures = [
    { icon: <Zap className="w-4 h-4 text-yellow-500" />, text: "Instant processing" },
    { icon: <Shield className="w-4 h-4 text-green-500" />, text: "100% private & secure" },
    { icon: <Sparkles className="w-4 h-4 text-blue-500" />, text: "No registration needed" }
  ];

  return (
    <>
      <Helmet>
        <title>{fullPageTitle}</title>
        {pageDescription && <meta name="description" content={pageDescription} />}
        {canonicalPath && <link rel="canonical" href={`https://toolzenix.com${canonicalPath}`} />}
        <meta property="og:title" content={fullPageTitle} />
        <meta property="og:description" content={pageDescription || `Use ${pageTitle} for free on Toolzenix - fast, secure, and easy to use.`} />
        <meta property="og:url" content={`https://toolzenix.com${canonicalPath || ''}`} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`${pageTitle}, free online tool, ${category?.name || 'online utility'}, toolzenix`} />
      </Helmet>
      
      <div className="tool-page-content">
        {category && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              <span className="mx-2">/</span>
              <Link to={category.path} className="hover:text-blue-600 dark:hover:text-blue-400">{category.name}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-gray-100">{pageTitle}</span>
            </nav>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {pageTitle}
          </h1>
          
          {pageDescription && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
              {pageDescription}
            </p>
          )}

          <div className="flex flex-wrap gap-4 mb-6">
            {toolFeatures.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                {feature.icon}
                <span className="ml-1">{feature.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How to Use This Tool</h3>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>1. Upload or input your data using the interface above</li>
                  <li>2. Adjust any settings or options as needed</li>
                  <li>3. Click the process/convert button to get your result</li>
                  <li>4. Download or copy your processed output</li>
                </ol>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-3">
                  ✨ All processing happens in your browser - your data never leaves your device!
                </p>
              </div>
            </div>
          </div>

          <SocialShareButtons
            url={currentUrl}
            title={shareTitle}
            className="mb-8"
          />

          {category && (
            <div className="text-center">
              <Link 
                to={category.path}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {category.name}
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ToolPageLayout;