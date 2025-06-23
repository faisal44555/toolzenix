import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Banknote, BadgeDollarSign, Percent, CalendarDays } from 'lucide-react';

const FinanceSimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years'); // years, months, days
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateSimpleInterest = () => {
    const P = parseFloat(principal);
    const R_annual = parseFloat(rate);
    let T_input = parseFloat(time);

    if (isNaN(P) || P <= 0 || isNaN(R_annual) || R_annual < 0 || isNaN(T_input) || T_input <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter valid positive numbers for all fields. Rate can be zero.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    let T_years;
    if (timeUnit === 'months') {
      T_years = T_input / 12;
    } else if (timeUnit === 'days') {
      T_years = T_input / 365; // Approximation
    } else {
      T_years = T_input;
    }

    const simpleInterest = (P * R_annual * T_years) / 100;
    const totalAmount = P + simpleInterest;

    setResult({
      interest: simpleInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
    toast({ title: 'Calculation Complete', description: `Simple interest is $${simpleInterest.toFixed(2)}` });
  };

  return (
    <>
      <Helmet>
        <title>Simple Interest Calculator (Finance) | Toolzenix</title>
        <meta name="description" content="Calculate simple interest for loans, savings, or investments. Input principal, rate, and time (years, months, or days)." />
        <link rel="canonical" href="https://toolzenix.com/finance-simple-interest-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Banknote className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Simple Interest Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Calculate simple interest for your financial planning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="principal-fsi" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <BadgeDollarSign className="w-4 h-4 mr-2 text-yellow-500" /> Principal Amount ($)
            </Label>
            <Input
              id="principal-fsi"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 10000"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="rate-fsi" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <Percent className="w-4 h-4 mr-2 text-yellow-500" /> Annual Interest Rate (%)
            </Label>
            <Input
              id="rate-fsi"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 5"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time-fsi" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
                <CalendarDays className="w-4 h-4 mr-2 text-yellow-500" /> Time Period
              </Label>
              <Input
                id="time-fsi"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 2"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="timeUnit-fsi" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
                Unit
              </Label>
              <select
                id="timeUnit-fsi"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="w-full mt-0.5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>
          <Button onClick={calculateSimpleInterest} className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white py-3 text-lg">
            Calculate Simple Interest
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3"
            >
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Results</h3>
              <div className="bg-yellow-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-md text-gray-700 dark:text-gray-300">Simple Interest Earned/Payable:</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${result.interest}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-md text-gray-700 dark:text-gray-300">Total Amount (Principal + Interest):</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${result.totalAmount}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default FinanceSimpleInterestCalculator;