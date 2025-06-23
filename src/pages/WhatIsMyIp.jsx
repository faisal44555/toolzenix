import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Wifi, Server, Eye, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const WhatIsMyIp = () => {
  const { toast } = useToast();
  const [ipAddress, setIpAddress] = useState('Loading...');
  const [isIpVisible, setIsIpVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
          throw new Error('Failed to fetch IP address');
        }
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
        setIpAddress('Unable to fetch IP');
        toast({
          title: 'Error Fetching IP',
          description: 'Could not retrieve your IP address. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchIp();
  }, [toast]);

  const toggleIpVisibility = () => {
    setIsIpVisible(!isIpVisible);
  };

  const copyToClipboard = () => {
    if (ipAddress && ipAddress !== 'Loading...' && ipAddress !== 'Unable to fetch IP') {
      navigator.clipboard.writeText(ipAddress);
      setCopied(true);
      toast({
        title: 'Copied to Clipboard!',
        description: `IP Address: ${ipAddress} copied.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: 'Cannot Copy',
        description: 'No IP address available to copy.',
        variant: 'destructive',
      });
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  
  const ipDisplayVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } },
  };

  return (
    <>
      <Helmet>
        <title>What Is My IP Address? - Toolzenix</title>
        <meta name="description" content="Quickly find out your public IP address with this simple and fast tool. Your IP address is displayed securely, processed entirely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/what-is-my-ip" />
        <meta property="og:title" content="What Is My IP Address? - Toolzenix" />
        <meta property="og:description" content="Discover your public IP address instantly. A free, secure, and client-side tool by Toolzenix." />
        <meta property="og:url" content="https://toolzenix.com/what-is-my-ip" />
      </Helmet>
      <motion.div 
        className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl"
        variants={cardVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            className="p-4 bg-blue-500 dark:bg-blue-600 rounded-full mb-6 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, delay: 0.1 }}
          >
            <Wifi className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">
            Your Public IP Address
          </h1>
          
          <motion.div 
            className="w-full p-6 bg-slate-100 dark:bg-slate-700 rounded-lg mb-6 text-center shadow-inner"
            variants={ipDisplayVariants}
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 flex items-center justify-center">
              <Server className="w-4 h-4 mr-2" /> IP Address:
            </p>
            <p className="text-3xl md:text-4xl font-mono font-bold text-blue-600 dark:text-blue-400 break-all">
              {isIpVisible ? ipAddress : '•'.repeat(ipAddress.length > 15 ? 15 : ipAddress.length)}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              onClick={toggleIpVisibility} 
              variant="outline" 
              className="flex-1 group transition-all duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label={isIpVisible ? "Hide IP Address" : "Show IP Address"}
            >
              {isIpVisible ? <Eye className="w-5 h-5 mr-2 group-hover:scale-110" /> : <Eye className="w-5 h-5 mr-2 group-hover:scale-110" />}
              {isIpVisible ? 'Hide IP' : 'Show IP'}
            </Button>
            <Button 
              onClick={copyToClipboard} 
              className="flex-1 group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={ipAddress === 'Loading...' || ipAddress === 'Unable to fetch IP'}
              aria-label="Copy IP Address to clipboard"
            >
              {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2 group-hover:animate-pulse" />}
              {copied ? 'Copied!' : 'Copy IP'}
            </Button>
          </div>

          <motion.div 
            className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p>
              Your IP address is retrieved using a secure, client-side request to an external service (api.ipify.org). Toolzenix does not store your IP address.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default WhatIsMyIp;