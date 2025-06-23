import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Flame, Weight, Ruler, CalendarDays, User, AlertCircle } from 'lucide-react';

const BmrCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unitSystem, setUnitSystem] = useState('metric'); // metric (kg, cm), imperial (lbs, in)
  const [bmr, setBmr] = useState(null);
  const { toast } = useToast();

  const calculateBmr = () => {
    if (!age || !weight || !height) {
      toast({ title: 'Missing Information', description: 'Please fill in age, weight, and height.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    const ageNum = parseInt(age);
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    if (unitSystem === 'imperial') {
      weightKg = parseFloat(weight) * 0.453592; // lbs to kg
      heightCm = parseFloat(height) * 2.54;    // inches to cm
    }

    if (ageNum <= 0 || weightKg <= 0 || heightCm <= 0) {
      toast({ title: 'Invalid Input', description: 'Age, weight, and height must be positive values.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    let calculatedBmr;
    // Mifflin-St Jeor Equation:
    // For men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // For women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    if (gender === 'male') {
      calculatedBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
    } else {
      calculatedBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
    }
    
    setBmr(calculatedBmr.toFixed(0));
    toast({ title: 'BMR Calculated!', description: `Your Basal Metabolic Rate is approximately ${calculatedBmr.toFixed(0)} calories/day.` });
  };

  return (
    <>
      <Helmet>
        <title>BMR Calculator - Basal Metabolic Rate | Toolzenix</title>
        <meta name="description" content="Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation. Understand the calories your body needs at rest." />
        <link rel="canonical" href="https://toolzenix.com/bmr-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Brain className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">BMR Calculator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimate your Basal Metabolic Rate – calories burned at rest.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label className="text-gray-700 dark:text-gray-300 mb-1 block">Unit System</Label>
            <Select value={unitSystem} onValueChange={setUnitSystem}>
              <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="age" className="text-gray-700 dark:text-gray-300 flex items-center"><CalendarDays size={16} className="mr-2 text-teal-500"/>Age (years)</Label>
              <Input id="age" type="number" placeholder="e.g., 30" value={age} onChange={e => setAge(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300 flex items-center"><User size={16} className="mr-2 text-teal-500"/>Gender</Label>
              <RadioGroup defaultValue="male" value={gender} onValueChange={setGender} className="mt-2 flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" className="text-teal-600 border-teal-600 focus:ring-teal-500"/>
                  <Label htmlFor="male" className="text-gray-700 dark:text-gray-300">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" className="text-pink-600 border-pink-600 focus:ring-pink-500"/>
                  <Label htmlFor="female" className="text-gray-700 dark:text-gray-300">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div>
            <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300 flex items-center"><Weight size={16} className="mr-2 text-teal-500"/>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Label>
            <Input id="weight" type="number" placeholder={unitSystem === 'metric' ? "e.g., 70" : "e.g., 154"} value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <div>
            <Label htmlFor="height" className="text-gray-700 dark:text-gray-300 flex items-center"><Ruler size={16} className="mr-2 text-teal-500"/>Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</Label>
            <Input id="height" type="number" placeholder={unitSystem === 'metric' ? "e.g., 175" : "e.g., 69"} value={height} onChange={e => setHeight(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <Button onClick={calculateBmr} className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white py-3 text-lg font-semibold">
            Calculate BMR
          </Button>

          {bmr !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">Your Basal Metabolic Rate is:</p>
              <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 my-2">
                {bmr} <span className="text-xl">calories/day</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is the number of calories your body needs to perform basic life-sustaining functions at rest.
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Understanding BMR</h2>
          <p>
            Basal Metabolic Rate (BMR) is the number of calories your body burns at rest to maintain vital functions like breathing, circulation, and cell production. It's the minimum amount of energy needed to keep your body functioning if you were to do nothing but rest for 24 hours.
          </p>
          <p>
            This calculator uses the Mifflin-St Jeor equation, which is considered one of the most accurate formulas for estimating BMR:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>For Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</li>
            <li><strong>For Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</li>
          </ul>
          <p>
            Knowing your BMR can be a starting point for determining your total daily calorie needs when combined with your activity level (this is often referred to as TDEE - Total Daily Energy Expenditure).
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>BMR calculations are estimates. Individual metabolic rates can vary. Consult a healthcare professional for personalized advice.</p>
        </motion.div>
      </div>
    </>
  );
};

export default BmrCalculator;