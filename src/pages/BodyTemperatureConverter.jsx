import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Thermometer, Replace, CheckCircle2, AlertTriangle } from 'lucide-react';

const BodyTemperatureConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Celsius'); // 'Celsius' or 'Fahrenheit'
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const convertTemperature = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      toast({ title: 'Invalid Input', description: 'Please enter a valid temperature.', variant: 'destructive', action: <AlertTriangle className="text-red-500" /> });
      setResult(null);
      return;
    }

    let convertedValue;
    let toUnit;

    if (fromUnit === 'Celsius') {
      convertedValue = (value * 9/5) + 32;
      toUnit = 'Fahrenheit';
    } else { // Fahrenheit to Celsius
      convertedValue = (value - 32) * 5/9;
      toUnit = 'Celsius';
    }

    setResult(`${convertedValue.toFixed(2)} °${toUnit}`);
    toast({ title: 'Conversion Successful!', action: <CheckCircle2 className="text-green-500"/> });
  };

  const swapUnits = () => {
    setFromUnit(prevUnit => prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
    // If there's a result, try to convert it back or clear, for simplicity let's clear input/result on swap
    setInputValue('');
    setResult(null);
  };

  const getNormalRangeInfo = () => {
    if (fromUnit === 'Celsius') {
      return "Normal body temperature is typically around 36.1°C to 37.2°C.";
    } else {
      return "Normal body temperature is typically around 97°F to 99°F.";
    }
  };

  return (
    <>
      <Helmet>
        <title>Human Body Temperature Converter | Toolzenix</title>
        <meta name="description" content="Convert human body temperatures between Celsius (°C) and Fahrenheit (°F). Useful for medical and health tracking." />
        <link rel="canonical" href="https://toolzenix.com/body-temperature-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Thermometer className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Body Temperature Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Quickly convert between Celsius (°C) and Fahrenheit (°F).
          </p>
        </motion.div>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <Label htmlFor="temperature-input" className="text-md font-medium text-gray-700 dark:text-gray-300">
                Enter Temperature in °{fromUnit}
              </Label>
              <Input
                id="temperature-input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`e.g., ${fromUnit === 'Celsius' ? '37' : '98.6'}`}
                className="mt-1 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-center">
                <Button onClick={swapUnits} variant="outline" className="text-red-600 dark:text-red-400 border-red-500 hover:bg-red-50 dark:hover:bg-gray-700">
                    <Replace className="w-5 h-5 mr-2" /> Swap to °{fromUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'}
                </Button>
            </div>
            
            <Button onClick={convertTemperature} className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white text-lg py-3">
              Convert Temperature
            </Button>

            {result !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
              >
                <Label className="text-md font-medium text-gray-700 dark:text-gray-300">Converted Temperature:</Label>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                  {result}
                </p>
              </motion.div>
            )}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 max-w-md mx-auto text-center text-gray-700 dark:text-gray-300 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
        >
            <p className="text-sm italic">{getNormalRangeInfo()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 prose dark:prose-invert max-w-md mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Celsius vs. Fahrenheit</h2>
          <p>
            Body temperature is a key indicator of health. This tool helps you convert readings between the two most common scales:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Celsius (°C):</strong> Used in most parts of the world.</li>
            <li><strong>Fahrenheit (°F):</strong> Primarily used in the United States.</li>
          </ul>
          <p><strong>Conversion Formulas:</strong></p>
          <p>°F = (°C × 9/5) + 32</p>
          <p>°C = (°F − 32) × 5/9</p>
          <p className="text-xs">Always consult a medical professional for health concerns. This tool is for informational purposes only.</p>
        </motion.div>
      </div>
    </>
  );
};

export default BodyTemperatureConverter;