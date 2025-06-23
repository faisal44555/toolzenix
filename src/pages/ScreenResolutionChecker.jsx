import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Maximize, MonitorSmartphone, Palette, ZoomIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';

const ScreenResolutionChecker = () => {
  const [resolution, setResolution] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio,
    colorDepth: window.screen.colorDepth,
  });

  useEffect(() => {
    const handleResize = () => {
      setResolution({
        width: window.innerWidth,
        height: window.innerHeight,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        devicePixelRatio: window.devicePixelRatio,
        colorDepth: window.screen.colorDepth,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const InfoItem = ({ icon, label, value, unit = '', gradient }) => (
    <motion.div 
      className={`p-4 rounded-lg shadow-md flex flex-col items-center text-center ${gradient || 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800'}`}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"}}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-3 bg-white dark:bg-slate-900 rounded-full mb-3 shadow-inner">
        {icon}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        {value} <span className="text-lg">{unit}</span>
      </p>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Screen Resolution Checker - Toolzenix</title>
        <meta name="description" content="Instantly check your screen resolution, viewport size, device pixel ratio, and color depth. A free online tool for developers and designers." />
        <link rel="canonical" href="https://toolzenix.com/screen-resolution-checker" />
        <meta property="og:title" content="Screen Resolution Checker - Toolzenix" />
        <meta property="og:description" content="Find out your screen and viewport dimensions, pixel density, and color depth with this easy-to-use tool." />
        <meta property="og:url" content="https://toolzenix.com/screen-resolution-checker" />
      </Helmet>

      <motion.div 
        className="max-w-4xl mx-auto p-4"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="w-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 dark:from-sky-700 dark:via-blue-700 dark:to-indigo-800 shadow-xl overflow-hidden">
          <CardHeader className="text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="mx-auto mb-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Maximize className="w-8 h-8" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Screen Resolution Checker</CardTitle>
            <CardDescription className="text-sky-100 dark:text-sky-200">
              Discover detailed information about your display.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <InfoItem
                icon={<MonitorSmartphone className="w-8 h-8 text-blue-500" />}
                label="Viewport Size"
                value={`${resolution.width} x ${resolution.height}`}
                unit="px"
                gradient="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-700/50 dark:to-blue-800/50"
              />
              <InfoItem
                icon={<Maximize className="w-8 h-8 text-green-500" />}
                label="Screen Resolution"
                value={`${resolution.screenWidth} x ${resolution.screenHeight}`}
                unit="px"
                gradient="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-700/50 dark:to-green-800/50"
              />
              <InfoItem
                icon={<ZoomIn className="w-8 h-8 text-purple-500" />}
                label="Device Pixel Ratio"
                value={resolution.devicePixelRatio.toFixed(2)}
                gradient="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-700/50 dark:to-purple-800/50"
              />
              <InfoItem
                icon={<Palette className="w-8 h-8 text-red-500" />}
                label="Color Depth"
                value={resolution.colorDepth}
                unit="bits"
                gradient="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-700/50 dark:to-red-800/50"
              />
            </div>
            <motion.p 
              className="mt-8 text-center text-sm text-slate-600 dark:text-slate-300 p-3 bg-slate-100 dark:bg-slate-700 rounded-md shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The viewport size updates dynamically if you resize your browser window. Screen resolution, pixel ratio, and color depth are based on your device's display settings.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ScreenResolutionChecker;