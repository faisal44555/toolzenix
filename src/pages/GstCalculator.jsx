import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Percent, BadgeIndianRupee, PlusCircle, MinusCircle } from 'lucide-react'; // Assuming Rupee icon for GST context

const GstCalculator = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [calculationType, setCalculationType] = useState('add'); // 'add' or 'remove'
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateGst = () => {
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (isNaN(baseAmount) || baseAmount <= 0 || isNaN(rate) || rate < 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid amount and GST rate. Amount must be positive, rate can be zero.',
        variant: 'destructive',
      });
      setResult(null);
      return;
    }

    let gstAmountValue, finalAmountValue;

    if (calculationType === 'add') {
      gstAmountValue = (baseAmount * rate) / 100;
      finalAmountValue = baseAmount + gstAmountValue;
    } else { // remove
      gstAmountValue = baseAmount - (baseAmount / (1 + rate / 100));
      finalAmountValue = baseAmount / (1 + rate / 100);
    }
    
    setResult({
      baseAmount: calculationType === 'add' ? baseAmount.toFixed(2) : finalAmountValue.toFixed(2),
      gstAmount: gstAmountValue.toFixed(2),
      totalAmount: calculationType === 'add' ? finalAmountValue.toFixed(2) : baseAmount.toFixed(2),
    });
    toast({ title: 'GST Calculated', description: `GST amount is ${gstAmountValue.toFixed(2)}` });
  };

  return (
    <>
      <Helmet>
        <title>GST Calculator - Add or Remove GST | Toolzenix</title>
        <meta name="description" content="Calculate Goods and Services Tax (GST) easily. Add GST to a net amount or remove GST from a gross amount with specified rates." />
        <link rel="canonical" href="https://toolzenix.com/gst-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Percent className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            GST Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Easily add or remove Goods and Services Tax (GST) from amounts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="amount-gst" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <BadgeIndianRupee className="w-4 h-4 mr-2 text-teal-500" /> Amount
            </Label>
            <Input
              id="amount-gst"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={calculationType === 'add' ? "Enter Net Amount (Excluding GST)" : "Enter Gross Amount (Including GST)"}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="gstRate-gst" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <Percent className="w-4 h-4 mr-2 text-teal-500" /> GST Rate (%)
            </Label>
            <Input
              id="gstRate-gst"
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              placeholder="e.g., 18"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <div>
            <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Calculation Type</Label>
            <RadioGroup defaultValue="add" onValueChange={setCalculationType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add-gst" className="text-teal-600 border-teal-400 focus:ring-teal-500"/>
                <Label htmlFor="add-gst" className="text-gray-700 dark:text-gray-300 flex items-center">
                    <PlusCircle size={18} className="mr-2 text-teal-500"/> Add GST
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remove" id="remove-gst" className="text-teal-600 border-teal-400 focus:ring-teal-500"/>
                <Label htmlFor="remove-gst" className="text-gray-700 dark:text-gray-300 flex items-center">
                    <MinusCircle size={18} className="mr-2 text-teal-500"/> Remove GST
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={calculateGst} className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white py-3 text-lg">
            Calculate GST
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3"
            >
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Calculation Result</h3>
              <div className="bg-teal-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Base Amount</p>
                <p className="text-xl font-semibold text-teal-600 dark:text-teal-300">${result.baseAmount}</p>
              </div>
              <div className="bg-teal-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">GST Amount</p>
                <p className="text-xl font-semibold text-teal-600 dark:text-teal-300">${result.gstAmount}</p>
              </div>
              <div className="bg-teal-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount (Incl. GST)</p>
                <p className="text-xl font-semibold text-teal-600 dark:text-teal-300">${result.totalAmount}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default GstCalculator;