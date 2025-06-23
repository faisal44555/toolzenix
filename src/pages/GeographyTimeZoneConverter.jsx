import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRightLeft, Clock, MapPin } from 'lucide-react';
import ct from 'countries-and-timezones';

const getAllTimezones = () => {
  const allZones = ct.getAllTimezones();
  return Object.values(allZones).map(zone => ({
    value: zone.name,
    label: `${zone.name} (UTC${zone.utcOffsetStr})`
  })).sort((a, b) => a.label.localeCompare(b.label));
};

const timeZoneOptions = getAllTimezones();

const GeographyTimeZoneConverter = () => {
  const [fromDateTime, setFromDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [fromTimeZone, setFromTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [toTimeZone, setToTimeZone] = useState('UTC');
  const [toDateTime, setToDateTime] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZoneOptions.find(tz => tz.value === userTz)) {
      setFromTimeZone(userTz);
    } else {
      setFromTimeZone('America/New_York'); // Fallback
    }
  }, []);

  useEffect(() => {
    convertTime();
  }, [fromDateTime, fromTimeZone, toTimeZone]);

  const convertTime = () => {
    if (!fromDateTime || !fromTimeZone || !toTimeZone) {
      setToDateTime('');
      return;
    }

    try {
      const date = new Date(fromDateTime);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date time input");
      }

      const options = {
        timeZone: toTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      
      const formatter = new Intl.DateTimeFormat([], options);
      const parts = formatter.formatToParts(date);
      const year = parts.find(p => p.type === 'year').value;
      const month = parts.find(p => p.type === 'month').value;
      const day = parts.find(p => p.type === 'day').value;
      const hour = parts.find(p => p.type === 'hour').value;
      const minute = parts.find(p => p.type === 'minute').value;

      setToDateTime(`${year}-${month}-${day}T${hour}:${minute}`);

    } catch (error) {
      console.error("Time conversion error:", error);
      toast({ title: 'Conversion Error', description: `Could not convert time: ${error.message}`, variant: 'destructive' });
      setToDateTime('');
    }
  };
  
  const swapTimeZones = () => {
    const tempZone = fromTimeZone;
    setFromTimeZone(toTimeZone);
    setToTimeZone(tempZone);
    if (toDateTime) {
      setFromDateTime(toDateTime);
    }
  };

  return (
    <>
      <Helmet>
        <title>Geography Time Zone Converter | Toolzenix</title>
        <meta name="description" content="Convert date and time between various global time zones with ease. Supports a comprehensive list of IANA time zones." />
        <link rel="canonical" href="https://toolzenix.com/geo-timezone-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Clock className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Time Zone Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert date and time across global time zones seamlessly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center"><MapPin size={20} className="mr-2 text-teal-500"/>From Time Zone</h3>
              <div>
                <Label htmlFor="from-datetime-geo">Date & Time</Label>
                <Input 
                  id="from-datetime-geo" 
                  type="datetime-local" 
                  value={fromDateTime} 
                  onChange={(e) => setFromDateTime(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="from-timezone-geo">Time Zone</Label>
                <Select value={fromTimeZone} onValueChange={setFromTimeZone}>
                  <SelectTrigger id="from-timezone-geo" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Select From Zone" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-white max-h-60">
                    {timeZoneOptions.map(tz => <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="hidden md:flex items-center justify-center pt-10">
                 <Button variant="ghost" size="icon" onClick={swapTimeZones} className="text-teal-500 hover:bg-teal-100 dark:hover:bg-teal-800/50 p-3 rounded-full">
                    <ArrowRightLeft size={28} />
                </Button>
            </div>

            <div className="space-y-4 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center"><MapPin size={20} className="mr-2 text-teal-500"/>To Time Zone</h3>
               <div>
                <Label htmlFor="to-timezone-geo">Time Zone</Label>
                <Select value={toTimeZone} onValueChange={setToTimeZone}>
                  <SelectTrigger id="to-timezone-geo" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Select To Zone" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-white max-h-60">
                    {timeZoneOptions.map(tz => <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="to-datetime-geo">Converted Date & Time</Label>
                <Input 
                  id="to-datetime-geo" 
                  type="datetime-local" 
                  value={toDateTime} 
                  readOnly 
                  className="bg-gray-100 dark:bg-gray-700/80 dark:text-gray-300 dark:border-gray-600 font-semibold"
                />
              </div>
            </div>
            
            <div className="md:hidden flex items-center justify-center pt-4">
                 <Button variant="ghost" size="icon" onClick={swapTimeZones} className="text-teal-500 hover:bg-teal-100 dark:hover:bg-teal-800/50 p-3 rounded-full">
                    <ArrowRightLeft size={24} />
                </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GeographyTimeZoneConverter;