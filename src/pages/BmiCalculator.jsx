import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const calculateBmi = () => {
    if (!weight || !height) {
      toast({
        title: "Missing values",
        description: "Please enter both weight and height.",
        variant: "destructive"
      });
      return;
    }

    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100;

    if (weightKg <= 0 || heightM <= 0) {
      toast({
        title: "Invalid values",
        description: "Weight and height must be greater than zero.",
        variant: "destructive"
      });
      return;
    }

    const calculatedBmi = weightKg / (heightM * heightM);
    const bmiCategory = getBmiCategory(calculatedBmi);
    
    setBmi(calculatedBmi.toFixed(1));
    setCategory(bmiCategory);

    toast({
      title: "BMI Calculated!",
      description: `Your BMI is ${calculatedBmi.toFixed(1)} (${bmiCategory})`
    });
  };

  const getCategoryColor = () => {
    switch (category) {
      case "Underweight": return "text-blue-500";
      case "Normal weight": return "text-green-500";
      case "Overweight": return "text-yellow-500";
      case "Obese": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>BMI Calculator - Calculate Your Body Mass Index | Toolzenix</title>
        <meta name="description" content="Calculate your Body Mass Index (BMI) with our free online BMI calculator. Get instant results and health category." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Activity className="w-10 h-10 mr-3 text-red-500" /> BMI Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate your Body Mass Index instantly
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight in kilograms"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter height in centimeters"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={calculateBmi}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Calculate BMI
          </Button>
        </div>

        {bmi !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{bmi}</div>
              <div className={`text-xl font-semibold ${getCategoryColor()}`}>
                {category}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-4">
              <div className="text-center p-2 rounded bg-blue-100 dark:bg-blue-900/30">
                <div className="text-sm text-blue-600 dark:text-blue-300">Underweight</div>
                <div className="text-xs text-blue-500 dark:text-blue-400">&lt; 18.5</div>
              </div>
              <div className="text-center p-2 rounded bg-green-100 dark:bg-green-900/30">
                <div className="text-sm text-green-600 dark:text-green-300">Normal</div>
                <div className="text-xs text-green-500 dark:text-green-400">18.5 - 24.9</div>
              </div>
              <div className="text-center p-2 rounded bg-yellow-100 dark:bg-yellow-900/30">
                <div className="text-sm text-yellow-600 dark:text-yellow-300">Overweight</div>
                <div className="text-xs text-yellow-500 dark:text-yellow-400">25 - 29.9</div>
              </div>
              <div className="text-center p-2 rounded bg-red-100 dark:bg-red-900/30">
                <div className="text-sm text-red-600 dark:text-red-300">Obese</div>
                <div className="text-xs text-red-500 dark:text-red-400">&gt; 30</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Formula Used:</h2>
          <p className="text-gray-700 dark:text-gray-300">
            BMI = weight (kg) / (height (m))²
          </p>
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Enter your weight in kilograms (kg) in the "Weight" field.</li>
          <li>Enter your height in centimeters (cm) in the "Height" field.</li>
          <li>Click the "Calculate BMI" button.</li>
          <li>Your BMI value and category will be displayed, along with a reference chart.</li>
        </ul>
      </div>
    </div>
  );
};

export default BmiCalculator;