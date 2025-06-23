import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const OnlineOfflineStatusChecker = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connection Status Changed",
        description: "You are now online.",
        action: <CheckCircle className="text-green-500" />,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Connection Status Changed",
        description: "You are now offline.",
        variant: "destructive",
        action: <XCircle className="text-white" />,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } }
  };

  const statusIconVariants = {
    online: { scale: [1, 1.2, 1], color: "#22c55e", transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror", ease:"easeInOut" } },
    offline: { scale: [1, 1.1, 1], color: "#ef4444", transition: { duration: 0.7, repeat: Infinity, repeatType: "mirror", ease:"easeInOut" } }
  };

  return (
    <>
      <Helmet>
        <title>Online/Offline Status Checker - Toolzenix</title>
        <meta name="description" content="Check your browser's current online or offline connection status in real-time." />
        <link rel="canonical" href="https://toolzenix.com/online-offline-status-checker" />
      </Helmet>

      <motion.div
        className="max-w-md mx-auto p-4 flex items-center justify-center min-h-[calc(100vh-200px)]"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className={`w-full shadow-xl overflow-hidden ${isOnline ? 'bg-gradient-to-br from-green-400 to-emerald-600 dark:from-green-600 dark:to-emerald-800' : 'bg-gradient-to-br from-red-400 to-rose-600 dark:from-red-600 dark:to-rose-800'}`}>
          <CardHeader className="text-center text-white pb-4">
            <motion.div
              className="mx-auto mb-6 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              animate={isOnline ? "online" : "offline"}
              variants={statusIconVariants}
            >
              {isOnline ? <Wifi className="w-12 h-12" /> : <WifiOff className="w-12 h-12" />}
            </motion.div>
            <CardTitle className="text-4xl font-extrabold">
              You Are Currently
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8 bg-white/90 dark:bg-slate-800/80 backdrop-blur-md">
            <motion.div
              key={isOnline ? 'online-text' : 'offline-text'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {isOnline ? (
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <p className="text-5xl font-bold text-green-600 dark:text-green-400">ONLINE</p>
                  <p className="text-slate-600 dark:text-slate-300 mt-2">Your internet connection appears to be active.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <XCircle className="w-16 h-16 text-red-500 mb-4" />
                  <p className="text-5xl font-bold text-red-600 dark:text-red-400">OFFLINE</p>
                  <p className="text-slate-600 dark:text-slate-300 mt-2">No internet connection detected.</p>
                </div>
              )}
            </motion.div>
            <motion.p 
              className="mt-8 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              This tool reflects your browser's understanding of the network status. It updates automatically if your connection changes.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default OnlineOfflineStatusChecker;