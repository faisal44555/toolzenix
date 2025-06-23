import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState(null);
  const [amount, setAmount] = useState(null);
  const { toast } = useToast();

  const calculateInterest = () => {
    if (!principal || !rate || !time) {
      toast({
        title: "Missing values",
        description: "Please enter all required values.",
        variant: "destructive"
      });
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (p <= 0 || r <= 0 || t <= 0) {
      toast({
        title: "Invalid values",
        description: "All values must be greater than zero.",
        variant: "destructive"
      });
      return;
    }

    const calculatedInterest = (p * r * t) / 100;
    const totalAmount = p + calculatedInterest;

    setInterest(calculatedInterest.toFixed(2));
    setAmount(totalAmount.toFixed(2));

    toast({
      title: "Calculation complete!",
      description: `Simple Interest: ${calculatedInterest.toFixed(2)}`
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Simple Interest Calculator - Calculate Interest Easily | Toolzenix</title>
        <meta name="description" content="Calculate simple interest with our free online calculator. Easy to use and instant results." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Coins className="w-10 h-10 mr-3 text-pink-500" /> Simple Interest Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate simple interest and total amount easily
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
            <Label htmlFor="principal">Principal Amount</Label>
            <Input
              id="principal"
              type="number"
              placeholder="Enter principal amount"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="rate">Interest Rate (% per year)</Label>
            <Input
              id="rate"
              type="number"
              placeholder="Enter interest rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="time">Time (in years)</Label>
            <Input
              id="time"
              type="number"
              placeholder="Enter time period"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={calculateInterest}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
          >
            Calculate
          </Button>
        </div>

        {interest !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div>
              <Label>Simple Interest</Label>
              <Input
                type="text"
                value={interest}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <div>
              <Label>Total Amount</Label>
              <Input
                type="text"
                value={amount}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </motion.div>
        )}

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Formula Used:</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Simple Interest = (Principal × Rate × Time) / 100
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Total Amount = Principal + Simple Interest
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleInterestCalculator;