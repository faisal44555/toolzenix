import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { TrendingUp, BadgeDollarSign, Percent, CalendarClock, RefreshCcw } from 'lucide-react';

const FinanceCompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [timeUnit, setTimeUnit] = useState('years'); // years, months
  const [compoundFrequency, setCompoundFrequency] = useState('12'); // Annually=1, Semi-annually=2, Quarterly=4, Monthly=12
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const R_annual_percent = parseFloat(annualRate);
    const T_input = parseFloat(timePeriod);

    if (isNaN(P) || P <= 0 || isNaN(R_annual_percent) || R_annual_percent < 0 || isNaN(T_input) || T_input <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter valid positive numbers. Rate can be zero.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    const R_decimal = R_annual_percent / 100;
    const N_compounding_per_year = parseFloat(compoundFrequency);
    
    let T_years;
    if (timeUnit === 'months') {
      T_years = T_input / 12;
    } else { // years
      T_years = T_input;
    }

    const totalAmount = P * Math.pow((1 + R_decimal / N_compounding_per_year), (N_compounding_per_year * T_years));
    const totalInterest = totalAmount - P;

    setResult({
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
    toast({ title: 'Calculation Complete', description: `Total amount is $${totalAmount.toFixed(2)}` });
  };

  return (
    <>
      <Helmet>
        <title>Compound Interest Calculator (Finance) | Toolzenix</title>
        <meta name="description" content="Calculate compound interest for investments or savings. See how your money grows with different compounding frequencies (annually, monthly, etc.)." />
        <link rel="canonical" href="https://toolzenix.com/finance-compound-interest-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <TrendingUp className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Compound Interest Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            See how your investments grow with the power of compounding.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="principal-fci" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <BadgeDollarSign className="w-4 h-4 mr-2 text-purple-500" /> Principal Amount ($)
            </Label>
            <Input
              id="principal-fci"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 10000"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="annualRate-fci" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <Percent className="w-4 h-4 mr-2 text-purple-500" /> Annual Interest Rate (%)
            </Label>
            <Input
              id="annualRate-fci"
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="e.g., 6.5"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timePeriod-fci" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
                <CalendarClock className="w-4 h-4 mr-2 text-purple-500" /> Time Period
              </Label>
              <Input
                id="timePeriod-fci"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="e.g., 5"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="timeUnit-fci" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
                 Unit
              </Label>
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger id="timeUnit-fci" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="compoundFrequency-fci" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <RefreshCcw className="w-4 h-4 mr-2 text-purple-500" /> Compounding Frequency
            </Label>
            <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
              <SelectTrigger id="compoundFrequency-fci" className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select Frequency" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="2">Semi-annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateCompoundInterest} className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white py-3 text-lg">
            Calculate Compound Interest
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3"
            >
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Investment Growth</h3>
              <div className="bg-purple-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-md text-gray-700 dark:text-gray-300">Total Amount (Principal + Interest):</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${result.totalAmount}</p>
              </div>
              <div className="bg-purple-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-md text-gray-700 dark:text-gray-300">Total Compound Interest Earned:</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${result.totalInterest}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default FinanceCompoundInterestCalculator;