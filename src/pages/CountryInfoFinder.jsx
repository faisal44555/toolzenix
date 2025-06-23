import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Info, Globe, Users, Languages, WalletCards, Map, Clock } from 'lucide-react';
import ct from 'countries-and-timezones';

const countryList = Object.values(ct.getAllCountries()).map(country => ({
  value: country.id,
  label: country.name,
})).sort((a, b) => a.label.localeCompare(b.label));

const CountryInfoFinder = () => {
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedCountryId) {
      try {
        const data = ct.getCountry(selectedCountryId);
        if (data) {
          setCountryInfo({
            name: data.name,
            nativeName: data.native, 
            capital: data.capital,
            currency: data.currency,
            currencySymbol: data.currency_symbol,
            phone: data.phone.join(', '),
            languages: data.languages.join(', '),
            timezones: data.timezones.map(tz => `${tz} (UTC${ct.getTimezone(tz)?.utcOffsetStr})`).join('; ')
          });
        } else {
          setCountryInfo(null);
          toast({ title: 'Error', description: 'Country data not found.', variant: 'destructive'});
        }
      } catch (error) {
        setCountryInfo(null);
        toast({ title: 'Error', description: 'Failed to retrieve country data.', variant: 'destructive'});
        console.error("Error fetching country data:", error);
      }
    } else {
      setCountryInfo(null);
    }
  }, [selectedCountryId, toast]);

  return (
    <>
      <Helmet>
        <title>Country Information Finder | Toolzenix</title>
        <meta name="description" content="Get detailed information about any country, including capital, currency, languages, time zones, and more. Explore global facts easily." />
        <link rel="canonical" href="https://toolzenix.com/country-info-finder" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Info className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Country Information Finder
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Select a country to view its key details and facts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="countrySelect" className="text-gray-700 dark:text-gray-300">Select Country</Label>
            <Select value={selectedCountryId} onValueChange={setSelectedCountryId}>
              <SelectTrigger id="countrySelect" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Choose a country..." />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white max-h-72">
                {countryList.map(country => (
                  <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {countryInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center">
                <Globe size={28} className="mr-3" /> {countryInfo.name}
                {countryInfo.nativeName && countryInfo.nativeName !== countryInfo.name && (
                     <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">({countryInfo.nativeName})</span>
                )}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <InfoItem icon={<Map size={18} className="text-green-500"/>} label="Capital" value={countryInfo.capital} />
                <InfoItem icon={<WalletCards size={18} className="text-green-500"/>} label="Currency" value={`${countryInfo.currency} (${countryInfo.currencySymbol || ''})`} />
                <InfoItem icon={<Users size={18} className="text-green-500"/>} label="Phone Code(s)" value={`+${countryInfo.phone}`} />
                <InfoItem icon={<Languages size={18} className="text-green-500"/>} label="Languages" value={countryInfo.languages} />
                <div className="sm:col-span-2">
                    <InfoItem icon={<Clock size={18} className="text-green-500"/>} label="Time Zone(s)" value={countryInfo.timezones} breakValue={true} />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

const InfoItem = ({ icon, label, value, breakValue = false }) => (
  <div className="flex items-start">
    <span className="mr-2 mt-0.5">{icon}</span>
    <div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}:</p>
      <p className={`text-md text-gray-800 dark:text-gray-200 ${breakValue ? 'break-all' : ''}`}>{value || 'N/A'}</p>
    </div>
  </div>
);


export default CountryInfoFinder;