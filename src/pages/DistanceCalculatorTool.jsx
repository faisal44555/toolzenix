import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Milestone, MapPin, Search, Loader2 } from 'lucide-react';

const DistanceCalculatorTool = () => {
  const [point1Lat, setPoint1Lat] = useState('');
  const [point1Lon, setPoint1Lon] = useState('');
  const [point1Query, setPoint1Query] = useState('');

  const [point2Lat, setPoint2Lat] = useState('');
  const [point2Lon, setPoint2Lon] = useState('');
  const [point2Query, setPoint2Query] = useState('');
  
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCoordinatesForPoint = async (query, setLat, setLon, pointName) => {
    if (!query.trim()) {
      toast({ title: `Empty Location ${pointName}`, description: 'Please enter a location name or address.', variant: 'destructive' });
      return null;
    }
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
      if (!response.ok) throw new Error(`Network error for ${pointName}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setLat(data[0].lat);
        setLon(data[0].lon);
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      } else {
        toast({ title: `Location ${pointName} Not Found`, description: `Could not find ${query}.`, variant: 'destructive' });
        return null;
      }
    } catch (error) {
      toast({ title: `API Error for ${pointName}`, description: `Failed to fetch coordinates for ${query}.`, variant: 'destructive' });
      return null;
    }
  };

  const haversineDistance = (coords1, coords2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = coords1.lat * Math.PI / 180;
    const lon1 = coords1.lon * Math.PI / 180;
    const lat2 = coords2.lat * Math.PI / 180;
    const lon2 = coords2.lon * Math.PI / 180;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const calculateDistance = async () => {
    setIsLoading(true);
    setDistance(null);

    let coords1 = { lat: parseFloat(point1Lat), lon: parseFloat(point1Lon) };
    if (point1Query && (isNaN(coords1.lat) || isNaN(coords1.lon))) {
        coords1 = await fetchCoordinatesForPoint(point1Query, setPoint1Lat, setPoint1Lon, "1");
    } else if (isNaN(coords1.lat) || isNaN(coords1.lon)) {
        toast({title: "Invalid Point 1", description: "Enter valid coordinates or a location name for Point 1.", variant: "destructive"});
        setIsLoading(false); return;
    }


    let coords2 = { lat: parseFloat(point2Lat), lon: parseFloat(point2Lon) };
     if (point2Query && (isNaN(coords2.lat) || isNaN(coords2.lon))) {
        coords2 = await fetchCoordinatesForPoint(point2Query, setPoint2Lat, setPoint2Lon, "2");
    } else if (isNaN(coords2.lat) || isNaN(coords2.lon)) {
        toast({title: "Invalid Point 2", description: "Enter valid coordinates or a location name for Point 2.", variant: "destructive"});
        setIsLoading(false); return;
    }

    if (coords1 && coords2) {
      const distKm = haversineDistance(coords1, coords2);
      const distMiles = distKm * 0.621371;
      setDistance({ km: distKm.toFixed(2), miles: distMiles.toFixed(2) });
      toast({ title: 'Distance Calculated!', description: `Distance is ${distKm.toFixed(2)} km.` });
    }
    setIsLoading(false);
  };
  
  const handlePointQuerySearch = async (pointNum) => {
    setIsLoading(true);
    if (pointNum === 1) {
      await fetchCoordinatesForPoint(point1Query, setPoint1Lat, setPoint1Lon, "1");
    } else {
      await fetchCoordinatesForPoint(point2Query, setPoint2Lat, setPoint2Lon, "2");
    }
    setIsLoading(false);
  };


  return (
    <>
      <Helmet>
        <title>Distance Calculator - Between Two Points | Toolzenix</title>
        <meta name="description" content="Calculate the distance (in kilometers and miles) between two geographic points using their latitude/longitude or city/address names." />
        <link rel="canonical" href="https://toolzenix.com/distance-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Milestone className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Distance Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Calculate the distance between two geographic locations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-8"
        >
          <PointInputGroup
            pointNum={1}
            lat={point1Lat} setLat={setPoint1Lat}
            lon={point1Lon} setLon={setPoint1Lon}
            query={point1Query} setQuery={setPoint1Query}
            onSearch={() => handlePointQuerySearch(1)}
            isLoading={isLoading}
          />
          <PointInputGroup
            pointNum={2}
            lat={point2Lat} setLat={setPoint2Lat}
            lon={point2Lon} setLon={setPoint2Lon}
            query={point2Query} setQuery={setPoint2Query}
            onSearch={() => handlePointQuerySearch(2)}
            isLoading={isLoading}
          />
          
          <Button onClick={calculateDistance} disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white py-3 text-lg">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Calculate Distance'}
          </Button>

          {distance && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Calculated Distance:</h3>
              <p className="text-3xl font-bold text-red-600 dark:text-red-300">{distance.km} km</p>
              <p className="text-xl text-gray-600 dark:text-gray-400">({distance.miles} miles)</p>
            </motion.div>
          )}
        </motion.div>
         <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Location search powered by OpenStreetMap Nominatim.
        </p>
      </div>
    </>
  );
};

const PointInputGroup = ({ pointNum, lat, setLat, lon, setLon, query, setQuery, onSearch, isLoading }) => (
  <div className="space-y-3 p-4 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/30">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
      <MapPin className="w-5 h-5 mr-2 text-red-500" /> Point {pointNum}
    </h3>
    <div>
      <Label htmlFor={`query${pointNum}`} className="text-sm text-gray-600 dark:text-gray-400">Location Name/Address (Optional)</Label>
      <div className="flex gap-2 mt-0.5">
        <Input
          id={`query${pointNum}`}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., New York City"
          className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-500"
          disabled={isLoading}
        />
        <Button onClick={onSearch} disabled={isLoading || !query} variant="outline" size="icon" className="dark:border-gray-500 dark:text-red-400 dark:hover:bg-red-500/10">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label htmlFor={`lat${pointNum}`} className="text-sm text-gray-600 dark:text-gray-400">Latitude</Label>
        <Input
          id={`lat${pointNum}`}
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="e.g., 40.7128"
          className="mt-0.5 dark:bg-gray-700 dark:text-white dark:border-gray-500"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor={`lon${pointNum}`} className="text-sm text-gray-600 dark:text-gray-400">Longitude</Label>
        <Input
          id={`lon${pointNum}`}
          type="number"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="e.g., -74.0060"
          className="mt-0.5 dark:bg-gray-700 dark:text-white dark:border-gray-500"
          disabled={isLoading}
        />
      </div>
    </div>
  </div>
);

export default DistanceCalculatorTool;