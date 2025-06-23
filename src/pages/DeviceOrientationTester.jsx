import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SmartphoneNfc, Compass, Info, AlertTriangle, HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DeviceOrientationTester = () => {
  const { toast } = useToast();
  const [orientation, setOrientation] = useState({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
  });
  const [permissionStatus, setPermissionStatus] = useState('prompt'); 
  const [isSupported, setIsSupported] = useState(true);

  const handleOrientation = useCallback((event) => {
    setOrientation({
      alpha: event.alpha !== null ? event.alpha.toFixed(2) : 'N/A',
      beta: event.beta !== null ? event.beta.toFixed(2) : 'N/A',
      gamma: event.gamma !== null ? event.gamma.toFixed(2) : 'N/A',
      absolute: event.absolute,
    });
  }, []);

  const requestDeviceOrientationPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setPermissionStatus('granted');
          toast({ title: 'Permission Granted', description: 'Device orientation tracking started.' });
        } else {
          setPermissionStatus('denied');
          toast({ variant: 'destructive', title: 'Permission Denied', description: 'Cannot access device orientation.' });
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        setPermissionStatus('denied');
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to request permission.' });
      }
    } else if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation);
      setPermissionStatus('granted'); 
    } else {
      setIsSupported(false);
      setPermissionStatus('denied');
      toast({ variant: 'destructive', title: 'Not Supported', description: 'Device Orientation API is not supported by your browser or device.' });
    }
  }, [handleOrientation, toast]);

  useEffect(() => {
    if (typeof DeviceOrientationEvent === 'undefined') {
      setIsSupported(false);
      setPermissionStatus('denied');
      toast({ variant: 'destructive', title: 'Not Supported', description: 'Device Orientation API is not supported on this device/browser.' });
      return;
    }

    if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation);
      setPermissionStatus('granted');
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation, toast]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.3 } })
  };

  const DataRow = ({ icon, label, value, unit, index }) => (
    <motion.div 
      custom={index}
      variants={itemVariants}
      className="flex items-center justify-between py-3 px-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
    >
      <div className="flex items-center">
        {React.cloneElement(icon, { className: "w-5 h-5 mr-3 text-blue-500 dark:text-sky-400" })}
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}:</span>
      </div>
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {value !== 'N/A' && value !== null ? `${value}${unit}` : 'N/A'}
      </span>
    </motion.div>
  );

  const getPhoneRotationStyle = () => {
    let x = 0, y = 0;
    if (orientation.beta !== null && orientation.beta !== 'N/A') {
      x = Math.max(-45, Math.min(45, parseFloat(orientation.beta))); 
    }
    if (orientation.gamma !== null && orientation.gamma !== 'N/A') {
      y = Math.max(-45, Math.min(45, parseFloat(orientation.gamma)));
    }
    return {
      transform: `perspective(500px) rotateX(${x}deg) rotateY(${y}deg)`,
      transition: 'transform 0.1s ease-out'
    };
  };


  if (!isSupported) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-100">Device Orientation API Not Supported</h2>
          <p className="text-slate-600 dark:text-slate-400">Your browser or device does not support the Device Orientation API.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Device Orientation Tester - Toolzenix</title>
        <meta name="description" content="Test and view your device's orientation (alpha, beta, gamma) in real-time. Client-side sensor data visualization." />
        <link rel="canonical" href="https://toolzenix.com/device-orientation-tester" />
      </Helmet>
      <motion.div 
        className="max-w-lg mx-auto p-4"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="w-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 dark:from-purple-700 dark:via-pink-700 dark:to-orange-700 shadow-2xl overflow-hidden">
          <CardHeader className="text-center text-white">
             <motion.div
              style={permissionStatus === 'granted' ? getPhoneRotationStyle() : {}}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay:0.2 }}
              className="mx-auto mb-4 w-20 h-20 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <SmartphoneNfc className="w-10 h-10" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Device Orientation</CardTitle>
            <CardDescription className="text-purple-100 dark:text-purple-200">
              Live sensor data from your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            {permissionStatus === 'prompt' && typeof DeviceOrientationEvent.requestPermission === 'function' && (
              <motion.div 
                initial={{ opacity:0, y:10 }} 
                animate={{ opacity:1, y:0 }} 
                className="text-center p-4 mb-4 bg-yellow-100 dark:bg-yellow-800/50 border border-yellow-300 dark:border-yellow-700 rounded-lg"
              >
                <HelpCircle className="w-8 h-8 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
                <p className="mb-3 text-sm text-yellow-700 dark:text-yellow-300">This tool needs permission to access device orientation sensors.</p>
                <Button onClick={requestDeviceOrientationPermission} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  Grant Permission
                </Button>
              </motion.div>
            )}

            {permissionStatus === 'denied' && isSupported && (
               <motion.div 
                initial={{ opacity:0, y:10 }} 
                animate={{ opacity:1, y:0 }} 
                className="text-center p-4 mb-4 bg-red-100 dark:bg-red-800/50 border border-red-300 dark:border-red-700 rounded-lg"
               >
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-700 dark:text-red-300">Permission denied. Please enable device orientation access in your browser settings if you wish to use this tool.</p>
              </motion.div>
            )}

            {(permissionStatus === 'granted' || (permissionStatus === 'prompt' && typeof DeviceOrientationEvent.requestPermission !== 'function')) && (
              <div className="space-y-1 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg shadow-inner overflow-hidden p-1">
                <DataRow icon={<Compass />} label="Alpha (Z-axis)" value={orientation.alpha} unit="°" index={0} />
                <DataRow icon={<SmartphoneNfc style={{transform: 'rotate(90deg)'}} />} label="Beta (X-axis)" value={orientation.beta} unit="°" index={1} />
                <DataRow icon={<SmartphoneNfc />} label="Gamma (Y-axis)" value={orientation.gamma} unit="°" index={2} />
                <DataRow 
                  icon={orientation.absolute ? <CheckCircle className="text-green-500"/> : <AlertTriangle className="text-yellow-500"/>} 
                  label="Absolute Tracking" 
                  value={orientation.absolute ? 'Yes' : 'No'} 
                  unit="" 
                  index={3} 
                />
              </div>
            )}
             <motion.p 
              className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Move your device to see the values change. Accuracy depends on device sensors.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default DeviceOrientationTester;