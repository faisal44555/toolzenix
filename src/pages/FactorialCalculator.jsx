import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const FactorialCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const calculateFactorial = () => {
    if (!number) {
      toast({
        title: "Missing value",
        description: "Please enter a number.",
        variant: "destructive",
      });
      return;
    }

    const num = parseInt(number);
    if (isNaN(num) || num < 0 || num > 170) {
      toast({
        title: "Invalid input",
        description: "Please enter a number between 0 and 170.",
        variant: "destructive",
      });
      return;
    }

    let factorial = 1;
    for (let i = 2; i <= num; i++) {
      factorial *= i;
    }

    setResult(factorial.toLocaleString());
    
    toast({
      title: "Calculation complete!",
      description: `Factorial of ${num} is ${factorial.toLocaleString()}`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Factorial Calculator - Calculate n! Online | Toolzenix</title>
        <meta name="description" content="Calculate factorial of any number instantly with our free online factorial calculator. Get results for numbers up to 170!" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Calculator className="w-10 h-10 mr-3 text-orange-500" /> Factorial Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate the factorial of any number
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div>
          <Label htmlFor="number">Enter Number</Label>
          <Input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter a number (0-170)"
            className="mt-1"
          />
        </div>

        <Button
          onClick={calculateFactorial}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          Calculate Factorial
        </Button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
          >
            <Label>Result</Label>
            <p className="mt-2 text-lg font-medium text-orange-700 dark:text-orange-300">
              {number}! = {result}
            </p>
          </motion.div>
        )}

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">What is Factorial?</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>The factorial of a number (n!) is the product of all positive integers less than or equal to n.</p>
            <p>For example:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>5! = 5 × 4 × 3 × 2 × 1 = 120</li>
              <li>3! = 3 × 2 × 1 = 6</li>
              <li>0! = 1 (by definition)</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FactorialCalculator;