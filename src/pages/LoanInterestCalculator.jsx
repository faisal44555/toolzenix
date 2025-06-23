import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Percent, BadgeDollarSign, CalendarClock } from 'lucide-react';

const LoanInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [loanTenureYears, setLoanTenureYears] = useState('');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateLoanDetails = () => {
    const P = parseFloat(principal);
    const R_annual = parseFloat(annualInterestRate);
    const T_years = parseFloat(loanTenureYears);

    if (isNaN(P) || P <= 0 || isNaN(R_annual) || R_annual < 0 || isNaN(T_years) || T_years <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter valid positive numbers for all fields. Interest rate can be zero.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    const R_monthly = R_annual / 12 / 100;
    const N_months = T_years * 12;
    
    let monthlyEmi;
    if (R_monthly === 0) { // For 0% interest rate
        monthlyEmi = P / N_months;
    } else {
        monthlyEmi = (P * R_monthly * Math.pow(1 + R_monthly, N_months)) / (Math.pow(1 + R_monthly, N_months) - 1);
    }
    
    const totalPayment = monthlyEmi * N_months;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyEmi: monthlyEmi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    });
    toast({ title: 'Calculation Complete', description: `Total interest payable is $${totalInterest.toFixed(2)}` });
  };

  return (
    <>
      <Helmet>
        <title>Loan Interest Calculator - Total Interest Payable | Toolzenix</title>
        <meta name="description" content="Calculate the total interest you'll pay on a loan. Understand the cost of borrowing for personal loans, mortgages, or car loans." />
        <link rel="canonical" href="https://toolzenix.com/loan-interest-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Percent className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Loan Interest Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimate the total interest you'll pay over the life of a loan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="principal-li" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <BadgeDollarSign className="w-4 h-4 mr-2 text-blue-500" /> Loan Amount (Principal)
            </Label>
            <Input
              id="principal-li"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 50000"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="annualInterestRate-li" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <Percent className="w-4 h-4 mr-2 text-blue-500" /> Annual Interest Rate (%)
            </Label>
            <Input
              id="annualInterestRate-li"
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              placeholder="e.g., 7.5"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="loanTenureYears-li" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <CalendarClock className="w-4 h-4 mr-2 text-blue-500" /> Loan Tenure (Years)
            </Label>
            <Input
              id="loanTenureYears-li"
              type="number"
              value={loanTenureYears}
              onChange={(e) => setLoanTenureYears(e.target.value)}
              placeholder="e.g., 3"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <Button onClick={calculateLoanDetails} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 text-lg">
            Calculate Interest
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Loan Summary</h3>
              <div className="bg-blue-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-lg font-medium text-blue-700 dark:text-blue-300">
                  Total Interest Payable: <span className="font-bold text-2xl">${result.totalInterest}</span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</p>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-300">${result.monthlyEmi}</p>
                </div>
                <div className="bg-blue-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Payment (Principal + Interest)</p>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-300">${result.totalPayment}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default LoanInterestCalculator;