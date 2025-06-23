import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PiggyBank, BadgeIndianRupee, Percent, CalendarClock, TrendingUp } from 'lucide-react'; // Assuming Rupee for SIP context

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [expectedReturnRate, setExpectedReturnRate] = useState(''); // Annual
  const [investmentPeriod, setInvestmentPeriod] = useState(''); // Years
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateSip = () => {
    const P = parseFloat(monthlyInvestment);
    const annual_r_percent = parseFloat(expectedReturnRate);
    const T_years = parseFloat(investmentPeriod);

    if (isNaN(P) || P <= 0 || isNaN(annual_r_percent) || annual_r_percent < 0 || isNaN(T_years) || T_years <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter valid positive numbers for all fields. Return rate can be zero.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    const monthly_r = annual_r_percent / 12 / 100;
    const N_months = T_years * 12;

    // M = P * (((1 + i)^n - 1) / i) * (1 + i)  -- This formula is for SIP at start of month
    // Using formula for SIP at end of month: M = P * [((1 + i)^n - 1) / i]
    let futureValue;
    if (monthly_r === 0) { // If rate is 0, it's just P * N
        futureValue = P * N_months;
    } else {
        futureValue = P * ( (Math.pow(1 + monthly_r, N_months) - 1) / monthly_r );
    }
    
    const totalInvested = P * N_months;
    const estimatedReturns = futureValue - totalInvested;

    setResult({
      investedAmount: totalInvested.toFixed(2),
      estimatedReturns: estimatedReturns.toFixed(2),
      totalValue: futureValue.toFixed(2),
    });
    toast({ title: 'SIP Calculated', description: `Estimated total value is $${futureValue.toFixed(2)}` });
  };

  return (
    <>
      <Helmet>
        <title>SIP Calculator - Mutual Fund Investment Returns | Toolzenix</title>
        <meta name="description" content="Estimate the future value of your Systematic Investment Plan (SIP) in mutual funds. Plan your investments and see potential returns." />
        <link rel="canonical" href="https://toolzenix.com/sip-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <PiggyBank className="w-16 h-16 text-pink-500 dark:text-pink-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            SIP Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimate the returns on your Systematic Investment Plan (SIP).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="monthlyInvestment-sip" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <BadgeIndianRupee className="w-4 h-4 mr-2 text-pink-500" /> Monthly Investment Amount
            </Label>
            <Input
              id="monthlyInvestment-sip"
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="e.g., 5000"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="expectedReturnRate-sip" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <Percent className="w-4 h-4 mr-2 text-pink-500" /> Expected Annual Return Rate (%)
            </Label>
            <Input
              id="expectedReturnRate-sip"
              type="number"
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(e.target.value)}
              placeholder="e.g., 12"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="investmentPeriod-sip" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <CalendarClock className="w-4 h-4 mr-2 text-pink-500" /> Investment Period (Years)
            </Label>
            <Input
              id="investmentPeriod-sip"
              type="number"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
              placeholder="e.g., 10"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <Button onClick={calculateSip} className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white py-3 text-lg">
            Calculate SIP Returns
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-white flex items-center justify-center">
                <TrendingUp className="w-7 h-7 mr-2 text-pink-500" /> Estimated Returns
              </h3>
              <div className="bg-pink-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount Invested</p>
                <p className="text-xl font-semibold text-pink-600 dark:text-pink-300">${result.investedAmount}</p>
              </div>
              <div className="bg-pink-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Wealth Gained</p>
                <p className="text-xl font-semibold text-pink-600 dark:text-pink-300">${result.estimatedReturns}</p>
              </div>
              <div className="bg-pink-100 dark:bg-pink-800/60 p-4 rounded-lg">
                <p className="text-lg font-medium text-pink-700 dark:text-pink-200">
                  Total Estimated Future Value: <span className="font-bold text-2xl">${result.totalValue}</span>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default SipCalculator;