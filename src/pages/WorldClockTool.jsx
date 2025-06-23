import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, XSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from "react-router-dom";

const timeZoneOptions = [
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'America/New_York', label: 'New York (EST/EDT)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata', label: 'Kolkata (IST)' },
  { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
  { value: 'Pacific/Honolulu', label: 'Honolulu (HST)' },
  { value: 'UTC', label: 'UTC' },
];

const ClockDisplay = ({ timeZone }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const options = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setTime(formatter.format(new Date()));
      } catch (error) {
        console.error(`Invalid time zone: ${timeZone}`);
        setTime('Invalid Zone');
      }
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]);

  const city = timeZoneOptions.find(tz => tz.value === timeZone)?.label || timeZone;

  return (
    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg shadow text-center">
      <p className="text-lg font-semibold text-gray-800 dark:text-white">{city}</p>
      <p className="text-3xl font-mono text-purple-600 dark:text-purple-400 mt-1">{time}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{timeZone}</p>
    </div>
  );
};

const WorldClockTool = () => {
  const defaultZones = ['Europe/London', 'America/New_York', 'Asia/Tokyo', 'UTC'];
  const [selectedTimeZones, setSelectedTimeZones] = useState(() => {
    const savedZones = localStorage.getItem('worldClockZones');
    return savedZones ? JSON.parse(savedZones) : defaultZones;
  });
  const [zoneToAdd, setZoneToAdd] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.setItem('worldClockZones', JSON.stringify(selectedTimeZones));
  }, [selectedTimeZones]);

  const addZone = () => {
    if (zoneToAdd && !selectedTimeZones.includes(zoneToAdd)) {
      if (selectedTimeZones.length < 8) { // Limit number of clocks
        setSelectedTimeZones([...selectedTimeZones, zoneToAdd]);
        setZoneToAdd('');
      } else {
        toast({ title: 'Limit Reached', description: 'You can display up to 8 clocks.', variant: 'destructive' });
      }
    } else if (selectedTimeZones.includes(zoneToAdd)) {
        toast({ title: 'Zone Already Added', description: 'This time zone is already displayed.', variant: 'default' });
    }
  };

  const removeZone = (zoneToRemove) => {
    setSelectedTimeZones(selectedTimeZones.filter(tz => tz !== zoneToRemove));
  };

  return (
    <>
      <Helmet>
        <title>World Clock - Live Time Across Global Time Zones | Toolzenix</title>
        <meta name="description" content="View the current time in major cities and time zones around the world (e.g., London, New York, Tokyo, UTC). Add and customize your selection of clocks for easy comparison. Ideal for international teams and travelers." />
        <link rel="canonical" href="https://toolzenix.com/world-clock" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Globe className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            World Clock
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            View current times across different cities and time zones around the globe. Stay synchronized with international colleagues, friends, or family.
          </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl mb-8"
        >
            <div className="flex gap-2">
                <Select value={zoneToAdd} onValueChange={setZoneToAdd}>
                    <SelectTrigger className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue placeholder="Select a time zone to add" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white">
                        {timeZoneOptions.map(tz => (
                        <SelectItem key={tz.value} value={tz.value} disabled={selectedTimeZones.includes(tz.value)}>
                            {tz.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={addZone} className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">Add Clock</Button>
            </div>
        </motion.div>

        {selectedTimeZones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedTimeZones.map(tz => (
              <motion.div
                key={tz}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
                className="relative"
              >
                <ClockDisplay timeZone={tz} />
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1 right-1 h-7 w-7 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 opacity-50 hover:opacity-100"
                    onClick={() => removeZone(tz)}
                    aria-label={`Remove ${tz} clock`}
                >
                    <XSquare size={18} />
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
                No time zones selected. Please add a clock to get started.
            </p>
        )}

        <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-4">About Our World Clock</h2>
          <p>The World Clock tool allows you to view the current time in multiple cities and time zones across the globe simultaneously. This is particularly useful for individuals and teams working across different geographical locations, travelers planning trips, or anyone needing to coordinate activities internationally. You can customize your dashboard by adding or removing clocks for specific time zones that are relevant to you.</p>
          <p>Our World Clock displays time in a clear, easy-to-read format, including the city/region name and the time zone abbreviation. The times are updated live every second. Your selected time zones are saved in your browser's local storage, so your customized clock dashboard will be remembered for your next visit. For other time-related utilities, you might find our <Link to="/timezone-converter">Time Zone Converter</Link> or <Link to="/datetime-countdown-timer">Countdown Timer</Link> helpful.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>A default set of common time zones (London, New York, Tokyo, UTC) is displayed initially.</li>
            <li>To add a new clock, select a time zone from the dropdown menu (e.g., "Paris (CET/CEST)") and click the "Add Clock" button. You can add up to 8 clocks.</li>
            <li>Each clock will display the city/region, the current time (updating live), and the time zone identifier (e.g., "Europe/Paris").</li>
            <li>To remove a clock from your dashboard, click the small 'X' icon in the top-right corner of that clock's display.</li>
            <li>Your selection of clocks is automatically saved in your browser, so they will reappear when you revisit the page.</li>
          </ol>
          <p className="mt-4">This tool is designed for anyone who needs to keep track of time in different parts of the world. It's a simple, user-friendly solution for managing international schedules and communications. Explore more <Link to="/calendar-time-tools">Calendar & Time Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix.</p>
        </div>
      </div>
    </>
  );
};

export default WorldClockTool;