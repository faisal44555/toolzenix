import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Droplets, Weight, AlertCircle as ActivityIcon, AlertCircle } from 'lucide-react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('light'); // light, moderate, active
  const [unitSystem, setUnitSystem] = useState('metric'); // metric (kg, ml), imperial (lbs, oz)
  const [dailyIntake, setDailyIntake] = useState(null);
  const { toast } = useToast();

  const calculateWaterIntake = () => {
    if (!weight) {
      toast({ title: 'Missing Weight', description: 'Please enter your weight.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    let weightKg = parseFloat(weight);
    if (unitSystem === 'imperial') {
      weightKg = parseFloat(weight) * 0.453592; // lbs to kg
    }

    if (weightKg <= 0) {
      toast({ title: 'Invalid Weight', description: 'Weight must be a positive value.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    // Basic formula: weight (kg) * 30-35 ml. Using average 33ml.
    let baseIntakeMl = weightKg * 33;

    // Adjust for activity level
    if (activityLevel === 'moderate') {
      baseIntakeMl += 500; // Add 500ml for moderate activity
    } else if (activityLevel === 'active') {
      baseIntakeMl += 1000; // Add 1000ml for active individuals
    }

    if (unitSystem === 'metric') {
      setDailyIntake({ value: (baseIntakeMl / 1000).toFixed(1), unit: 'Liters' });
    } else { // imperial
      const intakeOz = baseIntakeMl * 0.033814; // ml to fluid oz
      setDailyIntake({ value: intakeOz.toFixed(1), unit: 'fl oz' });
    }
    toast({ title: 'Water Intake Calculated!', description: 'Check your estimated daily water needs below.' });
  };

  return (
    <>
      <Helmet>
        <title>Daily Water Intake Calculator | Toolzenix</title>
        <meta name="description" content="Estimate your daily water intake needs based on your weight and activity level. Supports metric and imperial units. Stay hydrated!" />
        <link rel="canonical" href="https://toolzenix.com/water-intake-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Droplets className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Daily Water Intake Calculator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimate how much water you should drink per day.
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
                <SelectItem value="metric">Metric (kg)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Label>
            <Input id="weight" type="number" placeholder={unitSystem === 'metric' ? "e.g., 70" : "e.g., 154"} value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          
          <div>
            <Label htmlFor="activity-level" className="text-gray-700 dark:text-gray-300">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger id="activity-level" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="light">Light (little to no exercise)</SelectItem>
                <SelectItem value="moderate">Moderate (exercise 1-3 days/week)</SelectItem>
                <SelectItem value="active">Active (exercise 3-5 days/week or intense exercise)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateWaterIntake} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 text-lg font-semibold">
            <Weight className="mr-2 h-5 w-5" /> Calculate Water Intake
          </Button>

          {dailyIntake && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">Your Estimated Daily Water Intake:</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 my-2">
                {dailyIntake.value} <span className="text-2xl">{dailyIntake.unit}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is approximately {(parseFloat(dailyIntake.value) / (dailyIntake.unit === 'Liters' ? 0.25 : 8)).toFixed(0)} glasses ({dailyIntake.unit === 'Liters' ? '250ml' : '8oz'} per glass).
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Why is Water Important?</h2>
          <p>
            Water is essential for numerous bodily functions, including regulating temperature, transporting nutrients, and flushing out waste. Staying properly hydrated can improve energy levels, brain function, and physical performance.
          </p>
          <h3 className="text-xl font-semibold">Factors Affecting Water Needs:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Activity Level:</strong> More active individuals need more water.</li>
            <li><strong>Climate:</strong> Hot or humid weather increases water loss through sweat.</li>
            <li><strong>Overall Health:</strong> Certain health conditions or medications can affect hydration needs.</li>
            <li><strong>Pregnancy/Breastfeeding:</strong> Increased water intake is often required.</li>
          </ul>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/> This calculator provides a general estimate. Individual needs can vary. Listen to your body and drink when you're thirsty. Consult a healthcare professional for personalized advice.</p>
        </motion.div>
      </div>
    </>
  );
};

export default WaterIntakeCalculator;