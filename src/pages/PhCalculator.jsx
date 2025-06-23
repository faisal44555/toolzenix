import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { FlaskConical, Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';

const PhCalculator = () => {
  const [inputType, setInputType] = useState('h_concentration'); // 'h_concentration', 'poh', 'ph'
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  const calculateValues = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0 && (inputType === 'h_concentration' || inputType === 'oh_concentration')) {
      toast({ title: 'Invalid Input', description: 'Concentration must be a positive number.', variant: 'destructive', action: <AlertTriangle/> });
      setResults(null);
      return;
    }
    if (isNaN(value) && (inputType === 'ph' || inputType === 'poh')) {
         toast({ title: 'Invalid Input', description: 'pH or pOH must be a number.', variant: 'destructive', action: <AlertTriangle/> });
        setResults(null);
        return;
    }


    let ph, poh, hConcentration, ohConcentration;

    switch (inputType) {
      case 'h_concentration':
        hConcentration = value;
        ph = -Math.log10(hConcentration);
        poh = 14 - ph;
        ohConcentration = Math.pow(10, -poh);
        break;
      case 'oh_concentration':
        ohConcentration = value;
        poh = -Math.log10(ohConcentration);
        ph = 14 - poh;
        hConcentration = Math.pow(10, -ph);
        break;
      case 'ph':
        ph = value;
        poh = 14 - ph;
        hConcentration = Math.pow(10, -ph);
        ohConcentration = Math.pow(10, -poh);
        break;
      case 'poh':
        poh = value;
        ph = 14 - poh;
        hConcentration = Math.pow(10, -ph);
        ohConcentration = Math.pow(10, -poh);
        break;
      default:
        setResults(null);
        return;
    }
    
    // Check for unrealistic values resulting from extreme inputs (e.g. pH > 14 or < 0 if not directly input)
    if (ph < 0 || ph > 14 || poh < 0 || poh > 14) {
        if (inputType !== 'ph' && inputType !== 'poh') { // Only warn if not directly inputting pH/pOH
             toast({ title: 'Note', description: 'Calculated pH/pOH is outside the typical 0-14 range. Results may be theoretical.', variant: 'default' });
        }
    }


    setResults({
      ph: ph.toPrecision(4),
      poh: poh.toPrecision(4),
      hConcentration: hConcentration.toExponential(3),
      ohConcentration: ohConcentration.toExponential(3),
    });
    toast({ title: 'Calculation Complete!', action: <CheckCircle2 className="text-green-500"/> });
  };

  const getInputLabel = () => {
    switch (inputType) {
      case 'h_concentration': return 'Hydrogen Ion Concentration [H⁺] (mol/L)';
      case 'oh_concentration': return 'Hydroxide Ion Concentration [OH⁻] (mol/L)';
      case 'ph': return 'pH Value';
      case 'poh': return 'pOH Value';
      default: return 'Input Value';
    }
  };
  
  const getInputPlaceholder = () => {
    switch (inputType) {
      case 'h_concentration': return 'e.g., 1e-7 or 0.0000001';
      case 'oh_concentration': return 'e.g., 1e-7 or 0.0000001';
      case 'ph': return 'e.g., 7.0';
      case 'poh': return 'e.g., 7.0';
      default: return '';
    }
  };

  return (
    <>
      <Helmet>
        <title>pH and pOH Calculator | Toolzenix</title>
        <meta name="description" content="Calculate pH, pOH, [H⁺], or [OH⁻] based on one known value. Understand solution acidity or basicity." />
        <link rel="canonical" href="https://toolzenix.com/ph-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FlaskConical className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            pH & pOH Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Calculate pH, pOH, [H⁺], or [OH⁻] from one known value (at 25°C).
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <Label htmlFor="inputType" className="text-md font-medium text-gray-700 dark:text-gray-300">Calculate from:</Label>
            <select
              id="inputType"
              value={inputType}
              onChange={(e) => {setInputType(e.target.value); setInputValue(''); setResults(null);}}
              className="mt-1 block w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="h_concentration">[H⁺] Concentration</option>
              <option value="oh_concentration">[OH⁻] Concentration</option>
              <option value="ph">pH</option>
              <option value="poh">pOH</option>
            </select>
          </div>

          <div className="mb-6">
            <Label htmlFor="inputValue" className="text-md font-medium text-gray-700 dark:text-gray-300">{getInputLabel()}</Label>
            <Input
              id="inputValue"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="mt-1 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <Button onClick={calculateValues} className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3">
            <Calculator className="w-5 h-5 mr-2" /> Calculate
          </Button>

          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Results (at 25°C)</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-red-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold">pH:</p> <p className="text-lg text-red-600 dark:text-red-400">{results.ph}</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold">pOH:</p> <p className="text-lg text-red-600 dark:text-red-400">{results.poh}</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold">[H⁺]:</p> <p className="text-lg text-red-600 dark:text-red-400">{results.hConcentration} mol/L</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold">[OH⁻]:</p> <p className="text-lg text-red-600 dark:text-red-400">{results.ohConcentration} mol/L</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding pH and pOH</h2>
          <p>
            pH is a measure of hydrogen ion concentration, a measure of the acidity or alkalinity of a solution. The pH scale usually ranges from 0 to 14.
          </p>
          <ul>
            <li>pH &lt; 7 is acidic</li>
            <li>pH = 7 is neutral</li>
            <li>pH &gt; 7 is basic (alkaline)</li>
          </ul>
          <p>
            pOH is a measure of hydroxide ion concentration. It is related to pH by the equation: pH + pOH = 14 (at 25°C).
          </p>
          <p>
            This calculator uses the following formulas:
            <br/>pH = -log₁₀[H⁺]
            <br/>pOH = -log₁₀[OH⁻]
            <br/>[H⁺] = 10<sup>-pH</sup>
            <br/>[OH⁻] = 10<sup>-pOH</sup>
            <br/>K<sub>w</sub> = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default PhCalculator;