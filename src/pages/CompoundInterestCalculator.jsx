import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateCompoundInterest = () => {
    if (!principal || !rate || !time) {
      toast({
        title: "Missing values",
        description: "Please enter all required values.",
        variant: "destructive",
      });
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (p <= 0 || r < 0 || t <= 0 || n <=0) {
      toast({
        title: "Invalid values",
        description: "Principal, time, and frequency must be positive. Rate can be zero or positive.",
        variant: "destructive"
      });
      return;
    }

    const amount = p * Math.pow(1 + r/n, n*t);
    const interest = amount - p;

    setResult({
      amount: amount.toFixed(2),
      interest: interest.toFixed(2)
    });

    toast({
      title: "Calculation complete!",
      description: `Total amount after ${t} years: ${amount.toFixed(2)}`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Compound Interest Calculator - Calculate Investment Growth | Toolzenix</title>
        <meta name="description" content="Calculate compound interest with our free online calculator. See how your investments can grow over time with different compounding frequencies." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Coins className="w-10 h-10 mr-3 text-purple-500" /> Compound Interest Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate how your investments grow with compound interest
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
            <Label htmlFor="principal">Principal Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter initial amount"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="time">Time (Years)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time period"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="frequency">Compounding Frequency</Label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>

          <Button
            onClick={calculateCompoundInterest}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
          >
            Calculate
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-purple-700 dark:text-purple-300 font-semibold">
                  Total Amount: ${result.amount}
                </p>
                <p className="text-purple-600 dark:text-purple-400 text-sm mt-1">
                  Total Interest Earned: ${result.interest}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Enter the "Principal Amount" (initial investment).</li>
          <li>Enter the "Annual Interest Rate" as a percentage.</li>
          <li>Enter the "Time" period in years.</li>
          <li>Select the "Compounding Frequency" (e.g., Monthly, Annually).</li>
          <li>Click "Calculate" to see the total amount and interest earned.</li>
        </ul>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;