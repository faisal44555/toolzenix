import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Search, Copy, Navigation, Loader2 } from 'lucide-react';

const LatLongFinder = () => {
  const [query, setQuery] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCoordinates = async (searchQuery) => {
    if (!searchQuery.trim()) {
      toast({ title: 'Empty Query', description: 'Please enter a location name or address.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setCoordinates(null);
    setMapUrl('');

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setCoordinates({ lat: parseFloat(lat).toFixed(6), lon: parseFloat(lon).toFixed(6), name: display_name });
        setMapUrl(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`);
        toast({ title: 'Location Found!', description: `Coordinates for ${display_name} retrieved.` });
      } else {
        toast({ title: 'Location Not Found', description: 'Could not find coordinates for the specified location.', variant: 'destructive' });
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      toast({ title: 'API Error', description: 'Failed to fetch coordinates. Please try again later.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchCoordinates(query);
  };
  
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: 'Geolocation Not Supported', description: 'Your browser does not support geolocation.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          if (!response.ok) throw new Error('Failed to reverse geocode');
          const data = await response.json();
          const displayName = data.display_name || `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`;
          setCoordinates({ lat: latitude.toFixed(6), lon: longitude.toFixed(6), name: displayName });
          setMapUrl(`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`);
          toast({ title: 'Current Location Found!', description: `Coordinates: ${displayName}` });
        } catch (error) {
          toast({ title: 'Reverse Geocode Failed', description: 'Could not get location name.', variant: 'destructive' });
           setCoordinates({ lat: latitude.toFixed(6), lon: longitude.toFixed(6), name: 'Current Location (Name unavailable)' });
           setMapUrl(`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        toast({ title: 'Geolocation Error', description: `Could not get current location: ${error.message}`, variant: 'destructive' });
        setIsLoading(false);
      }
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: `${text} copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Latitude & Longitude Finder | Toolzenix</title>
        <meta name="description" content="Find the latitude and longitude of any place or address in the world. Get precise geographic coordinates instantly." />
        <link rel="canonical" href="https://toolzenix.com/lat-long-finder" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <MapPin className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Latitude & Longitude Finder
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Enter an address or place name to find its geographic coordinates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="locationQuery" className="text-gray-700 dark:text-gray-300">Location Name or Address</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="locationQuery"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Eiffel Tower, Paris or 1600 Amphitheatre Parkway, Mountain View, CA"
                className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                {isLoading && query ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </Button>
            </div>
          </div>
          <Button onClick={getCurrentLocation} variant="outline" disabled={isLoading} className="w-full flex items-center justify-center dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400/10">
             {isLoading && !query ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="w-5 h-5 mr-2" />} Use My Current Location
          </Button>

          {coordinates && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Location Details:</h3>
              <p className="text-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">{coordinates.name}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-gray-700/50 rounded-lg">
                  <Label className="text-sm text-gray-500 dark:text-gray-400">Latitude</Label>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{coordinates.lat}</p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(coordinates.lat)}><Copy className="w-4 h-4 text-blue-500" /></Button>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-gray-700/50 rounded-lg">
                  <Label className="text-sm text-gray-500 dark:text-gray-400">Longitude</Label>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{coordinates.lon}</p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(coordinates.lon)}><Copy className="w-4 h-4 text-blue-500" /></Button>
                  </div>
                </div>
              </div>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View on OpenStreetMap &rarr;
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
         <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Powered by OpenStreetMap Nominatim. Please respect their usage policy.
        </p>
      </div>
    </>
  );
};

export default LatLongFinder;