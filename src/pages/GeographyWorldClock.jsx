import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, XSquare, PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import ct from 'countries-and-timezones';


const getAllTimezonesForSelect = () => {
  const allZones = ct.getAllTimezones();
  return Object.values(allZones).map(zone => ({
    value: zone.name,
    label: `${zone.name.replace(/_/g, ' ')} (UTC${zone.utcOffsetStr})`
  })).sort((a, b) => {
    if (a.label.startsWith('UTC')) return -1; // Prioritize UTC
    if (b.label.startsWith('UTC')) return 1;
    return a.label.localeCompare(b.label);
  });
};

const timeZoneOptions = getAllTimezonesForSelect();

const ClockCard = ({ timeZone, onRemove }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const dateFormatter = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        setTime(timeFormatter.format(now));
        setDate(dateFormatter.format(now));
      } catch (error) {
        setTime('Invalid Zone');
        setDate('');
      }
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]);

  const zoneDetails = ct.getTimezone(timeZone);
  const cityOrRegion = timeZone.split('/').pop().replace(/_/g, ' ');

  return (
    <div className="bg-sky-50 dark:bg-gray-700/60 p-4 rounded-lg shadow-lg text-center transition-all hover:shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold text-sky-700 dark:text-sky-300 truncate" title={timeZone}>{cityOrRegion}</p>
        <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 opacity-60 hover:opacity-100"
            onClick={() => onRemove(timeZone)}
            aria-label={`Remove ${cityOrRegion} clock`}
        >
            <XSquare size={18} />
        </Button>
      </div>
      <p className="text-4xl font-mono font-bold text-sky-600 dark:text-sky-200 my-2">{time}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
      {zoneDetails && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">(UTC{zoneDetails.utcOffsetStr})</p>}
    </div>
  );
};

const GeographyWorldClock = () => {
  const defaultZones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
  const [selectedTimeZones, setSelectedTimeZones] = useState(() => {
    const savedZones = localStorage.getItem('geographyWorldClockZones');
    try {
      const parsed = JSON.parse(savedZones);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultZones;
    } catch {
      return defaultZones;
    }
  });
  const [zoneToAdd, setZoneToAdd] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.setItem('geographyWorldClockZones', JSON.stringify(selectedTimeZones));
  }, [selectedTimeZones]);

  const addZone = () => {
    if (zoneToAdd && !selectedTimeZones.includes(zoneToAdd)) {
      if (selectedTimeZones.length < 12) { // Limit number of clocks
        setSelectedTimeZones(prevZones => [...prevZones, zoneToAdd]);
        setZoneToAdd('');
         toast({ title: 'Clock Added!', description: `${zoneToAdd.split('/').pop().replace(/_/g, ' ')} clock has been added.`, className:"bg-green-500 text-white dark:bg-green-600" });
      } else {
        toast({ title: 'Limit Reached', description: 'You can display up to 12 clocks.', variant: 'destructive' });
      }
    } else if (zoneToAdd && selectedTimeZones.includes(zoneToAdd)) {
        toast({ title: 'Zone Already Added', description: 'This time zone is already displayed.', variant: 'default' });
    } else if (!zoneToAdd) {
        toast({ title: 'No Zone Selected', description: 'Please select a time zone to add.', variant: 'destructive' });
    }
  };

  const removeZone = (zoneToRemove) => {
    setSelectedTimeZones(selectedTimeZones.filter(tz => tz !== zoneToRemove));
    toast({ title: 'Clock Removed', description: `${zoneToRemove.split('/').pop().replace(/_/g, ' ')} clock has been removed.`, className:"bg-red-500 text-white dark:bg-red-600" });
  };

  return (
    <>
      <Helmet>
        <title>Geography World Clock - Global Times | Toolzenix</title>
        <meta name="description" content="View current local times in cities around the world. Customize your dashboard with multiple time zone clocks." />
        <link rel="canonical" href="https://toolzenix.com/geo-world-clock" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Globe2 className="w-16 h-16 text-sky-500 dark:text-sky-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            World Clock
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Keep track of current times in various cities and time zones across the globe.
          </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl mb-10"
        >
            <Label htmlFor="zone-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add a Time Zone Clock</Label>
            <div className="flex gap-2">
                <Select value={zoneToAdd} onValueChange={setZoneToAdd}>
                    <SelectTrigger id="zone-select" className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue placeholder="Select time zone..." />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white max-h-72">
                        {timeZoneOptions.map(tz => (
                        <SelectItem key={tz.value} value={tz.value} disabled={selectedTimeZones.includes(tz.value)}>
                            {tz.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={addZone} className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white">
                    <PlusCircle size={18} className="mr-2"/> Add
                </Button>
            </div>
        </motion.div>

        {selectedTimeZones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
                {selectedTimeZones.map(tz => (
                <motion.div
                    key={tz}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y:20 }}
                    animate={{ opacity: 1, scale: 1, y:0 }}
                    exit={{ opacity: 0, scale: 0.8, y:-20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <ClockCard timeZone={tz} onRemove={removeZone} />
                </motion.div>
                ))}
            </AnimatePresence>
          </div>
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
                No time zones selected. Add some clocks to get started!
            </p>
        )}
      </div>
    </>
  );
};

export default GeographyWorldClock;