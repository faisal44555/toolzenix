import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Scale, User, AlertCircle } from 'lucide-react';

const IdealWeightCalculator = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [idealWeightRange, setIdealWeightRange] = useState(null);
  const { toast } = useToast();

  const calculateIdealWeight = () => {
    if (!height) {
      toast({ title: 'Missing Height', description: 'Please enter your height.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    let heightCm = parseFloat(height);
    if (unitSystem === 'imperial') {
      heightCm = parseFloat(height) * 2.54; // inches to cm
    }

    if (heightCm <= 0) {
      toast({ title: 'Invalid Height', description: 'Height must be a positive value.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    let robinsonWeight, millerWeight, devineWeight, hamwiWeight;
    const heightInches = heightCm / 2.54;

    if (gender === 'male') {
      robinsonWeight = 52 + 1.9 * (heightInches - 60);
      millerWeight = 56.2 + 1.41 * (heightInches - 60);
      devineWeight = 50 + 2.3 * (heightInches - 60);
      hamwiWeight = 48 + 2.7 * (heightInches - 60);
    } else { // female
      robinsonWeight = 49 + 1.7 * (heightInches - 60);
      millerWeight = 53.1 + 1.36 * (heightInches - 60);
      devineWeight = 45.5 + 2.3 * (heightInches - 60);
      hamwiWeight = 45.5 + 2.2 * (heightInches - 60);
    }
    
    const weightsKg = [robinsonWeight, millerWeight, devineWeight, hamwiWeight].filter(w => w > 0);
    if (weightsKg.length === 0) {
        setIdealWeightRange(null);
        toast({ title: 'Calculation Error', description: 'Could not calculate ideal weight. Height might be too low for these formulas.', variant: 'destructive', action: <AlertCircle/> });
        return;
    }

    const minWeightKg = Math.min(...weightsKg);
    const maxWeightKg = Math.max(...weightsKg);

    if (unitSystem === 'metric') {
      setIdealWeightRange({
        robinson: robinsonWeight > 0 ? robinsonWeight.toFixed(1) : 'N/A',
        miller: millerWeight > 0 ? millerWeight.toFixed(1) : 'N/A',
        devine: devineWeight > 0 ? devineWeight.toFixed(1) : 'N/A',
        hamwi: hamwiWeight > 0 ? hamwiWeight.toFixed(1) : 'N/A',
        averageMin: minWeightKg.toFixed(1),
        averageMax: maxWeightKg.toFixed(1),
        unit: 'kg'
      });
    } else { // imperial
      setIdealWeightRange({
        robinson: robinsonWeight > 0 ? (robinsonWeight * 2.20462).toFixed(1) : 'N/A',
        miller: millerWeight > 0 ? (millerWeight * 2.20462).toFixed(1) : 'N/A',
        devine: devineWeight > 0 ? (devineWeight * 2.20462).toFixed(1) : 'N/A',
        hamwi: hamwiWeight > 0 ? (hamwiWeight * 2.20462).toFixed(1) : 'N/A',
        averageMin: (minWeightKg * 2.20462).toFixed(1),
        averageMax: (maxWeightKg * 2.20462).toFixed(1),
        unit: 'lbs'
      });
    }
    toast({ title: 'Ideal Weight Calculated!', description: 'Check your estimated ideal weight range below.' });
  };

  return (
    <>
      <Helmet>
        <title>Ideal Weight Calculator | Toolzenix</title>
        <meta name="description" content="Calculate your ideal body weight range based on height and gender using various common formulas. Supports metric and imperial units." />
        <link rel="canonical" href="https://toolzenix.com/ideal-weight-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Scale className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Ideal Weight Calculator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimate your ideal body weight based on popular formulas.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label htmlFor="unit-system" className="text-gray-700 dark:text-gray-300">Unit System</Label>
            <Select value={unitSystem} onValueChange={setUnitSystem}>
              <SelectTrigger id="unit-system" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="metric">Metric (cm)</SelectItem>
                <SelectItem value="imperial">Imperial (inches)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="height" className="text-gray-700 dark:text-gray-300">Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</Label>
              <Input id="height" type="number" placeholder={unitSystem === 'metric' ? "e.g., 175" : "e.g., 69"} value={height} onChange={e => setHeight(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label htmlFor="gender" className="text-gray-700 dark:text-gray-300">Biological Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateIdealWeight} className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 text-lg font-semibold">
            <User className="mr-2 h-5 w-5" /> Calculate Ideal Weight
          </Button>

          {idealWeightRange && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">Estimated Ideal Weight Range:</h3>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-200">
                  {idealWeightRange.averageMin} - {idealWeightRange.averageMax} <span className="text-lg">{idealWeightRange.unit}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">(Based on average of formulas)</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                <p className="text-gray-700 dark:text-gray-300">Robinson Formula: <span className="font-semibold">{idealWeightRange.robinson} {idealWeightRange.unit}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Miller Formula: <span className="font-semibold">{idealWeightRange.miller} {idealWeightRange.unit}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Devine Formula: <span className="font-semibold">{idealWeightRange.devine} {idealWeightRange.unit}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Hamwi Formula: <span className="font-semibold">{idealWeightRange.hamwi} {idealWeightRange.unit}</span></p>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
                These formulas provide estimates. Ideal weight can vary based on body composition, age, and individual health factors.
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">About Ideal Weight Formulas</h2>
          <p>
            Various formulas exist to estimate ideal body weight. This calculator uses several common ones:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Robinson Formula (1983)</strong></li>
            <li><strong>Miller Formula (1983)</strong></li>
            <li><strong>Devine Formula (1974)</strong></li>
            <li><strong>Hamwi Formula (1964)</strong></li>
          </ul>
          <p>
            These formulas are generally applicable for adults and provide a range rather than a single "perfect" weight.
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/> Ideal weight is a guideline. Focus on overall health, including diet, exercise, and body composition. Consult a healthcare professional for personalized advice.</p>
        </motion.div>
      </div>
    </>
  );
};

export default IdealWeightCalculator;