import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { TrendingUp, Percent, AlertTriangle, CheckCircle2, Calculator } from 'lucide-react';

const RoiCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [gains, setGains] = useState('');
  const [roi, setRoi] = useState(null);
  const [netProfit, setNetProfit] = useState(null);
  const { toast } = useToast();

  const calculateRoi = () => {
    const investmentAmount = parseFloat(investment);
    const gainsAmount = parseFloat(gains);

    if (isNaN(investmentAmount) || isNaN(gainsAmount)) {
      toast({ title: 'Invalid Input', description: 'Please enter valid numbers for investment and gains.', variant: 'destructive', action: <AlertTriangle /> });
      setRoi(null);
      setNetProfit(null);
      return;
    }

    if (investmentAmount <= 0) {
      toast({ title: 'Invalid Investment', description: 'Investment amount must be greater than zero.', variant: 'destructive', action: <AlertTriangle /> });
      setRoi(null);
      setNetProfit(null);
      return;
    }

    const currentNetProfit = gainsAmount - investmentAmount;
    const currentRoi = (currentNetProfit / investmentAmount) * 100;

    setNetProfit(currentNetProfit.toFixed(2));
    setRoi(currentRoi.toFixed(2));
    toast({ title: 'ROI Calculated!', description: 'Results displayed below.', action: <CheckCircle2 className="text-green-500" /> });
  };

  return (
    <>
      <Helmet>
        <title>ROI Calculator | Toolzenix</title>
        <meta name="description" content="Calculate Return on Investment (ROI) for your marketing campaigns or business ventures. Enter your investment and gains to see the percentage ROI." />
        <link rel="canonical" href="https://toolzenix.com/roi-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <TrendingUp className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            ROI Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate the Return on Investment for your campaigns or ventures.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <Label htmlFor="investment-amount" className="text-md font-medium text-gray-700 dark:text-gray-300">Total Investment Amount</Label>
              <Input
                id="investment-amount"
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="e.g., 1000"
                className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="gains-amount" className="text-md font-medium text-gray-700 dark:text-gray-300">Total Gains from Investment</Label>
              <Input
                id="gains-amount"
                type="number"
                value={gains}
                onChange={(e) => setGains(e.target.value)}
                placeholder="e.g., 1500"
                className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          
          <Button onClick={calculateRoi} className="w-full mt-8 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white text-lg py-3">
            <Calculator className="w-5 h-5 mr-2" /> Calculate ROI
          </Button>

          {roi !== null && netProfit !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Return on Investment:</h2>
              <div className="mb-3">
                <p className="text-4xl font-bold text-teal-600 dark:text-teal-400">{roi}%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">ROI Percentage</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  Net Profit: ${netProfit}
                </p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">(Gains - Investment)</p>
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding ROI</h2>
          <p>
            Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment or compare the efficiency of a number of different investments.
          </p>
          <p>The formula for ROI is:</p>
          <p className="font-mono p-2 bg-gray-100 dark:bg-gray-700 rounded">ROI = ((Gains from Investment - Amount Invested) / Amount Invested) * 100%</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Total Investment Amount:</strong> The total cost of the investment.</li>
            <li><strong>Total Gains from Investment:</strong> The total revenue or value generated by the investment.</li>
          </ul>
          <p>A positive ROI means the investment has generated profit, while a negative ROI indicates a loss.</p>
        </motion.div>
      </div>
    </>
  );
};

export default RoiCalculator;