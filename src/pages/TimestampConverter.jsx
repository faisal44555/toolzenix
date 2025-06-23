import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Clock, Calendar, ArrowRightLeft, RefreshCw } from 'lucide-react';

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [humanDate, setHumanDate] = useState(new Date().toUTCString());
  const [localDate, setLocalDate] = useState(new Date().toString());
  const { toast } = useToast();

  const convertTimestampToDate = (ts) => {
    if (!ts || isNaN(parseInt(ts))) {
      toast({ title: 'Invalid Timestamp', description: 'Please enter a valid number.', variant: 'destructive' });
      return;
    }
    const numTs = parseInt(ts);
    // Detect if it's milliseconds or seconds
    const dateObj = new Date(numTs * (numTs.toString().length === 10 ? 1000 : 1));
    setHumanDate(dateObj.toUTCString());
    setLocalDate(dateObj.toString());
  };

  const convertDateToTimestamp = (dateStr) => {
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }
      setTimestamp(Math.floor(dateObj.getTime() / 1000).toString());
      // Also update local date display for consistency
      setLocalDate(dateObj.toString());
    } catch (e) {
      toast({ title: 'Invalid Date', description: 'Please enter a valid date string.', variant: 'destructive' });
    }
  };

  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value);
    convertTimestampToDate(e.target.value);
  };

  const handleHumanDateChange = (e) => {
    setHumanDate(e.target.value);
    // This primarily converts UTC string back, local string update is via timestamp
    convertDateToTimestamp(e.target.value);
  };
  
  const setCurrentTime = () => {
    const now = new Date();
    const currentTs = Math.floor(now.getTime() / 1000).toString();
    setTimestamp(currentTs);
    setHumanDate(now.toUTCString());
    setLocalDate(now.toString());
    toast({ title: 'Current Time Set!', description: 'Timestamp and dates updated to now.'});
  };

  useEffect(() => {
    // Initial load or if timestamp changes from external source (not relevant here but good practice)
    convertTimestampToDate(timestamp);
  }, []); // Run once on mount to initialize from default timestamp


  const handleCopy = (textToCopy, type) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: `${type} copied.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Unix Timestamp Converter | Toolzenix</title>
        <meta name="description" content="Convert Unix timestamps to human-readable dates (UTC and local) and vice-versa. Get the current timestamp easily." />
        <link rel="canonical" href="https://toolzenix.com/timestamp-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Unix Timestamp Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert between Unix timestamps and human-readable dates.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <Label htmlFor="timestamp-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">Unix Timestamp (seconds)</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input id="timestamp-input" type="number" value={timestamp} onChange={handleTimestampChange} placeholder="e.g., 1678886400" className="font-mono dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Button variant="ghost" size="icon" onClick={() => handleCopy(timestamp, 'Timestamp')}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center my-4">
             <Button variant="ghost" onClick={setCurrentTime} className="text-blue-500 dark:text-blue-400">
                <RefreshCw className="w-4 h-4 mr-2" /> Use Current Time
            </Button>
          </div>

          <div>
            <Label htmlFor="utc-date-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">UTC Date & Time</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input id="utc-date-input" value={humanDate} onChange={handleHumanDateChange} placeholder="e.g., Tue, 14 Mar 2023 12:00:00 GMT" className="font-mono dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Button variant="ghost" size="icon" onClick={() => handleCopy(humanDate, 'UTC Date')}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="local-date-output" className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Local Date & Time</Label>
             <div className="flex items-center space-x-2 mt-1">
                <Input id="local-date-output" value={localDate} readOnly placeholder="Local date will appear here" className="font-mono bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600" />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(localDate, 'Local Date')}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">About Unix Timestamps</h2>
          <p>
            A Unix timestamp (also known as Epoch time) is the number of seconds that have elapsed since January 1, 1970, at 00:00:00 Coordinated Universal Time (UTC). It's a common way for computer systems to represent time.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Enter a Unix timestamp (in seconds) into the "Unix Timestamp" field to see its corresponding UTC and local date/time.</li>
            <li>Or, enter a date/time string (e.g., "2023-03-15 10:00:00" or "March 15, 2023 10:00 AM") into the "UTC Date & Time" field to get its Unix timestamp. The tool attempts to parse various common date formats.</li>
            <li>Click "Use Current Time" to populate fields with the current timestamp and date.</li>
            <li>Use the copy icons to copy values to your clipboard.</li>
            <li>Note: Millisecond timestamps are also supported; the tool attempts to auto-detect if the input is seconds or milliseconds.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default TimestampConverter;