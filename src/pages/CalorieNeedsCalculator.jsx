import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Flame, Weight, Ruler, CalendarDays, User, Zap, AlertCircle } from 'lucide-react';

const CalorieNeedsCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [unitSystem, setUnitSystem] = useState('metric'); // metric (kg, cm), imperial (lbs, in)
  const [calorieNeeds, setCalorieNeeds] = useState(null);
  const { toast } = useToast();

  const activityMultipliers = {
    sedentary: 1.2,       // little or no exercise
    light: 1.375,         // light exercise/sports 1-3 days/week
    moderate: 1.55,       // moderate exercise/sports 3-5 days/week
    active: 1.725,        // hard exercise/sports 6-7 days a week
    veryActive: 1.9       // very hard exercise/sports & physical job
  };

  const calculateCalorieNeeds = () => {
    if (!age || !weight || !height || !activityLevel) {
      toast({ title: 'Missing Information', description: 'Please fill all fields.', variant: 'destructive', action: <AlertCircle/> });
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

    let bmr;
    // Mifflin-St Jeor Equation for BMR
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
    }

    const tdee = bmr * activityMultipliers[activityLevel];
    setCalorieNeeds(tdee.toFixed(0));
    toast({ title: 'Calorie Needs Calculated!', description: `Your estimated daily calorie needs are ${tdee.toFixed(0)} calories.` });
  };

  return (
    <>
      <Helmet>
        <title>Daily Calorie Needs Calculator | Toolzenix</title>
        <meta name="description" content="Estimate your daily calorie needs based on age, gender, weight, height, and activity level using the Mifflin-St Jeor equation." />
        <link rel="canonical" href="https://toolzenix.com/calorie-needs-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Flame className="w-16 h-16 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Daily Calorie Calculator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimate your daily calorie needs to maintain your current weight.
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
              <Label htmlFor="age" className="text-gray-700 dark:text-gray-300 flex items-center"><CalendarDays size={16} className="mr-2 text-orange-500"/>Age (years)</Label>
              <Input id="age" type="number" placeholder="e.g., 30" value={age} onChange={e => setAge(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300 flex items-center"><User size={16} className="mr-2 text-orange-500"/>Gender</Label>
              <RadioGroup defaultValue="male" value={gender} onValueChange={setGender} className="mt-2 flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male-calorie" className="text-orange-600 border-orange-600 focus:ring-orange-500"/>
                  <Label htmlFor="male-calorie" className="text-gray-700 dark:text-gray-300">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female-calorie" className="text-pink-600 border-pink-600 focus:ring-pink-500"/>
                  <Label htmlFor="female-calorie" className="text-gray-700 dark:text-gray-300">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div>
            <Label htmlFor="weight-calorie" className="text-gray-700 dark:text-gray-300 flex items-center"><Weight size={16} className="mr-2 text-orange-500"/>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Label>
            <Input id="weight-calorie" type="number" placeholder={unitSystem === 'metric' ? "e.g., 70" : "e.g., 154"} value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <div>
            <Label htmlFor="height-calorie" className="text-gray-700 dark:text-gray-300 flex items-center"><Ruler size={16} className="mr-2 text-orange-500"/>Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</Label>
            <Input id="height-calorie" type="number" placeholder={unitSystem === 'metric' ? "e.g., 175" : "e.g., 69"} value={height} onChange={e => setHeight(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <div>
            <Label htmlFor="activity-level" className="text-gray-700 dark:text-gray-300 flex items-center"><Zap size={16} className="mr-2 text-orange-500"/>Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger id="activity-level" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="light">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                <SelectItem value="active">Very active (hard exercise/sports 6-7 days a week)</SelectItem>
                <SelectItem value="veryActive">Extra active (very hard exercise/sports & physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateCalorieNeeds} className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white py-3 text-lg font-semibold">
            Calculate Daily Calories
          </Button>

          {calorieNeeds !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">Your Estimated Daily Calorie Needs:</p>
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 my-2">
                {calorieNeeds} <span className="text-xl">calories/day</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is an estimate to maintain your current weight. Adjust for weight loss or gain.
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
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How Are Daily Calories Calculated?</h2>
          <p>
            This calculator estimates your Total Daily Energy Expenditure (TDEE), which is the total number of calories your body burns in a day. It uses the Mifflin-St Jeor equation to first calculate your Basal Metabolic Rate (BMR), and then multiplies it by an activity factor.
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li><strong>Basal Metabolic Rate (BMR):</strong> Calories burned at rest.
              <ul className="list-disc list-inside ml-4">
                <li>Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</li>
                <li>Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</li>
              </ul>
            </li>
            <li><strong>Total Daily Energy Expenditure (TDEE):</strong> BMR × Activity Multiplier.
              <ul className="list-disc list-inside ml-4">
                <li>Sedentary: BMR × 1.2</li>
                <li>Lightly active: BMR × 1.375</li>
                <li>Moderately active: BMR × 1.55</li>
                <li>Very active: BMR × 1.725</li>
                <li>Extra active: BMR × 1.9</li>
              </ul>
            </li>
          </ol>
          <p>
            The result is an estimate of the calories you need to consume daily to maintain your current weight. For weight loss, you'd typically aim to consume fewer calories, and for weight gain, more.
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>These calculations are estimates. Individual needs can vary. Consult with a healthcare provider or registered dietitian for personalized nutrition advice.</p>
        </motion.div>
      </div>
    </>
  );
};

export default CalorieNeedsCalculator;