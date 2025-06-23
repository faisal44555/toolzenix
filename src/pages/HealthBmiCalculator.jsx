import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const HealthBmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unitSystem, setUnitSystem] = useState("metric"); // 'metric' or 'imperial'
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const getBmiCategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue >= 18.5 && bmiValue <= 24.9) return "Normal weight";
    if (bmiValue >= 25 && bmiValue <= 29.9) return "Overweight";
    return "Obese";
  };

  const calculateBmi = () => {
    if (!weight || !height) {
      toast({
        title: "Missing values",
        description: "Please enter both weight and height.",
        variant: "destructive",
        action: <AlertCircle className="text-red-500" />
      });
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum <= 0 || heightNum <= 0) {
      toast({
        title: "Invalid values",
        description: "Weight and height must be greater than zero.",
        variant: "destructive",
        action: <AlertCircle className="text-red-500" />
      });
      return;
    }

    let calculatedBmi;
    if (unitSystem === "metric") {
      calculatedBmi = weightNum / ((heightNum / 100) * (heightNum / 100));
    } else { // Imperial
      calculatedBmi = (weightNum / (heightNum * heightNum)) * 703;
    }
    
    const bmiCategory = getBmiCategory(calculatedBmi);
    
    setBmi(calculatedBmi.toFixed(1));
    setCategory(bmiCategory);

    toast({
      title: "BMI Calculated!",
      description: `Your BMI is ${calculatedBmi.toFixed(1)} (${bmiCategory})`,
    });
  };

  const getCategoryStyle = () => {
    switch (category) {
      case "Underweight": return { color: "text-blue-500 dark:text-blue-400", icon: <TrendingDown className="inline mr-1" /> };
      case "Normal weight": return { color: "text-green-500 dark:text-green-400", icon: <Activity className="inline mr-1" /> };
      case "Overweight": return { color: "text-yellow-500 dark:text-yellow-400", icon: <TrendingUp className="inline mr-1" /> };
      case "Obese": return { color: "text-red-500 dark:text-red-400", icon: <TrendingUp className="inline mr-1" /> };
      default: return { color: "text-gray-700 dark:text-gray-300", icon: null };
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Health BMI Calculator - Body Mass Index | Toolzenix</title>
        <meta name="description" content="Calculate your Body Mass Index (BMI) using metric or imperial units. Understand your health category with our free online BMI calculator." />
        <link rel="canonical" href="https://toolzenix.com/health-bmi-calculator" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <Activity className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          Body Mass Index (BMI) Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Assess your body mass index quickly and easily.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
      >
        <div>
          <Label htmlFor="unit-system" className="text-gray-700 dark:text-gray-300">Unit System</Label>
          <Select value={unitSystem} onValueChange={setUnitSystem}>
            <SelectTrigger id="unit-system" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
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
            <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Label>
            <Input
              id="weight"
              type="number"
              placeholder={`Enter weight in ${unitSystem === 'metric' ? 'kilograms' : 'pounds'}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="height" className="text-gray-700 dark:text-gray-300">Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</Label>
            <Input
              id="height"
              type="number"
              placeholder={`Enter height in ${unitSystem === 'metric' ? 'centimeters' : 'inches'}`}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        <Button 
          onClick={calculateBmi}
          className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white py-3 text-lg font-semibold"
        >
          Calculate BMI
        </Button>

        {bmi !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Your BMI is</p>
              <div className={`text-5xl font-bold my-2 ${getCategoryStyle().color}`}>{bmi}</div>
              <div className={`text-xl font-semibold ${getCategoryStyle().color}`}>
                {getCategoryStyle().icon} {category}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 text-xs">
              <div className="text-center p-2 rounded bg-blue-100 dark:bg-blue-900/30">
                <div className="font-semibold text-blue-700 dark:text-blue-300">Underweight</div>
                <div className="text-blue-600 dark:text-blue-400">&lt; 18.5</div>
              </div>
              <div className="text-center p-2 rounded bg-green-100 dark:bg-green-900/30">
                <div className="font-semibold text-green-700 dark:text-green-300">Normal</div>
                <div className="text-green-600 dark:text-green-400">18.5 - 24.9</div>
              </div>
              <div className="text-center p-2 rounded bg-yellow-100 dark:bg-yellow-900/30">
                <div className="font-semibold text-yellow-700 dark:text-yellow-300">Overweight</div>
                <div className="text-yellow-600 dark:text-yellow-400">25 - 29.9</div>
              </div>
              <div className="text-center p-2 rounded bg-red-100 dark:bg-red-900/30">
                <div className="font-semibold text-red-700 dark:text-red-300">Obese</div>
                <div className="text-red-600 dark:text-red-400">&ge; 30</div>
              </div>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
              BMI categories are for adults aged 20 years and older. Consult a healthcare provider for personalized advice.
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
        <h2 className="text-2xl font-semibold">Understanding Your BMI</h2>
        <p>
          Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. It is used as a general indicator of whether a person has a healthy body weight for their height.
        </p>
        <h3 className="text-xl font-semibold">How to Use:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Select your preferred unit system (Metric or Imperial).</li>
          <li>Enter your weight and height in the respective fields.</li>
          <li>Click "Calculate BMI" to see your result and category.</li>
        </ul>
        <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/> BMI is a screening tool and does not diagnose body fatness or health. A healthcare provider can assess your health status and risks.</p>
      </motion.div>
    </div>
  );
};

export default HealthBmiCalculator;