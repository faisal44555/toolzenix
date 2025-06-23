import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Flag, Globe, Search } from 'lucide-react';
import ct from 'countries-and-timezones';

const allCountriesData = Object.values(ct.getAllCountries()).map(country => ({
  id: country.id,
  name: country.name,
  // Using a CDN that provides flags by ISO Alpha-2 country code
  // Ensure this CDN is reliable and respects privacy if that's a concern.
  // Alternatively, use local SVG flags or Unicode flag emojis.
  flagUrl: `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${country.id.toLowerCase()}.svg`
})).sort((a, b) => a.name.localeCompare(b.name));


const CountryFlagsViewer = () => {
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return allCountriesData;
    return allCountriesData.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const selectedCountry = allCountriesData.find(c => c.id === selectedCountryId);

  useEffect(() => {
    // Pre-select a default country if list is not empty
    if (allCountriesData.length > 0 && !selectedCountryId) {
      setSelectedCountryId(allCountriesData[0].id); 
    }
  }, [selectedCountryId]);


  return (
    <>
      <Helmet>
        <title>Country Flags Viewer | Toolzenix</title>
        <meta name="description" content="View national flags of countries around the world. Select a country to see its flag." />
        <link rel="canonical" href="https://toolzenix.com/country-flags-viewer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Flag className="w-16 h-16 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Country Flags Viewer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Explore national flags from countries all over the globe.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl mb-10"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="countryFlagSearch" className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
                <Search size={16} className="mr-2" /> Search Country
              </Label>
              <Input 
                id="countryFlagSearch"
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="countryFlagSelect" className="text-gray-700 dark:text-gray-300">Select Country</Label>
              <Select value={selectedCountryId} onValueChange={setSelectedCountryId}>
                <SelectTrigger id="countryFlagSelect" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Choose a country..." />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white max-h-72">
                  {filteredCountries.map(country => (
                    <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>


        {selectedCountry && (
          <motion.div
            key={selectedCountry.id} 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pt-6 text-center max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center justify-center">
              <Globe size={30} className="mr-3" /> {selectedCountry.name}
            </h2>
            <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-2xl aspect-[4/3] overflow-hidden border border-gray-200 dark:border-gray-700">
              <img 
                className="w-full h-full object-contain"
                alt={`Flag of ${selectedCountry.name}`}
               src="https://images.unsplash.com/photo-1647451966744-8c2c674c6db9" />
            </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
               Flag images sourced from cdnjs.cloudflare.com (flag-icon-css).
            </p>
          </motion.div>
        )}
        
        {!selectedCountry && filteredCountries.length > 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">Please select a country to view its flag.</p>
        )}

        {!selectedCountry && filteredCountries.length === 0 && searchTerm && (
            <p className="text-center text-gray-500 dark:text-gray-400">No countries found for "{searchTerm}".</p>
        )}

      </div>
    </>
  );
};

export default CountryFlagsViewer;