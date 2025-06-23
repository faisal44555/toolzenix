import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MousePointer2, Maximize, Minimize, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MousePositionTracker = () => {
  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
  });
  const [isTracking, setIsTracking] = useState(true);
  const [showCrosshair, setShowCrosshair] = useState(true);

  const handleMouseMove = useCallback((event) => {
    if (isTracking) {
      setMousePosition({
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
        screenX: event.screenX,
        screenY: event.screenY,
      });
    }
  }, [isTracking]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    toast({
      title: `Tracking ${!isTracking ? 'Enabled' : 'Disabled'}`,
      description: `Mouse position tracking is now ${!isTracking ? 'active' : 'paused'}.`,
    });
  };

  const toggleCrosshair = () => {
    setShowCrosshair(!showCrosshair);
  };
  
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({ title: 'Copied to Clipboard!', description: `${label} (${text}) copied.` });
      })
      .catch(err => {
        toast({ variant: 'destructive', title: 'Copy Failed', description: `Could not copy ${label}.` });
        console.error('Failed to copy: ', err);
      });
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.3 } })
  };

  const DataRow = ({ label, value, index, onCopy }) => (
    <motion.div
      custom={index}
      variants={itemVariants}
      className="flex items-center justify-between py-3 px-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150 group"
    >
      <div className="flex items-center">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-32">{label}:</span>
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{value}px</span>
      </div>
      <Button variant="ghost" size="sm" onClick={onCopy} className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </Button>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Mouse Position Tracker - Toolzenix</title>
        <meta name="description" content="Track your mouse cursor's X and Y coordinates in real-time on the screen. See clientX, clientY, pageX, pageY, screenX, and screenY values." />
        <link rel="canonical" href="https://toolzenix.com/mouse-position-tracker" />
      </Helmet>

      {showCrosshair && isTracking && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-px bg-red-500/50 pointer-events-none z-50"
            style={{ transform: `translateY(${mousePosition.clientY}px)` }}
          />
          <div
            className="fixed top-0 left-0 h-full w-px bg-red-500/50 pointer-events-none z-50"
            style={{ transform: `translateX(${mousePosition.clientX}px)` }}
          />
          <div 
            className="fixed w-5 h-5 border-2 border-red-500 rounded-full pointer-events-none z-50 bg-red-500/10"
            style={{
              top: mousePosition.clientY - 10,
              left: mousePosition.clientX - 10,
            }}
          />
        </>
      )}

      <motion.div 
        className="max-w-md mx-auto p-4"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="w-full bg-gradient-to-tr from-sky-400 via-cyan-400 to-teal-500 dark:from-sky-600 dark:via-cyan-600 dark:to-teal-700 shadow-xl overflow-hidden">
          <CardHeader className="text-center text-white">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness:120 }}
              className="mx-auto mb-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <MousePointer2 className="w-8 h-8" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Mouse Position Tracker</CardTitle>
            <CardDescription className="text-sky-100 dark:text-sky-200">
              Real-time cursor coordinates.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="flex justify-center gap-2 mb-6">
              <Button onClick={toggleTracking} variant={isTracking ? "destructive" : "default"} className="min-w-[130px]">
                {isTracking ? 'Pause Tracking' : 'Resume Tracking'}
              </Button>
              <Button onClick={toggleCrosshair} variant="outline">
                {showCrosshair ? <Minimize className="w-4 h-4 mr-2" /> : <Maximize className="w-4 h-4 mr-2" />}
                {showCrosshair ? 'Hide' : 'Show'} Crosshair
              </Button>
            </div>

            <div className="space-y-1 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg shadow-inner overflow-hidden p-1">
              <DataRow label="Client X" value={mousePosition.clientX} index={0} onCopy={() => copyToClipboard(mousePosition.clientX, 'Client X')} />
              <DataRow label="Client Y" value={mousePosition.clientY} index={1} onCopy={() => copyToClipboard(mousePosition.clientY, 'Client Y')} />
              <DataRow label="Page X" value={mousePosition.pageX} index={2} onCopy={() => copyToClipboard(mousePosition.pageX, 'Page X')} />
              <DataRow label="Page Y" value={mousePosition.pageY} index={3} onCopy={() => copyToClipboard(mousePosition.pageY, 'Page Y')} />
              <DataRow label="Screen X" value={mousePosition.screenX} index={4} onCopy={() => copyToClipboard(mousePosition.screenX, 'Screen X')} />
              <DataRow label="Screen Y" value={mousePosition.screenY} index={5} onCopy={() => copyToClipboard(mousePosition.screenY, 'Screen Y')} />
            </div>

            <motion.p 
              className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Move your mouse around the screen to see the coordinates update. Client coordinates are relative to the viewport. Page coordinates are relative to the document. Screen coordinates are relative to the physical screen.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default MousePositionTracker;