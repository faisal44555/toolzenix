import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Wallet, Globe, Info, CaseSensitive, Hash } from 'lucide-react';
import ct from 'countries-and-timezones';

const countryList = Object.values(ct.getAllCountries()).map(country => ({
  value: country.id,
  label: country.name,
})).sort((a, b) => a.label.localeCompare(b.label));

const CountryCurrencyInfo = () => {
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [currencyInfo, setCurrencyInfo] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedCountryId) {
      try {
        const countryData = ct.getCountry(selectedCountryId);
        if (countryData && countryData.currency) {
          setCurrencyInfo({
            name: countryData.name,
            currencyName: countryData.currency_name || 'N/A', // Not directly in lib, derive or use common data
            currencyCode: countryData.currency,
            currencySymbol: countryData.currency_symbol || 'N/A',
          });
        } else {
          setCurrencyInfo(null);
          toast({ title: 'No Currency Data', description: `Currency information not available for ${countryData?.name || 'the selected country'}.`, variant: 'default'});
        }
      } catch (error) {
        setCurrencyInfo(null);
        toast({ title: 'Error', description: 'Failed to retrieve currency data.', variant: 'destructive'});
        console.error("Error fetching currency data:", error);
      }
    } else {
      setCurrencyInfo(null);
    }
  }, [selectedCountryId, toast]);
  
  // Attempt to get full currency name from Intl API, if available
  useEffect(() => {
    if (currencyInfo && currencyInfo.currencyCode && !currencyInfo.currencyName) {
      try {
        const currencyDisplayName = new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyInfo.currencyCode, currencyDisplay: 'name' })
          .formatToParts(1)
          .find(part => part.type === 'currencyName')?.value;
        
        if (currencyDisplayName) {
          setCurrencyInfo(prev => ({ ...prev, currencyName: currencyDisplayName }));
        }
      } catch (e) {
        // Intl API might not support all currency codes or `currencyDisplay: 'name'`
        console.warn("Could not get currency display name for", currencyInfo.currencyCode);
      }
    }
  }, [currencyInfo]);


  return (
    <>
      <Helmet>
        <title>Currency Information by Country | Toolzenix</title>
        <meta name="description" content="Find the official currency (name, code, symbol) for any country. Useful for travel and international transactions." />
        <link rel="canonical" href="https://toolzenix.com/country-currency-info" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Wallet className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Currency Info by Country
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Discover the official currency details for countries worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="countryCurrencySelect" className="text-gray-700 dark:text-gray-300">Select Country</Label>
            <Select value={selectedCountryId} onValueChange={setSelectedCountryId}>
              <SelectTrigger id="countryCurrencySelect" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Choose a country..." />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white max-h-72">
                {countryList.map(country => (
                  <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currencyInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center">
                <Globe size={26} className="mr-3" /> {currencyInfo.name}
              </h2>
              <div className="space-y-3">
                <InfoItem icon={<CaseSensitive size={18} className="text-yellow-500"/>} label="Currency Name" value={currencyInfo.currencyName} />
                <InfoItem icon={<Info size={18} className="text-yellow-500"/>} label="Currency Code (ISO 4217)" value={currencyInfo.currencyCode} />
                <InfoItem icon={<Hash size={18} className="text-yellow-500"/>} label="Currency Symbol" value={currencyInfo.currencySymbol} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-yellow-50 dark:bg-gray-700/50 rounded-md">
    <span className="mr-3 text-yellow-600 dark:text-yellow-400">{icon}</span>
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}:</p>
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{value || 'N/A'}</p>
    </div>
  </div>
);

export default CountryCurrencyInfo;