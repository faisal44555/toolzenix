import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Footprints, Flame, Weight, AlertCircle } from 'lucide-react';

const StepsToCaloriesConverter = () => {
  const [steps, setSteps] = useState('');
  const [weight, setWeight] = useState('');
  const [unitSystem, setUnitSystem] = useState('metric'); // metric (kg), imperial (lbs)
  const [caloriesBurned, setCaloriesBurned] = useState(null);
  const { toast } = useToast();

  // MET (Metabolic Equivalent of Task) values for walking:
  // Casual walking (e.g., around 3 mph or 5 km/h): ~3.5 METs
  // Brisk walking (e.g., around 4 mph or 6.5 km/h): ~4.3 METs
  // Average steps per mile: ~2000-2500. Using 2250 as an average.
  // Calories burned per minute = (METs * body weight in kg * 3.5) / 200
  // Calories burned per step = (METs * body weight in kg * 3.5) / 200 / (average steps per minute)
  // Assuming average walking speed of 100 steps/minute for simplicity in this basic calculator.
  // So, Calories per step = (MET * weight_kg * 3.5) / 200 / 100
  // Simplified: Calories per step = MET * weight_kg * 0.000175
  // Using an average MET value of 3.9 for general walking.

  const MET_WALKING = 3.9; 

  const calculateCalories = () => {
    if (!steps || !weight) {
      toast({ title: 'Missing Information', description: 'Please enter both steps and weight.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    const numSteps = parseInt(steps);
    let weightKg = parseFloat(weight);

    if (unitSystem === 'imperial') {
      weightKg = parseFloat(weight) * 0.453592; // lbs to kg
    }

    if (numSteps <= 0 || weightKg <= 0) {
      toast({ title: 'Invalid Input', description: 'Steps and weight must be positive values.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    const caloriesPerStep = MET_WALKING * weightKg * 0.000175;
    const totalCaloriesBurned = numSteps * caloriesPerStep;
    
    setCaloriesBurned(totalCaloriesBurned.toFixed(0));
    toast({ title: 'Calories Calculated!', description: `You burned approximately ${totalCaloriesBurned.toFixed(0)} calories.` });
  };

  return (
    <>
      <Helmet>
        <title>Steps to Calories Converter | Toolzenix</title>
        <meta name="description" content="Estimate the number of calories burned from walking based on your step count and weight. Supports metric and imperial units." />
        <link rel="canonical" href="https://toolzenix.com/steps-to-calories-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Footprints className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Steps to Calories Converter</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimate calories burned from your daily steps.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label htmlFor="unit-system" className="text-gray-700 dark:text-gray-300">Unit System for Weight</Label>
            <Select value={unitSystem} onValueChange={setUnitSystem}>
              <SelectTrigger id="unit-system" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="metric">Metric (kg)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="steps" className="text-gray-700 dark:text-gray-300">Number of Steps</Label>
            <Input id="steps" type="number" placeholder="e.g., 10000" value={steps} onChange={e => setSteps(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          
          <div>
            <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300">Your Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Label>
            <Input id="weight" type="number" placeholder={unitSystem === 'metric' ? "e.g., 70" : "e.g., 154"} value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <Button onClick={calculateCalories} className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white py-3 text-lg font-semibold">
            <Flame className="mr-2 h-5 w-5" /> Calculate Calories
          </Button>

          {caloriesBurned !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">Estimated Calories Burned:</p>
              <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 my-2">{caloriesBurned}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This is an approximation. Actual calories burned may vary.</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p>
            This tool estimates the calories you burn while walking based on the number of steps taken and your body weight. It uses a standard Metabolic Equivalent of Task (MET) value for walking.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter the total number of steps you've walked.</li>
            <li>Provide your current weight in kilograms (kg) or pounds (lbs).</li>
            <li>The calculator will then estimate the total calories burned.</li>
          </ul>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/> This calculation is an estimate. Factors like walking intensity, terrain, individual metabolism, and body composition can affect actual calorie expenditure.</p>
        </motion.div>
      </div>
    </>
  );
};

export default StepsToCaloriesConverter;