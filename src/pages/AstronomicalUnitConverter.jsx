import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Microscope as Telescope, CheckCircle2, AlertTriangle, Replace } from 'lucide-react';

const units = {
  lightYear: { name: 'Light Year (ly)', toKm: 9.461e12 },
  parsec: { name: 'Parsec (pc)', toKm: 3.086e13 },
  astronomicalUnit: { name: 'Astronomical Unit (AU)', toKm: 1.496e8 },
  kilometer: { name: 'Kilometer (km)', toKm: 1 },
  mile: { name: 'Mile (mi)', toKm: 1.60934 },
};

const AstronomicalUnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('lightYear');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const convertUnits = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      toast({ title: 'Invalid Input', description: 'Please enter a valid number.', variant: 'destructive', action: <AlertTriangle className="text-red-500" /> });
      setResult(null);
      return;
    }

    if (!units[fromUnit] || !units[toUnit]) {
      toast({ title: 'Invalid Units', description: 'Selected units are not valid.', variant: 'destructive', action: <AlertTriangle className="text-red-500" /> });
      setResult(null);
      return;
    }

    const valueInKm = value * units[fromUnit].toKm;
    const convertedValue = valueInKm / units[toUnit].toKm;

    setResult(convertedValue.toExponential(6)); 
    toast({ title: 'Conversion Successful!', action: <CheckCircle2 className="text-green-500"/> });
  };
  
  const swapUnits = () => {
    const tempFrom = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempFrom);
    
    if (result && inputValue) {
      const oldInputValue = parseFloat(inputValue);
      const oldResult = parseFloat(result); // Assuming result is a string like "1.234560e+0"
      if (!isNaN(oldResult)) { // Check if oldResult can be parsed
        setInputValue(oldResult.toString()); 
        // Re-calculate with swapped units for clarity
        const valueInKm = oldResult * units[toUnit].toKm; // old toUnit is new fromUnit
        const convertedValue = valueInKm / units[fromUnit].toKm; // old fromUnit is new toUnit
        setResult(convertedValue.toExponential(6));
      } else {
        // If oldResult is not parseable, maybe just clear result or handle error
        setResult(null); 
      }
    } else if (inputValue) { // If only input value exists, clear result
        setResult(null);
    }
  };


  return (
    <>
      <Helmet>
        <title>Astronomical Unit Converter | Toolzenix</title>
        <meta name="description" content="Convert between astronomical distance units like light-years, parsecs, astronomical units (AU), kilometers, and miles." />
        <link rel="canonical" href="https://toolzenix.com/astronomical-unit-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Telescope className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Astronomical Unit Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert vast cosmic distances with ease.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <Label htmlFor="input-value" className="text-md font-medium text-gray-700 dark:text-gray-300">Value to Convert</Label>
              <Input
                id="input-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g., 1"
                className="mt-1 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full">
                <Label htmlFor="from-unit" className="text-md font-medium text-gray-700 dark:text-gray-300">From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger id="from-unit" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-lg p-3 h-auto">
                    <SelectValue placeholder="From unit" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-white">
                    {Object.entries(units).map(([key, unit]) => (
                      <SelectItem key={key} value={key} className="text-md">{unit.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={swapUnits} variant="ghost" size="icon" className="mt-4 sm:mt-7 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700">
                <Replace className="w-6 h-6" />
                <span className="sr-only">Swap Units</span>
              </Button>

              <div className="w-full">
                <Label htmlFor="to-unit" className="text-md font-medium text-gray-700 dark:text-gray-300">To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger id="to-unit" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-lg p-3 h-auto">
                    <SelectValue placeholder="To unit" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-white">
                    {Object.entries(units).map(([key, unit]) => (
                      <SelectItem key={key} value={key} className="text-md">{unit.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button onClick={convertUnits} className="w-full mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-3">
            Convert Units
          </Button>

          {result !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <Label className="text-md font-medium text-gray-700 dark:text-gray-300">Result:</Label>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {inputValue || '0'} {units[fromUnit]?.name.split(' (')[0]} = <br className="sm:hidden"/> {result} {units[toUnit]?.name.split(' (')[0]}
              </p>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding Cosmic Scales</h2>
          <p>
            Astronomical distances are mind-bogglingly vast. This converter helps you translate between common units used to measure these expanses:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Light Year (ly):</strong> The distance light travels in one Earth year.</li>
            <li><strong>Parsec (pc):</strong> About 3.26 light-years. Used by astronomers for galactic and intergalactic distances.</li>
            <li><strong>Astronomical Unit (AU):</strong> The average distance from Earth to the Sun. Useful for distances within our solar system.</li>
            <li><strong>Kilometer (km) & Mile (mi):</strong> Familiar units for terrestrial distances, provided for comparison.</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default AstronomicalUnitConverter;