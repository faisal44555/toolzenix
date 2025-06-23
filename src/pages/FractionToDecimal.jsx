import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const FractionToDecimal = () => {
  const [numerator, setNumerator] = useState("");
  const [denominator, setDenominator] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const convertFractionToDecimal = () => {
    if (!numerator || !denominator) {
      toast({
        title: "Missing values",
        description: "Please enter both numerator and denominator.",
        variant: "destructive",
      });
      return;
    }

    if (denominator === "0") {
      toast({
        title: "Invalid input",
        description: "Denominator cannot be zero.",
        variant: "destructive",
      });
      return;
    }

    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    const decimal = (num / den).toFixed(6);
    setResult(decimal);

    toast({
      title: "Conversion complete!",
      description: `${numerator}/${denominator} = ${decimal}`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Fraction to Decimal Converter - Convert Fractions Online | Toolzenix</title>
        <meta name="description" content="Convert fractions to decimals with our free online calculator. Get precise decimal equivalents for any fraction instantly." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Divide className="w-10 h-10 mr-3 text-indigo-500" /> Fraction to Decimal
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert any fraction to its decimal equivalent
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
            <Label htmlFor="numerator">Numerator</Label>
            <Input
              id="numerator"
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              placeholder="Enter numerator"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="denominator">Denominator</Label>
            <Input
              id="denominator"
              type="number"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              placeholder="Enter denominator"
              className="mt-1"
            />
          </div>

          <Button
            onClick={convertFractionToDecimal}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Convert
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center"
            >
              <p className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                {result}
              </p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                {numerator}/{denominator} = {result}
              </p>
            </motion.div>
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">How to use:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Enter the numerator (top number)</li>
            <li>Enter the denominator (bottom number)</li>
            <li>Click Convert to see the decimal equivalent</li>
            <li>Result is rounded to 6 decimal places</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default FractionToDecimal;