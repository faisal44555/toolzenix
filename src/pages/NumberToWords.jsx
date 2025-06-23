import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Type } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const NumberToWords = () => {
  const [number, setNumber] = useState("");
  const [words, setWords] = useState("");
  const { toast } = useToast();

  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  const convertToWords = () => {
    if (!number) {
      toast({
        title: "Missing value",
        description: "Please enter a number.",
        variant: "destructive",
      });
      return;
    }

    const num = parseInt(number);
    if (isNaN(num) || num < 0 || num > 999999999999) {
      toast({
        title: "Invalid input",
        description: "Please enter a number between 0 and 999,999,999,999",
        variant: "destructive",
      });
      return;
    }

    if (num === 0) {
      setWords("zero");
      return;
    }

    const convertGroup = (n) => {
      if (n === 0) return "";
      else if (n < 10) return units[n];
      else if (n < 20) return teens[n - 10];
      else if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + units[n % 10] : "");
      else return units[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " and " + convertGroup(n % 100) : "");
    };

    const billion = Math.floor(num / 1000000000);
    const million = Math.floor((num % 1000000000) / 1000000);
    const thousand = Math.floor((num % 1000000) / 1000);
    const remainder = num % 1000;

    let result = "";
    if (billion) result += convertGroup(billion) + " billion ";
    if (million) result += convertGroup(million) + " million ";
    if (thousand) result += convertGroup(thousand) + " thousand ";
    if (remainder) result += (result ? "and " : "") + convertGroup(remainder);

    setWords(result.trim());
    
    toast({
      title: "Conversion complete!",
      description: `${num} in words: ${result.trim()}`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Number to Words Converter - Convert Numbers to Text | Toolzenix</title>
        <meta name="description" content="Convert numbers to words with our free online converter. Get instant text representation of any number." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Type className="w-10 h-10 mr-3 text-emerald-500" /> Number to Words
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert numbers into their word representation
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
            placeholder="Enter a number (0-999,999,999,999)"
            className="mt-1"
          />
        </div>

        <Button
          onClick={convertToWords}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Convert to Words
        </Button>

        {words && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
          >
            <Label>Result</Label>
            <p className="mt-2 text-lg font-medium text-emerald-700 dark:text-emerald-300 capitalize">
              {words}
            </p>
          </motion.div>
        )}

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">How to use:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Enter any number between 0 and 999,999,999,999</li>
            <li>Click the Convert button to see the number in words</li>
            <li>The result will be displayed in proper English text format</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default NumberToWords;