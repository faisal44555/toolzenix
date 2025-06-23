import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TableProperties as Function, Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState([""]);
  const [mean, setMean] = useState("");
  const [median, setMedian] = useState("");
  const [mode, setMode] = useState("");
  const { toast } = useToast();

  const addNumber = () => {
    setNumbers([...numbers, ""]);
  };

  const removeNumber = (index) => {
    const newNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(newNumbers);
    calculateResults(newNumbers);
  };

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
    calculateResults(newNumbers);
  };

  const calculateResults = (nums) => {
    const validNumbers = nums
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (validNumbers.length === 0) {
      setMean("");
      setMedian("");
      setMode("");
      return;
    }

    const sum = validNumbers.reduce((a, b) => a + b, 0);
    const calculatedMean = sum / validNumbers.length;
    setMean(calculatedMean.toFixed(2));

    const sorted = [...validNumbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const calculatedMedian = sorted.length % 2 === 0
      ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)
      : sorted[mid].toFixed(2);
    setMedian(calculatedMedian);

    const frequency = {};
    let maxFreq = 0;
    let calculatedMode = [];
    
    validNumbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
        calculatedMode = [num];
      } else if (frequency[num] === maxFreq) {
        if (!calculatedMode.includes(num)) { // Ensure unique modes
            calculatedMode.push(num);
        }
      }
    });
    
    // If all numbers appear once, or if multiple numbers have the same highest frequency
    // and that frequency is not greater than 1 (meaning all unique or no clear mode)
    if (maxFreq === 1 && validNumbers.length > 1 && new Set(validNumbers).size === validNumbers.length) {
        setMode("No mode");
    } else if (calculatedMode.length === validNumbers.length && validNumbers.length > 1) { // All numbers are different and appear once
        setMode("No mode");
    }
    else {
        setMode(calculatedMode.map(n => n.toFixed(2)).join(", "));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Average Calculator - Calculate Mean, Median & Mode | Toolzenix</title>
        <meta name="description" content="Calculate mean, median, and mode with our free online average calculator. Easy to use and instant results." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Function className="w-10 h-10 mr-3 text-green-500" /> Average Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate mean, median, and mode instantly
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
            <div key={index} className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor={`number-${index}`} className="sr-only">Number {index + 1}</Label>
                <Input
                  id={`number-${index}`}
                  type="number"
                  value={number}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                  placeholder={`Number ${index + 1}`}
                  className="w-full"
                />
              </div>
              {numbers.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeNumber(index)}
                  className="flex-shrink-0"
                  aria-label="Remove number"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={addNumber}
          variant="outline"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Number
        </Button>

        <div className="grid gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            <Label>Mean (Average)</Label>
            <Input
              type="text"
              value={mean}
              readOnly
              className="bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div>
            <Label>Median (Middle Value)</Label>
            <Input
              type="text"
              value={median}
              readOnly
              className="bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div>
            <Label>Mode (Most Frequent)</Label>
            <Input
              type="text"
              value={mode}
              readOnly
              className="bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center text-gray-600 dark:text-gray-400"
      >
        <p>Enter numbers to calculate mean, median, and mode automatically.</p>
      </motion.div>

      <div className="mt-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Enter numbers into the input fields.</li>
          <li>Click "Add Number" to add more fields if needed.</li>
          <li>Click the trash icon to remove a number field.</li>
          <li>Mean, Median, and Mode will be calculated and displayed automatically.</li>
        </ul>
      </div>
    </div>
  );
};

export default AverageCalculator;