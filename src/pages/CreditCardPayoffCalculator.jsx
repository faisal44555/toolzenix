import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Percent, CalendarDays, DollarSign, BarChart3, Calculator, CheckCircle2, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreditCardPayoffCalculator = () => {
  const [balance, setBalance] = useState('');
  const [apr, setApr] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [payoffTime, setPayoffTime] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPaid, setTotalPaid] = useState(null);
  const { toast } = useToast();

  const calculatePayoff = () => {
    const numBalance = parseFloat(balance);
    const numApr = parseFloat(apr) / 100; // Convert APR percentage to decimal
    const numMonthlyPayment = parseFloat(monthlyPayment);

    if (isNaN(numBalance) || numBalance <= 0 ||
        isNaN(numApr) || numApr < 0 ||
        isNaN(numMonthlyPayment) || numMonthlyPayment <= 0) {
      toast({ title: 'Invalid Input', description: 'Please enter valid positive numbers for all fields.', variant: 'destructive', action: <AlertTriangle/> });
      setPayoffTime(null); setTotalInterest(null); setTotalPaid(null);
      return;
    }

    if (numMonthlyPayment <= (numBalance * (numApr / 12))) {
      toast({ title: 'Payment Too Low', description: 'Monthly payment must be greater than the monthly interest to pay off the balance.', variant: 'destructive', action: <AlertTriangle/>, duration: 7000 });
      setPayoffTime(null); setTotalInterest(null); setTotalPaid(null);
      return;
    }
    
    const monthlyInterestRate = numApr / 12;
    // Using the formula: N = -log(1 - (r * P) / M) / log(1 + r)
    // N = number of payments, r = monthly interest rate, P = principal loan amount, M = monthly payment
    const numberOfMonths = -Math.log(1 - (monthlyInterestRate * numBalance) / numMonthlyPayment) / Math.log(1 + monthlyInterestRate);

    if (!isFinite(numberOfMonths) || numberOfMonths <= 0) {
       toast({ title: 'Calculation Error', description: 'Could not calculate payoff time. Check inputs.', variant: 'destructive', action: <AlertTriangle/> });
       setPayoffTime(null); setTotalInterest(null); setTotalPaid(null);
       return;
    }

    const years = Math.floor(numberOfMonths / 12);
    const months = Math.ceil(numberOfMonths % 12);
    
    const calculatedTotalPaid = numMonthlyPayment * numberOfMonths;
    const calculatedTotalInterest = calculatedTotalPaid - numBalance;

    setPayoffTime({ years, months });
    setTotalInterest(calculatedTotalInterest.toFixed(2));
    setTotalPaid(calculatedTotalPaid.toFixed(2));

    toast({ title: 'Calculation Successful!', action: <CheckCircle2 className="text-green-500"/> });
  };

  return (
    <>
      <Helmet>
        <title>Credit Card Payoff Calculator - Strategy & Timeline | Toolzenix</title>
        <meta name="description" content="Calculate how long it will take to pay off your credit card debt and the total interest paid. Input balance, APR, and monthly payment to get your payoff strategy." />
        <link rel="canonical" href="https://toolzenix.com/credit-card-payoff-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <CreditCard className="w-16 h-16 text-teal-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Credit Card Payoff Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Plan your debt-free journey. See how long it takes to pay off your credit card.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="balance" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <DollarSign className="w-4 h-4 mr-1 text-teal-500"/> Current Balance ($)
              </Label>
              <Input id="balance" type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="e.g., 5000" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label htmlFor="apr" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Percent className="w-4 h-4 mr-1 text-teal-500"/> Annual Percentage Rate (APR %)</Label>
              <Input id="apr" type="number" value={apr} onChange={e => setApr(e.target.value)} placeholder="e.g., 18.9" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          </div>
           <div className="mb-8">
              <Label htmlFor="monthlyPayment" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <DollarSign className="w-4 h-4 mr-1 text-teal-500"/> Monthly Payment ($)
              </Label>
              <Input id="monthlyPayment" type="number" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} placeholder="e.g., 200" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          
          <Button onClick={calculatePayoff} className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-3">
            <Calculator className="w-5 h-5 mr-2" /> Calculate Payoff
          </Button>

          {payoffTime && totalInterest !== null && totalPaid !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Payoff Summary</h2>
              <div className="mb-4">
                <BarChart3 className="w-10 h-10 text-teal-500 mx-auto mb-2" />
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                  It will take approximately:
                </p>
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                  {payoffTime.years > 0 && `${payoffTime.years} Year${payoffTime.years > 1 ? 's' : ''} `}
                  {payoffTime.months > 0 && `${payoffTime.months} Month${payoffTime.months > 1 ? 's' : ''}`}
                  {payoffTime.years === 0 && payoffTime.months === 0 && "Less than a month"}
                </p>
                <p className="text-gray-600 dark:text-gray-400">to pay off your credit card.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-teal-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Total Interest Paid:</p>
                  <p className="text-lg font-bold text-teal-600 dark:text-teal-400">${totalInterest}</p>
                </div>
                <div className="p-3 bg-teal-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Total Amount Paid:</p>
                  <p className="text-lg font-bold text-teal-600 dark:text-teal-400">${totalPaid}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Take Control of Your Credit Card Debt</h2>
          <p>
            Understanding how long it will take to pay off your credit card and how much interest you'll accrue is the first step towards financial freedom. This calculator helps you visualize your payoff timeline based on your current balance, Annual Percentage Rate (APR), and your planned monthly payment.
          </p>
          <h3 className="text-xl font-semibold">How It Works:</h3>
          <ol className="list-disc list-inside space-y-1">
            <li><strong>Enter Balance:</strong> Input your current credit card balance.</li>
            <li><strong>Enter APR:</strong> Provide the Annual Percentage Rate for your card.</li>
            <li><strong>Enter Monthly Payment:</strong> Specify how much you plan to pay each month.</li>
            <li><strong>Calculate:</strong> The tool estimates the payoff time in years and months, total interest paid, and total amount paid.</li>
          </ol>
          <p>
            By experimenting with different monthly payment amounts, you can see how increasing your payment can significantly reduce both your payoff time and the total interest paid. For more financial planning tools, explore our <Link to="/finance-tools" className="text-teal-600 dark:text-teal-400 hover:underline">Finance Tools</Link> section, such as the <Link to="/compound-interest-calculator" className="text-teal-600 dark:text-teal-400 hover:underline">Compound Interest Calculator</Link>.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default CreditCardPayoffCalculator;