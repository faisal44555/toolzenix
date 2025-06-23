import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LocateFixed, Search, Globe, Wifi, MapPin, Loader2, Clock } from 'lucide-react';

const IpGeolocationTool = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [geolocationData, setGeolocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchGeolocation = async (ipToFetch) => {
    setIsLoading(true);
    setGeolocationData(null);
    const queryParam = ipToFetch ? ipToFetch : ''; // If ipToFetch is empty, API uses client's IP
    try {
      const response = await fetch(`https://ip-api.com/json/${queryParam}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,query`);
      const data = await response.json();

      if (data.status === 'success') {
        setGeolocationData(data);
        toast({ title: 'Geolocation Found!', description: `Details for IP: ${data.query}` });
      } else {
        toast({ title: 'Geolocation Failed', description: data.message || 'Could not retrieve data for this IP.', variant: 'destructive' });
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      toast({ title: 'API Error', description: 'Failed to fetch geolocation data. Please try again later.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => { // Fetch user's IP on initial load
    fetchGeolocation('');
  }, []);

  const handleSearch = () => {
    if (ipAddress && !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipAddress)) {
        toast({ title: 'Invalid IP Address', description: 'Please enter a valid IPv4 address.', variant: 'destructive' });
        return;
    }
    fetchGeolocation(ipAddress);
  };

  return (
    <>
      <Helmet>
        <title>IP Geolocation Tool - Find IP Location | Toolzenix</title>
        <meta name="description" content="Find the approximate geographic location (country, city, ISP) of an IP address. Enter an IP or use your current IP." />
        <link rel="canonical" href="https://toolzenix.com/ip-geolocation" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <LocateFixed className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            IP Geolocation Tool
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Find the approximate geographic location of an IP address.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="ipAddressInput" className="text-gray-700 dark:text-gray-300">Enter IP Address (Optional - leave blank for your IP)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="ipAddressInput"
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="e.g., 8.8.8.8"
                className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {isLoading && !geolocationData && (
            <div className="text-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Fetching geolocation data...</p>
            </div>
          )}

          {geolocationData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Geolocation Details for IP: {geolocationData.query}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={<MapPin size={18} className="text-purple-500"/>} label="City" value={geolocationData.city} />
                <InfoItem icon={<MapPin size={18} className="text-purple-500"/>} label="Region" value={geolocationData.regionName} />
                <InfoItem icon={<Globe size={18} className="text-purple-500"/>} label="Country" value={`${geolocationData.country} (${geolocationData.countryCode})`} />
                <InfoItem icon={<MapPin size={18} className="text-purple-500"/>} label="ZIP Code" value={geolocationData.zip} />
                <InfoItem icon={<MapPin size={18} className="text-purple-500"/>} label="Coordinates" value={`Lat: ${geolocationData.lat?.toFixed(4)}, Lon: ${geolocationData.lon?.toFixed(4)}`} />
                <InfoItem icon={<Clock size={18} className="text-purple-500"/>} label="Time Zone" value={geolocationData.timezone} />
                <InfoItem icon={<Wifi size={18} className="text-purple-500"/>} label="ISP" value={geolocationData.isp} />
                <InfoItem icon={<Wifi size={18} className="text-purple-500"/>} label="Organization" value={geolocationData.org} />
              </div>
               {geolocationData.lat && geolocationData.lon && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${geolocationData.lat}&mlon=${geolocationData.lon}#map=10/${geolocationData.lat}/${geolocationData.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-purple-600 dark:text-purple-400 hover:underline"
                >
                  View on OpenStreetMap &rarr;
                </a>
              )}
            </motion.div>
          )}
           <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
            Geolocation data provided by ip-api.com. Accuracy may vary.
          </p>
        </motion.div>
      </div>
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="p-3 bg-purple-50 dark:bg-gray-700/50 rounded-lg">
    <div className="flex items-center mb-0.5">
      {icon}
      <p className="text-xs ml-2 font-medium text-gray-500 dark:text-gray-400">{label}</p>
    </div>
    <p className="text-md font-semibold text-gray-800 dark:text-gray-200 break-words">{value || 'N/A'}</p>
  </div>
);

export default IpGeolocationTool;