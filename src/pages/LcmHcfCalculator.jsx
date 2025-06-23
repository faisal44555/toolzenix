import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const LcmHcfCalculator = () => {
  const [numbers, setNumbers] = useState(["", ""]);
  const [lcm, setLcm] = useState("");
  const [hcf, setHcf] = useState("");
  const { toast } = useToast();

  const calculateGCD = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const calculateLCM = (a, b) => {
    return Math.abs(a * b) / calculateGCD(a, b);
  };

  const handleCalculate = () => {
    const nums = numbers.map(n => parseInt(n));
    
    if (nums.some(isNaN) || nums.some(n => n <= 0)) {
      toast({
        title: "Invalid input",
        description: "Please enter positive numbers only.",
        variant: "destructive",
      });
      return;
    }

    const gcd = calculateGCD(nums[0], nums[1]);
    const calculatedLcm = calculateLCM(nums[0], nums[1]);

    setHcf(gcd.toString());
    setLcm(calculatedLcm.toString());

    toast({
      title: "Calculation complete!",
      description: `HCF: ${gcd}, LCM: ${calculatedLcm}`,
    });
  };

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>LCM & HCF Calculator - Find Least Common Multiple and Highest Common Factor | Toolzenix</title>
        <meta name="description" content="Calculate LCM (Least Common Multiple) and HCF (Highest Common Factor) of two numbers instantly with our free online calculator." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Calculator className="w-10 h-10 mr-3 text-blue-500" /> LCM & HCF Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate Least Common Multiple and Highest Common Factor
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div className="space-y-4">
          {numbers.map((number, index) => (
            <div key={index}>
              <Label htmlFor={`number-${index + 1}`}>Number {index + 1}</Label>
              <Input
                id={`number-${index + 1}`}
                type="number"
                value={number}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                placeholder={`Enter number ${index + 1}`}
                className="mt-1"
              />
            </div>
          ))}

          <Button
            onClick={handleCalculate}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Calculate
          </Button>
        </div>

        {(lcm || hcf) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <Label>LCM</Label>
              <p className="mt-2 text-xl font-semibold text-blue-700 dark:text-blue-300">{lcm}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <Label>HCF</Label>
              <p className="mt-2 text-xl font-semibold text-blue-700 dark:text-blue-300">{hcf}</p>
            </div>
          </motion.div>
        )}

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">What are LCM and HCF?</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>LCM (Least Common Multiple)</strong> is the smallest positive number that is divisible by both numbers.</p>
            <p><strong>HCF (Highest Common Factor)</strong> or GCD is the largest number that divides both numbers without leaving a remainder.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LcmHcfCalculator;