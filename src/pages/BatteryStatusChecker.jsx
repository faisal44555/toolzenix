import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, Zap, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const BatteryStatusChecker = () => {
  const { toast } = useToast();
  const [batteryInfo, setBatteryInfo] = useState({
    supported: 'navigator' in window && 'getBattery' in navigator,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    if (!batteryInfo.supported) {
      toast({
        variant: "destructive",
        title: "Unsupported Feature",
        description: "The Battery Status API is not supported by your browser.",
      });
      return;
    }

    let batteryManager;

    const updateBatteryStatus = (battery) => {
      setBatteryInfo(prev => ({
        ...prev,
        level: Math.round(battery.level * 100),
        charging: battery.charging,
        chargingTime: battery.chargingTime === Infinity ? 'Calculating...' : formatTime(battery.chargingTime),
        dischargingTime: battery.dischargingTime === Infinity ? 'Calculating...' : formatTime(battery.dischargingTime),
      }));
    };

    const formatTime = (seconds) => {
      if (seconds === null || seconds === undefined || !isFinite(seconds) || seconds === 0) return 'N/A';
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      let timeString = '';
      if (h > 0) timeString += `${h}h `;
      if (m > 0) timeString += `${m}m`;
      return timeString.trim() || 'Less than a minute';
    };
    
    navigator.getBattery().then((battery) => {
      batteryManager = battery;
      updateBatteryStatus(batteryManager);

      batteryManager.addEventListener('levelchange', () => updateBatteryStatus(batteryManager));
      batteryManager.addEventListener('chargingchange', () => updateBatteryStatus(batteryManager));
      batteryManager.addEventListener('chargingtimechange', () => updateBatteryStatus(batteryManager));
      batteryManager.addEventListener('dischargingtimechange', () => updateBatteryStatus(batteryManager));
    }).catch(error => {
      console.error("Error accessing battery status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access battery status information.",
      });
      setBatteryInfo(prev => ({ ...prev, supported: false }));
    });

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', () => updateBatteryStatus(batteryManager));
        batteryManager.removeEventListener('chargingchange', () => updateBatteryStatus(batteryManager));
        batteryManager.removeEventListener('chargingtimechange', () => updateBatteryStatus(batteryManager));
        batteryManager.removeEventListener('dischargingtimechange', () => updateBatteryStatus(batteryManager));
      }
    };
  }, [batteryInfo.supported, toast]);

  const getBatteryIcon = () => {
    if (batteryInfo.charging) return <BatteryCharging className="w-10 h-10 text-green-500" />;
    if (batteryInfo.level === null) return <Info className="w-10 h-10 text-slate-500" />;
    if (batteryInfo.level > 75) return <BatteryFull className="w-10 h-10 text-green-500" />;
    if (batteryInfo.level > 25) return <BatteryMedium className="w-10 h-10 text-yellow-500" />;
    return <BatteryLow className="w-10 h-10 text-red-500" />;
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
    })
  };

  const InfoDisplay = ({ icon, label, value, index }) => (
    <motion.div 
      custom={index}
      variants={itemVariants}
      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg shadow-sm"
    >
      <div className="flex items-center">
        {React.cloneElement(icon, { className: "w-5 h-5 mr-3 text-sky-500" })}
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}:</span>
      </div>
      <span className="text-sm text-slate-600 dark:text-slate-200 font-semibold">{value !== null ? value : 'N/A'}</span>
    </motion.div>
  );

  if (!batteryInfo.supported) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <Info className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-100">Battery Status API Not Supported</h2>
        <p className="text-slate-600 dark:text-slate-300">Your browser does not support the Battery Status API, or access was denied.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Battery Status Checker - Toolzenix</title>
        <meta name="description" content="Check your device's battery level, charging status, and estimated time remaining. Real-time battery information." />
        <link rel="canonical" href="https://toolzenix.com/battery-status-checker" />
        <meta property="og:title" content="Battery Status Checker - Toolzenix" />
        <meta property="og:description" content="Instantly view your device's battery health and status." />
        <meta property="og:url" content="https://toolzenix.com/battery-status-checker" />
      </Helmet>

      <motion.div
        className="max-w-md mx-auto p-4"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="w-full bg-gradient-to-br from-green-400 via-teal-500 to-cyan-600 dark:from-green-600 dark:via-teal-700 dark:to-cyan-800 shadow-xl overflow-hidden">
          <CardHeader className="text-center text-white">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
              className="mx-auto mb-4 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              {getBatteryIcon()}
            </motion.div>
            <CardTitle className="text-3xl font-bold">Battery Status</CardTitle>
            <CardDescription className="text-green-100 dark:text-green-200">
              Real-time information about your device's battery.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            {batteryInfo.level !== null && (
              <motion.div custom={0} variants={itemVariants} className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Battery Level</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{batteryInfo.level}%</span>
                </div>
                <Progress value={batteryInfo.level} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-emerald-500" />
              </motion.div>
            )}
            
            <div className="space-y-3">
              <InfoDisplay 
                icon={<Zap />} 
                label="Charging Status" 
                value={batteryInfo.charging === null ? 'N/A' : batteryInfo.charging ? 'Charging' : 'Not Charging'}
                index={1}
              />
              {batteryInfo.charging && batteryInfo.chargingTime && (
                <InfoDisplay 
                  icon={<Clock />} 
                  label="Time to Full" 
                  value={batteryInfo.chargingTime}
                  index={2}
                />
              )}
              {!batteryInfo.charging && batteryInfo.dischargingTime && (
                <InfoDisplay 
                  icon={<Clock />} 
                  label="Time Remaining" 
                  value={batteryInfo.dischargingTime}
                  index={3}
                />
              )}
            </div>
            <motion.p 
              className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Battery information is provided by your browser and may not be available on all devices or browsers.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default BatteryStatusChecker;