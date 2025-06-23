import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { HardDrive, AlertCircle, RefreshCw } from 'lucide-react';

const units = [
  { value: 'B', label: 'Bytes (B)', multiplier: 1 },
  { value: 'KB', label: 'Kilobytes (KB)', multiplier: 1024 },
  { value: 'MB', label: 'Megabytes (MB)', multiplier: 1024 * 1024 },
  { value: 'GB', label: 'Gigabytes (GB)', multiplier: 1024 * 1024 * 1024 },
  { value: 'TB', label: 'Terabytes (TB)', multiplier: 1024 * 1024 * 1024 * 1024 },
];

const FileSizeCalculator = () => {
  const [inputValue, setInputValue] = useState('1');
  const [inputUnit, setInputUnit] = useState('MB');
  const [results, setResults] = useState({});
  const { toast } = useToast();

  const calculateSizes = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      toast({ title: 'Invalid Input', description: 'Please enter a non-negative number.', variant: 'destructive', action: <AlertCircle /> });
      setResults({});
      return;
    }

    const fromUnitData = units.find(u => u.value === inputUnit);
    if (!fromUnitData) {
      toast({ title: 'Invalid Unit', description: 'Selected input unit is not valid.', variant: 'destructive', action: <AlertCircle /> });
      setResults({});
      return;
    }

    const valueInBytes = value * fromUnitData.multiplier;
    const newResults = {};
    units.forEach(unit => {
      newResults[unit.value] = (valueInBytes / unit.multiplier).toFixed(6); // Keep more precision
    });
    setResults(newResults);
  };
  
  useEffect(() => {
    calculateSizes();
  }, [inputValue, inputUnit]);


  const handleReset = () => {
    setInputValue('1');
    setInputUnit('MB');
    setResults({});
    calculateSizes(); // Recalculate with default values
    toast({ title: 'Calculator Reset', description: 'Values have been reset to default.' });
  };

  return (
    <>
      <Helmet>
        <title>File Size Calculator & Converter | Toolzenix</title>
        <meta name="description" content="Calculate and convert file sizes between Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB). Fast and easy to use." />
        <link rel="canonical" href="https://toolzenix.com/file-size-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <HardDrive className="w-16 h-16 text-cyan-500 dark:text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">File Size Calculator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert file sizes between various units (B, KB, MB, GB, TB).
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div>
              <Label htmlFor="input-value" className="text-gray-700 dark:text-gray-300">Value</Label>
              <Input 
                id="input-value" 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g., 1024"
                className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" 
              />
            </div>
            <div>
              <Label htmlFor="input-unit" className="text-gray-700 dark:text-gray-300">Unit</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger id="input-unit" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  {units.map(unit => (
                    <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleReset} variant="outline" className="w-full dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>

          {Object.keys(results).length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">Conversion Results:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {units.map(unit => (
                  <div key={unit.value} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{unit.label}:</p>
                    <p className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400 break-all">
                      {parseFloat(results[unit.value]).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 })}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding File Sizes</h2>
          <p>
            File sizes are typically measured in Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB). This calculator uses the binary prefix system (powers of 1024):
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>1 Kilobyte (KB) = 1,024 Bytes</li>
            <li>1 Megabyte (MB) = 1,024 Kilobytes</li>
            <li>1 Gigabyte (GB) = 1,024 Megabytes</li>
            <li>1 Terabyte (TB) = 1,024 Gigabytes</li>
          </ul>
          <p>
            Enter a value and select its unit, and the calculator will instantly show its equivalent in all other common units.
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>Some systems or manufacturers might use decimal prefixes (powers of 1000), which can lead to discrepancies. This tool strictly uses binary prefixes (1 KB = 1024 B).</p>
        </motion.div>
      </div>
    </>
  );
};

export default FileSizeCalculator;