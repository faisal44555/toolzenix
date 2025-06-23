import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Coins, ArrowRightLeft, BadgeDollarSign } from 'lucide-react';

// Static rates relative to USD. Add more as needed.
// In a real app, this would come from an API or be updated regularly.
const staticExchangeRates = {
  USD: { name: "US Dollar", rate: 1, symbol: "$" },
  EUR: { name: "Euro", rate: 0.92, symbol: "€" }, // 1 USD = 0.92 EUR (example)
  GBP: { name: "British Pound", rate: 0.79, symbol: "£" }, // 1 USD = 0.79 GBP
  INR: { name: "Indian Rupee", rate: 83.30, symbol: "₹" }, // 1 USD = 83.30 INR
  JPY: { name: "Japanese Yen", rate: 150.00, symbol: "¥" }, // 1 USD = 150 JPY
  AUD: { name: "Australian Dollar", rate: 1.52, symbol: "A$" }, // 1 USD = 1.52 AUD
  CAD: { name: "Canadian Dollar", rate: 1.36, symbol: "C$" }, // 1 USD = 1.36 CAD
  CHF: { name: "Swiss Franc", rate: 0.88, symbol: "CHF" }, // 1 USD = 0.88 CHF
  CNY: { name: "Chinese Yuan", rate: 7.19, symbol: "¥" }, // 1 USD = 7.19 CNY
  NZD: { name: "New Zealand Dollar", rate: 1.64, symbol: "NZ$" }, // 1 USD = 1.64 NZD
};
const currencyOptions = Object.keys(staticExchangeRates).map(code => ({
    value: code,
    label: `${code} - ${staticExchangeRates[code].name}`
}));


const StaticCurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const { toast } = useToast();

  const convertCurrency = () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || inputAmount < 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number for the amount.',
        variant: 'destructive',
      });
      setConvertedAmount('');
      return;
    }
    if (!fromCurrency || !toCurrency) {
        toast({ title: 'Select Currencies', description: 'Please select both from and to currencies.', variant: 'destructive'});
        return;
    }

    const rateFromUSD_From = staticExchangeRates[fromCurrency].rate;
    const rateFromUSD_To = staticExchangeRates[toCurrency].rate;

    // Convert 'fromCurrency' amount to USD first, then USD to 'toCurrency' amount
    const amountInUSD = inputAmount / rateFromUSD_From;
    const finalAmount = amountInUSD * rateFromUSD_To;

    setConvertedAmount(finalAmount.toFixed(2));
  };
  
  useEffect(() => {
    if(amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);
  
  const swapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    // If we have a converted amount, make it the new input amount for consistency
    if (convertedAmount) {
      setAmount(convertedAmount); 
    }
  };


  return (
    <>
      <Helmet>
        <title>Static Currency Converter | Toolzenix</title>
        <meta name="description" content="Convert amounts between major world currencies using static exchange rates. Ideal for quick estimations (rates are not live)." />
        <link rel="canonical" href="https://toolzenix.com/static-currency-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Coins className="w-16 h-16 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Static Currency Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert between currencies using pre-defined static rates.
          </p>
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
            Note: Exchange rates are illustrative and not live market data. Last updated: {new Date().toLocaleDateString()}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="amount-scc" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <BadgeDollarSign className="w-4 h-4 mr-2 text-orange-500" /> Amount to Convert
            </Label>
            <Input
              id="amount-scc"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 100"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-2/5">
              <Label htmlFor="fromCurrency-scc" className="text-gray-700 dark:text-gray-300">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="fromCurrency-scc" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="From Currency" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white max-h-60">
                  {currencyOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-0 sm:pt-6">
                <Button variant="ghost" size="icon" onClick={swapCurrencies} className="text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-800/50 p-2 rounded-full">
                    <ArrowRightLeft size={20} />
                </Button>
            </div>

            <div className="w-full sm:w-2/5">
              <Label htmlFor="toCurrency-scc" className="text-gray-700 dark:text-gray-300">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="toCurrency-scc" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="To Currency" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white max-h-60">
                  {currencyOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Removed Convert button as it converts on change */}
          {/* <Button onClick={convertCurrency} className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white py-3 text-lg">
            Convert
          </Button> */}

          {convertedAmount && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <Label className="text-gray-700 dark:text-gray-300">Converted Amount</Label>
              <div className="mt-1 text-3xl font-bold p-4 bg-orange-50 dark:bg-gray-700/50 rounded-lg text-orange-600 dark:text-orange-300 text-center">
                {staticExchangeRates[toCurrency]?.symbol}{convertedAmount}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default StaticCurrencyConverter;