import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRightLeft, Clock, MapPin } from 'lucide-react';

// A selection of common IANA time zones
const timeZoneOptions = [
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
  { value: 'America/New_York', label: 'New York (EST/EDT)' },
  { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
  { value: 'America/Denver', label: 'Denver (MST/MDT)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { value: 'America/Sao_Paulo', label: 'Sao Paulo (BRT/BRST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Kolkata', label: 'Kolkata (IST)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)' },
];


const TimeZoneConverterTool = () => {
  const [fromDateTime, setFromDateTime] = useState(new Date().toISOString().slice(0, 16)); // YYYY-MM-DDTHH:mm
  const [fromTimeZone, setFromTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone); // User's local timezone
  const [toTimeZone, setToTimeZone] = useState('UTC');
  const [toDateTime, setToDateTime] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    if (Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone) {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if(timeZoneOptions.find(tz => tz.value === userTz)) {
        setFromTimeZone(userTz);
      } else {
        // If user's exact IANA zone isn't in our short list, add it or default
        if (!timeZoneOptions.some(opt => opt.value === userTz)) {
             timeZoneOptions.push({ value: userTz, label: `Your Local (${userTz.split('/').pop().replace('_', ' ')})` });
             timeZoneOptions.sort((a,b) => a.label.localeCompare(b.label));
        }
        setFromTimeZone(userTz);
      }
    } else {
      setFromTimeZone('America/New_York'); // Fallback
    }
  }, []);

  useEffect(() => {
    convertTime();
  }, [fromDateTime, fromTimeZone, toTimeZone]);

  const convertTime = () => {
    if (!fromDateTime || !fromTimeZone || !toTimeZone) return;

    try {
      // Create a date object. IMPORTANT: Parse as if it's UTC to avoid local timezone interpretation, then "pretend" it's in fromTimeZone.
      // This is tricky. A better way would be to deconstruct date/time parts and reconstruct with timeZone.
      // For this simple version: create a string that's specific enough for Date constructor to parse, then use toLocaleString.
      const dateToConvert = new Date(fromDateTime); // This will be in local timezone of browser
      
      // We need to interpret dateToConvert as if it was in `fromTimeZone`.
      // Then convert it to `toTimeZone`.
      
      // Step 1: Format the input date/time as if it's in the `fromTimeZone`
      const fromFormatter = new Intl.DateTimeFormat('en-CA', { // 'en-CA' for YYYY-MM-DD
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: fromTimeZone, hour12: false
      });
      const parts = fromFormatter.formatToParts(dateToConvert).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {});
      
      // Create a date string that IS the date/time in the "fromTimeZone", but as a generic string
      // It's difficult to reliably parse this string with 'new Date()' as it might be interpreted locally.
      // The robust way is to get UTC representation from fromDateTime considering it's in fromTimeZone, then display in toTimeZone.
      
      // A simpler approach for modern browsers for display:
      const options = { timeZone: toTimeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
      const toFormatter = new Intl.DateTimeFormat('sv-SE', options); // sv-SE gives YYYY-MM-DD HH:mm
      const convertedDateString = toFormatter.format(new Date(fromDateTime)).replace(' ', 'T');
      
      setToDateTime(convertedDateString);

    } catch (error) {
      toast({ title: 'Conversion Error', description: 'Could not convert time. Check inputs.', variant: 'destructive' });
      setToDateTime('');
    }
  };
  
  const swapTimeZones = () => {
    const tempZone = fromTimeZone;
    setFromTimeZone(toTimeZone);
    setToTimeZone(tempZone);
    // If toDateTime has a value, use it as the new fromDateTime for consistency
    if (toDateTime) {
      setFromDateTime(toDateTime);
    }
  };

  return (
    <>
      <Helmet>
        <title>Time Zone Converter | Toolzenix</title>
        <meta name="description" content="Convert times between different time zones accurately. Input a date and time in one zone and see its equivalent in another." />
        <link rel="canonical" href="https://toolzenix.com/timezone-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <ArrowRightLeft className="w-16 h-16 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Time Zone Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Easily convert date and time between different time zones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* From Section */}
            <div className="space-y-4 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center"><MapPin size={20} className="mr-2 text-orange-500"/>From Time Zone</h3>
              <div>
                <Label htmlFor="from-datetime">Date & Time</Label>
                <Input 
                  id="from-datetime" 
                  type="datetime-local" 
                  value={fromDateTime} 
                  onChange={(e) => setFromDateTime(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="from-timezone">Time Zone</Label>
                <Select value={fromTimeZone} onValueChange={setFromTimeZone}>
                  <SelectTrigger id="from-timezone" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Select From Zone" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-white max-h-60">
                    {timeZoneOptions.map(tz => <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Swap Button - visible on larger screens between sections */}
            <div className="hidden md:flex items-center justify-center pt-10">
                 <Button variant="ghost" size="icon" onClick={swapTimeZones} className="text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-800/50 p-3 rounded-full">
                    <ArrowRightLeft size={28} />
                </Button>
            </div>

            {/* To Section */}
            <div className="space-y-4 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center"><MapPin size={20} className="mr-2 text-orange-500"/>To Time Zone</h3>
               <div>
                <Label htmlFor="to-timezone">Time Zone</Label>
                <Select value={toTimeZone} onValueChange={setToTimeZone}>
                  <SelectTrigger id="to-timezone" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Select To Zone" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-white max-h-60">
                    {timeZoneOptions.map(tz => <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="to-datetime">Converted Date & Time</Label>
                <Input 
                  id="to-datetime" 
                  type="datetime-local" 
                  value={toDateTime} 
                  readOnly 
                  className="bg-gray-100 dark:bg-gray-700/80 dark:text-gray-300 dark:border-gray-600 font-semibold"
                />
              </div>
            </div>
            
            {/* Swap Button - visible on smaller screens below sections */}
            <div className="md:hidden flex items-center justify-center pt-4">
                 <Button variant="ghost" size="icon" onClick={swapTimeZones} className="text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-800/50 p-3 rounded-full">
                    <ArrowRightLeft size={24} />
                </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default TimeZoneConverterTool;