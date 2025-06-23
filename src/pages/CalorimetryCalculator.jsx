import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Flame, CheckCircle2, AlertTriangle, Calculator } from 'lucide-react';

const CalorimetryCalculator = () => {
  const [calculate, setCalculate] = useState('heat'); // 'heat', 'mass', 'specificHeat', 'deltaT'
  const [heat, setHeat] = useState(''); // q
  const [mass, setMass] = useState(''); // m
  const [specificHeat, setSpecificHeat] = useState(''); // c
  const [deltaT, setDeltaT] = useState(''); // ΔT
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    const q = parseFloat(heat);
    const m = parseFloat(mass);
    const c = parseFloat(specificHeat);
    const dT = parseFloat(deltaT);
    let calculatedValue = null;

    try {
      if (calculate === 'heat') {
        if (isNaN(m) || isNaN(c) || isNaN(dT)) throw new Error('Valid mass, specific heat, and ΔT required.');
        calculatedValue = m * c * dT;
        setHeat(calculatedValue.toFixed(2));
        setResult(`Heat (q) = ${calculatedValue.toFixed(2)} Joules (J)`);
      } else if (calculate === 'mass') {
        if (isNaN(q) || isNaN(c) || isNaN(dT) || (c * dT === 0)) throw new Error('Valid heat, specific heat, ΔT, and non-zero c*ΔT required.');
        calculatedValue = q / (c * dT);
        setMass(calculatedValue.toFixed(2));
        setResult(`Mass (m) = ${calculatedValue.toFixed(2)} grams (g)`);
      } else if (calculate === 'specificHeat') {
        if (isNaN(q) || isNaN(m) || isNaN(dT) || (m * dT === 0)) throw new Error('Valid heat, mass, ΔT, and non-zero m*ΔT required.');
        calculatedValue = q / (m * dT);
        setSpecificHeat(calculatedValue.toFixed(4));
        setResult(`Specific Heat (c) = ${calculatedValue.toFixed(4)} J/g°C`);
      } else if (calculate === 'deltaT') {
        if (isNaN(q) || isNaN(m) || isNaN(c) || (m * c === 0)) throw new Error('Valid heat, mass, specific heat, and non-zero m*c required.');
        calculatedValue = q / (m * c);
        setDeltaT(calculatedValue.toFixed(2));
        setResult(`Temperature Change (ΔT) = ${calculatedValue.toFixed(2)} °C`);
      }
      toast({ title: 'Calculation Successful!', description: 'Result updated below.', action: <CheckCircle2 className="text-green-500" /> });
    } catch (error) {
      toast({ title: 'Calculation Error', description: error.message, variant: 'destructive', action: <AlertTriangle className="text-red-500" /> });
      setResult(null);
    }
  };
  
  const resetFields = () => {
    setHeat('');
    setMass('');
    setSpecificHeat('');
    setDeltaT('');
    setResult(null);
    toast({title: "Fields Cleared", description: "Ready for new calculation."});
  };

  return (
    <>
      <Helmet>
        <title>Calorimetry Calculator (q=mcΔT) | Toolzenix</title>
        <meta name="description" content="Calculate heat transfer (q), mass (m), specific heat capacity (c), or temperature change (ΔT) using the formula q = mcΔT." />
        <link rel="canonical" href="https://toolzenix.com/calorimetry-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Flame className="w-16 h-16 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Calorimetry Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Solve for heat transfer using q = mcΔT.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="calculate-select" className="text-md font-medium text-gray-700 dark:text-gray-300">Calculate for:</Label>
            <Select value={calculate} onValueChange={setCalculate}>
              <SelectTrigger id="calculate-select" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-md p-3 h-auto">
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="heat" className="text-md">Heat (q)</SelectItem>
                <SelectItem value="mass" className="text-md">Mass (m)</SelectItem>
                <SelectItem value="specificHeat" className="text-md">Specific Heat (c)</SelectItem>
                <SelectItem value="deltaT" className="text-md">Temperature Change (ΔT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 mb-6">
            {calculate !== 'heat' && (
              <div>
                <Label htmlFor="heat-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Heat (q) in Joules (J)</Label>
                <Input id="heat-input" type="number" value={heat} onChange={(e) => setHeat(e.target.value)} placeholder="e.g., 4186" className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600" disabled={calculate === 'heat'} />
              </div>
            )}
            {calculate !== 'mass' && (
              <div>
                <Label htmlFor="mass-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Mass (m) in grams (g)</Label>
                <Input id="mass-input" type="number" value={mass} onChange={(e) => setMass(e.target.value)} placeholder="e.g., 100" className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600" disabled={calculate === 'mass'} />
              </div>
            )}
            {calculate !== 'specificHeat' && (
              <div>
                <Label htmlFor="specificHeat-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Specific Heat (c) in J/g°C</Label>
                <Input id="specificHeat-input" type="number" value={specificHeat} onChange={(e) => setSpecificHeat(e.target.value)} placeholder="e.g., 4.186 for water" className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600" disabled={calculate === 'specificHeat'} />
              </div>
            )}
            {calculate !== 'deltaT' && (
              <div>
                <Label htmlFor="deltaT-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Temperature Change (ΔT) in °C</Label>
                <Input id="deltaT-input" type="number" value={deltaT} onChange={(e) => setDeltaT(e.target.value)} placeholder="e.g., 10" className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600" disabled={calculate === 'deltaT'} />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleCalculate} className="flex-1 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-lg py-3">
              <Calculator className="w-5 h-5 mr-2" /> Calculate
            </Button>
            <Button onClick={resetFields} variant="outline" className="flex-1 text-lg py-3 border-gray-300 dark:border-gray-500 dark:text-gray-300">
              Reset
            </Button>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <Label className="text-md font-medium text-gray-700 dark:text-gray-300">Result:</Label>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                {result}
              </p>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding Calorimetry</h2>
          <p>
            Calorimetry is the science of measuring heat change. The fundamental equation used is:
            <strong>q = mcΔT</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>q</strong> = heat absorbed or released (in Joules)</li>
            <li><strong>m</strong> = mass of the substance (in grams)</li>
            <li><strong>c</strong> = specific heat capacity of the substance (in J/g°C)</li>
            <li><strong>ΔT</strong> = change in temperature (Final T - Initial T, in °C or Kelvin)</li>
          </ul>
          <p>This tool helps you calculate any one of these variables if the other three are known. It's useful for chemistry and physics problems involving heat transfer.</p>
        </motion.div>
      </div>
    </>
  );
};

export default CalorimetryCalculator;