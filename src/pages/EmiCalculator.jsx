import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { TrendingUp, BadgeDollarSign, CalendarClock, Percent } from 'lucide-react';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [emiResult, setEmiResult] = useState(null);
  const { toast } = useToast();

  const calculateEmi = () => {
    const P = parseFloat(principal);
    const R_annual = parseFloat(interestRate);
    const T_years = parseFloat(tenureYears);

    if (isNaN(P) || P <= 0 || isNaN(R_annual) || R_annual < 0 || isNaN(T_years) || T_years <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter valid positive numbers for all fields. Interest rate can be 0.',
        variant: 'destructive',
      });
      setEmiResult(null);
      return;
    }

    const R_monthly = R_annual / 12 / 100;
    const N_months = T_years * 12;

    if (R_monthly === 0) { // Special case for 0% interest
        const emi = P / N_months;
        setEmiResult({
          emi: emi.toFixed(2),
          totalInterest: (0).toFixed(2),
          totalPayment: P.toFixed(2),
        });
        toast({ title: 'EMI Calculated', description: `Your EMI is ${emi.toFixed(2)}` });
        return;
    }

    const emi = (P * R_monthly * Math.pow(1 + R_monthly, N_months)) / (Math.pow(1 + R_monthly, N_months) - 1);
    const totalPayment = emi * N_months;
    const totalInterest = totalPayment - P;

    setEmiResult({
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    });
    toast({ title: 'EMI Calculated', description: `Your EMI is ${emi.toFixed(2)}` });
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator - Loan Monthly Installment | Toolzenix</title>
        <meta name="description" content="Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans with our easy-to-use online EMI calculator." />
        <link rel="canonical" href="https://toolzenix.com/emi-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <TrendingUp className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            EMI Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Calculate your Equated Monthly Installment for loans.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="principal" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <BadgeDollarSign className="w-4 h-4 mr-2 text-green-500" /> Loan Amount (Principal)
            </Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 100000"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="interestRate" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <Percent className="w-4 h-4 mr-2 text-green-500" /> Annual Interest Rate (%)
            </Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 8.5"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="tenureYears" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <CalendarClock className="w-4 h-4 mr-2 text-green-500" /> Loan Tenure (Years)
            </Label>
            <Input
              id="tenureYears"
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              placeholder="e.g., 5"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <Button onClick={calculateEmi} className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 text-lg">
            Calculate EMI
          </Button>

          {emiResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Results</h3>
              <div className="bg-green-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-lg font-medium text-green-700 dark:text-green-300">
                  Monthly EMI: <span className="font-bold text-2xl">${emiResult.emi}</span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest Payable</p>
                  <p className="text-xl font-semibold text-green-600 dark:text-green-300">${emiResult.totalInterest}</p>
                </div>
                <div className="bg-green-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Payment (Principal + Interest)</p>
                  <p className="text-xl font-semibold text-green-600 dark:text-green-300">${emiResult.totalPayment}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default EmiCalculator;