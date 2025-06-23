import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, Info, ShieldCheck, Server, Columns, Palette, Wifi, HardDrive, Terminal, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useToast } from '@/components/ui/use-toast.js';

const BrowserInfoViewer = () => {
  const { toast } = useToast();
  const [browserInfo, setBrowserInfo] = useState({});
  const [copiedItem, setCopiedItem] = useState(null);

  useEffect(() => {
    const getBrowserInfo = () => {
      const { userAgent, language, cookieEnabled, platform, product, vendor } = navigator;
      const { width, height, colorDepth, pixelDepth } = window.screen;

      let browserName = "Unknown";
      let browserVersion = "Unknown";

      if (userAgent.includes("Firefox")) {
        browserName = "Mozilla Firefox";
        browserVersion = userAgent.substring(userAgent.indexOf("Firefox") + 8);
      } else if (userAgent.includes("SamsungBrowser")) {
        browserName = "Samsung Internet";
        browserVersion = userAgent.substring(userAgent.indexOf("SamsungBrowser") + 15);
      } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        browserName = "Opera";
        browserVersion = userAgent.substring(userAgent.indexOf("OPR") + 4) || userAgent.substring(userAgent.indexOf("Opera") + 6);
      } else if (userAgent.includes("Edge") || userAgent.includes("Edg")) {
        browserName = "Microsoft Edge";
        browserVersion = userAgent.substring(userAgent.indexOf("Edg/") + 4) || userAgent.substring(userAgent.indexOf("Edge") + 5);
      } else if (userAgent.includes("Chrome")) {
        browserName = "Google Chrome";
        browserVersion = userAgent.substring(userAgent.indexOf("Chrome") + 7, userAgent.indexOf(" Safari"));
      } else if (userAgent.includes("Safari")) {
        browserName = "Apple Safari";
        browserVersion = userAgent.substring(userAgent.indexOf("Version") + 8, userAgent.indexOf(" Safari"));
      }
      
      if (browserVersion.includes(" ")) {
        browserVersion = browserVersion.substring(0, browserVersion.indexOf(" "));
      }
       if (browserVersion.includes(";")) {
        browserVersion = browserVersion.substring(0, browserVersion.indexOf(";"));
      }


      setBrowserInfo({
        userAgent,
        browserName,
        browserVersion,
        language,
        cookiesEnabled: cookieEnabled ? 'Enabled' : 'Disabled',
        os: platform,
        product: product || 'N/A',
        vendor: vendor || 'N/A',
        screenWidth: width,
        screenHeight: height,
        colorDepth,
        pixelDepth: pixelDepth || 'N/A', 
        onlineStatus: navigator.onLine ? 'Online' : 'Offline',
        hardwareConcurrency: navigator.hardwareConcurrency || 'N/A',
      });
    };

    getBrowserInfo();
    
    const onlineHandler = () => setBrowserInfo(prev => ({ ...prev, onlineStatus: 'Online' }));
    const offlineHandler = () => setBrowserInfo(prev => ({ ...prev, onlineStatus: 'Offline' }));

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  const copyToClipboard = (text, itemName) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemName);
    toast({
      title: 'Copied to Clipboard!',
      description: `${itemName} copied successfully.`,
    });
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "circOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };
  
  const InfoRow = ({ icon, label, value, fullWidthValue = false, index }) => (
    <motion.div 
      custom={index}
      variants={itemVariants}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 px-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150 rounded-md"
    >
      <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 sm:mb-0">
        {React.cloneElement(icon, { className: "w-5 h-5 mr-3 text-blue-500" })}
        {label}:
      </div>
      <div className={`flex items-center ${fullWidthValue ? 'w-full mt-1 sm:mt-0 sm:ml-4' : ''}`}>
        <span className={`text-sm text-slate-600 dark:text-slate-200 break-all ${fullWidthValue ? 'flex-grow' : ''}`}>
          {value}
        </span>
        {typeof value === 'string' && value !== 'N/A' && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 p-1 h-auto"
            onClick={() => copyToClipboard(value, label)}
            aria-label={`Copy ${label}`}
          >
            {copiedItem === label ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-500 hover:text-blue-500" />}
          </Button>
        )}
      </div>
    </motion.div>
  );

  const infoItems = [
    { icon: <Terminal />, label: 'User Agent', value: browserInfo.userAgent, fullWidthValue: true },
    { icon: <Globe />, label: 'Browser Name', value: browserInfo.browserName },
    { icon: <Info />, label: 'Browser Version', value: browserInfo.browserVersion },
    { icon: <Server />, label: 'Operating System', value: browserInfo.os },
    { icon: <Info />, label: 'Language', value: browserInfo.language },
    { icon: <ShieldCheck />, label: 'Cookies Enabled', value: browserInfo.cookiesEnabled },
    { icon: <Info />, label: 'Browser Product', value: browserInfo.product },
    { icon: <Info />, label: 'Browser Vendor', value: browserInfo.vendor },
    { icon: <Columns />, label: 'Screen Width', value: `${browserInfo.screenWidth} px` },
    { icon: <Columns />, label: 'Screen Height', value: `${browserInfo.screenHeight} px` },
    { icon: <Palette />, label: 'Color Depth', value: `${browserInfo.colorDepth} bits` },
    { icon: <Palette />, label: 'Pixel Depth', value: browserInfo.pixelDepth === 'N/A' ? 'N/A' : `${browserInfo.pixelDepth} bits` },
    { icon: <Wifi />, label: 'Online Status', value: browserInfo.onlineStatus },
    { icon: <HardDrive />, label: 'Hardware Concurrency', value: browserInfo.hardwareConcurrency },
  ];

  return (
    <>
      <Helmet>
        <title>Browser Information Viewer - Toolzenix</title>
        <meta name="description" content="View detailed information about your web browser, including user agent, version, OS, screen details, and more. All processed client-side." />
        <link rel="canonical" href="https://toolzenix.com/browser-info-viewer" />
        <meta property="og:title" content="Browser Information Viewer - Toolzenix" />
        <meta property="og:description" content="Get insights into your browser's configuration and capabilities with this easy-to-use tool." />
        <meta property="og:url" content="https://toolzenix.com/browser-info-viewer" />
      </Helmet>

      <motion.div 
        className="max-w-3xl mx-auto p-4"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="w-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 shadow-2xl overflow-hidden">
          <CardHeader className="text-center text-white relative overflow-hidden">
             <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundImage: [
                  "radial-gradient(circle at 20% 20%, #ffffff30 0%, #ffffff00 30%)",
                  "radial-gradient(circle at 80% 80%, #ffffff30 0%, #ffffff00 30%)",
                  "radial-gradient(circle at 50% 50%, #ffffff30 0%, #ffffff00 30%)",
                ],
                transition: { duration: 5, repeat: Infinity, ease: "linear" }
              }}
            />
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mx-auto mb-4 w-16 h-16 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Globe className="w-8 h-8" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Browser Information</CardTitle>
            <CardDescription className="text-indigo-100 dark:text-indigo-200">
              Your current browser and system details.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 bg-white dark:bg-slate-800/80 backdrop-blur-md">
            <div className="divide-y divide-slate-200 dark:divide-slate-700 rounded-lg overflow-hidden shadow-inner bg-slate-50/50 dark:bg-slate-800/30">
              {infoItems.map((item, index) => (
                <InfoRow 
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  fullWidthValue={item.fullWidthValue}
                  index={index}
                />
              ))}
            </div>
             <motion.p 
              className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: infoItems.length * 0.05 + 0.3 }}
            >
              All information is retrieved locally by your browser and is not stored by Toolzenix.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default BrowserInfoViewer;