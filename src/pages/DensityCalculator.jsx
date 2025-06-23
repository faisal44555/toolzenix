import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Scale, CheckCircle2, AlertTriangle, Calculator } from 'lucide-react';

const DensityCalculator = () => {
  const [calculate, setCalculate] = useState('density'); // 'density', 'mass', 'volume'
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [density, setDensity] = useState('');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  // Basic unit handling, can be expanded
  const [massUnit, setMassUnit] = useState('g');
  const [volumeUnit, setVolumeUnit] = useState('cm3');
  const [densityUnit, setDensityUnit] = useState('g/cm3');

  const handleCalculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(volume);
    const d = parseFloat(density);
    let calculatedValue = null;

    try {
      if (calculate === 'density') {
        if (isNaN(m) || isNaN(v) || v === 0) throw new Error('Valid mass and non-zero volume required.');
        calculatedValue = m / v;
        setDensity(calculatedValue.toFixed(4));
        setResult(`Density (ρ) = ${calculatedValue.toFixed(4)} ${densityUnit}`);
      } else if (calculate === 'mass') {
        if (isNaN(d) || isNaN(v)) throw new Error('Valid density and volume required.');
        calculatedValue = d * v;
        setMass(calculatedValue.toFixed(4));
        setResult(`Mass (m) = ${calculatedValue.toFixed(4)} ${massUnit}`);
      } else if (calculate === 'volume') {
        if (isNaN(d) || isNaN(m) || d === 0) throw new Error('Valid density and non-zero mass required.');
        calculatedValue = m / d;
        setVolume(calculatedValue.toFixed(4));
        setResult(`Volume (V) = ${calculatedValue.toFixed(4)} ${volumeUnit}`);
      }
      toast({ title: 'Calculation Successful!', description: 'Result updated below.', action: <CheckCircle2 className="text-green-500" /> });
    } catch (error) {
      toast({ title: 'Calculation Error', description: error.message, variant: 'destructive', action: <AlertTriangle className="text-red-500" /> });
      setResult(null);
    }
  };
  
  const resetFields = () => {
    setMass('');
    setVolume('');
    setDensity('');
    setResult(null);
    // setCalculate('density'); // Optionally reset select
    toast({title: "Fields Cleared", description: "Ready for new calculation."});
  }

  return (
    <>
      <Helmet>
        <title>Density Calculator | Toolzenix</title>
        <meta name="description" content="Calculate density, mass, or volume given the other two values. Supports various units." />
        <link rel="canonical" href="https://toolzenix.com/density-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Scale className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Density Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Easily calculate density (ρ), mass (m), or volume (V).
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="calculate-select" className="text-md font-medium text-gray-700 dark:text-gray-300">What do you want to calculate?</Label>
            <Select value={calculate} onValueChange={setCalculate}>
              <SelectTrigger id="calculate-select" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-md p-3 h-auto">
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="density" className="text-md">Density (ρ = m/V)</SelectItem>
                <SelectItem value="mass" className="text-md">Mass (m = ρV)</SelectItem>
                <SelectItem value="volume" className="text-md">Volume (V = m/ρ)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 mb-6">
            {calculate !== 'mass' && (
              <div>
                <Label htmlFor="mass-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Mass (m)</Label>
                <div className="flex items-center mt-1">
                  <Input
                    id="mass-input"
                    type="number"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    placeholder="e.g., 100"
                    className="text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500 rounded-r-none"
                    disabled={calculate === 'mass'}
                  />
                  <Input value={massUnit} readOnly className="w-20 text-center bg-gray-100 dark:bg-gray-600 rounded-l-none border-l-0"/>
                </div>
              </div>
            )}
            {calculate !== 'volume' && (
              <div>
                <Label htmlFor="volume-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Volume (V)</Label>
                 <div className="flex items-center mt-1">
                  <Input
                    id="volume-input"
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="e.g., 10"
                    className="text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500 rounded-r-none"
                    disabled={calculate === 'volume'}
                  />
                  <Input value={volumeUnit} readOnly className="w-20 text-center bg-gray-100 dark:bg-gray-600 rounded-l-none border-l-0"/>
                </div>
              </div>
            )}
            {calculate !== 'density' && (
              <div>
                <Label htmlFor="density-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Density (ρ)</Label>
                <div className="flex items-center mt-1">
                  <Input
                    id="density-input"
                    type="number"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    placeholder="e.g., 10"
                    className="text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500 rounded-r-none"
                    disabled={calculate === 'density'}
                  />
                  <Input value={densityUnit} readOnly className="w-20 text-center bg-gray-100 dark:bg-gray-600 rounded-l-none border-l-0"/>
                 </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleCalculate} className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-lg py-3">
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
              <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
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
          <h2 className="text-2xl font-semibold">Understanding Density</h2>
          <p>
            Density is a fundamental property of matter, defined as mass per unit volume. The formula is: <strong>ρ = m / V</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>ρ (rho)</strong> is density.</li>
            <li><strong>m</strong> is mass.</li>
            <li><strong>V</strong> is volume.</li>
          </ul>
          <p>This calculator allows you to find any one of these values if you know the other two. Default units are grams (g) for mass, cubic centimeters (cm³) for volume, and g/cm³ for density. More unit options can be added in future updates.</p>
        </motion.div>
      </div>
    </>
  );
};

export default DensityCalculator;