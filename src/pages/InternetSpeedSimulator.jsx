import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Wifi, Zap, Download, Upload, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const InternetSpeedSimulator = () => {
  const { toast } = useToast();
  const [simulating, setSimulating] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [progress, setProgress] = useState(0);

  const getRandomSpeed = (max) => (Math.random() * max).toFixed(2);
  const getRandomPing = () => Math.floor(Math.random() * 100) + 5;

  useEffect(() => {
    let interval;
    if (simulating) {
      setProgress(0);
      setDownloadSpeed(0);
      setUploadSpeed(0);
      setPing(0);
      
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        if (currentProgress <= 50) { // Simulate download test
          setDownloadSpeed(getRandomSpeed(100));
          setPing(getRandomPing());
        } else if (currentProgress <= 100) { // Simulate upload test
          setUploadSpeed(getRandomSpeed(50));
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          setSimulating(false);
          toast({
            title: "Simulation Complete!",
            description: `Download: ${downloadSpeed} Mbps, Upload: ${uploadSpeed} Mbps, Ping: ${ping} ms. This is a simulation.`,
          });
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [simulating, toast, downloadSpeed, uploadSpeed, ping]);

  const startSimulation = () => {
    setSimulating(true);
    toast({
      title: "Starting Speed Simulation...",
      description: "This is a visual demonstration and does not measure actual internet speed.",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.2 } }
  };

  return (
    <>
      <Helmet>
        <title>Internet Speed Simulator - Toolzenix</title>
        <meta name="description" content="Visually simulate an internet speed test. Note: This tool is for demonstration purposes only and does not measure your actual internet speed." />
        <link rel="canonical" href="https://toolzenix.com/internet-speed-simulator" />
      </Helmet>

      <motion.div
        className="max-w-2xl mx-auto p-4"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="w-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-700 dark:to-red-700 shadow-2xl">
          <CardHeader className="text-center text-white">
            <motion.div 
              className="mx-auto mb-4 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
            >
              <Wifi className="w-10 h-10" />
            </motion.div>
            <CardTitle className="text-4xl font-bold">Internet Speed Simulator</CardTitle>
            <CardDescription className="text-purple-100 dark:text-purple-200 text-lg">
              A visual demonstration of a speed test.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="text-center mb-8">
              <Button onClick={startSimulation} disabled={simulating} size="lg" className="bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95">
                {simulating ? 'Simulating...' : 'Start Simulation'} <Zap className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {simulating && (
              <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Progress value={progress} className="w-full h-4 [&>div]:bg-pink-500" />
                <p className="text-center mt-2 text-sm text-slate-600 dark:text-slate-300">{progress}% Complete</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <motion.div variants={itemVariants} className="p-6 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-md">
                <Download className="w-10 h-10 mx-auto mb-3 text-blue-500" />
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Download</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{downloadSpeed} <span className="text-xl">Mbps</span></p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-6 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-md">
                <Upload className="w-10 h-10 mx-auto mb-3 text-green-500" />
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Upload</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{uploadSpeed} <span className="text-xl">Mbps</span></p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-6 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-md">
                <BarChart3 className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Ping</h3>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{ping} <span className="text-xl">ms</span></p>
              </motion.div>
            </div>
            
            <motion.p 
              className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <strong>Disclaimer:</strong> This tool is a visual simulation and does <strong className="text-red-500">not</strong> measure your actual internet speed. It's for demonstration purposes only.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default InternetSpeedSimulator;