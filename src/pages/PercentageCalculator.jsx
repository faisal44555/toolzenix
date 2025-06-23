import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Percent } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const calculatePercentage = () => {
    if (!value || !percentage) {
      toast({
        title: "Missing values",
        description: "Please enter both value and percentage.",
        variant: "destructive",
      });
      return;
    }

    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);
    const calculatedResult = (numValue * numPercentage) / 100;
    setResult(calculatedResult.toFixed(2));

    toast({
      title: "Calculation complete!",
      description: `${numPercentage}% of ${numValue} = ${calculatedResult.toFixed(2)}`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Percent className="w-10 h-10 mr-3 text-violet-500" /> Percentage Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate percentages quickly and easily.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="percentage">Percentage (%)</Label>
            <Input
              id="percentage"
              type="number"
              placeholder="Enter percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="text-lg"
            />
          </div>

          <Button 
            onClick={calculatePercentage}
            className="w-full bg-violet-500 hover:bg-violet-600 text-white"
          >
            Calculate
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg"
            >
              <p className="text-center text-lg font-semibold text-violet-700 dark:text-violet-300">
                Result: {result}
              </p>
              <p className="text-center text-sm text-violet-600 dark:text-violet-400 mt-1">
                {percentage}% of {value} = {result}
              </p>
            </motion.div>
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">How to use:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Enter the base value in the first field</li>
            <li>Enter the percentage you want to calculate in the second field</li>
            <li>Click Calculate to see the result</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default PercentageCalculator;