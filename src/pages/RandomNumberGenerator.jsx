import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, Dice5, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [randomNumber, setRandomNumber] = useState(null);
  const { toast } = useToast();

  const generateRandomNumber = () => {
    const minVal = parseInt(min, 10);
    const maxVal = parseInt(max, 10);

    if (isNaN(minVal) || isNaN(maxVal)) {
      toast({ title: 'Invalid Input', description: 'Please enter valid numbers for min and max.', variant: 'destructive' });
      setRandomNumber(null);
      return;
    }

    if (minVal > maxVal) {
      toast({ title: 'Invalid Range', description: 'Min value cannot be greater than max value.', variant: 'destructive' });
      setRandomNumber(null);
      return;
    }

    const result = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    setRandomNumber(result);
    toast({ title: 'Number Generated!', description: `Random number: ${result}`, action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = () => {
    if (randomNumber === null) {
      toast({ title: 'Nothing to Copy', description: 'No number generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(randomNumber.toString())
      .then(() => toast({ title: 'Copied!', description: 'Random number copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Random Number Generator (Min/Max Range) | Toolzenix</title>
        <meta name="description" content="Generate random numbers within a custom range (min and max). Fast, simple, and client-side random number generation for any purpose." />
        <link rel="canonical" href="https://toolzenix.com/random-number-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Dice5 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Random Number Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Generate random numbers within your specified range.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="min-value" className="text-sm font-medium text-gray-700 dark:text-gray-300">Min Value</Label>
              <Input
                id="min-value"
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="max-value" className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Value</Label>
              <Input
                id="max-value"
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          <Button onClick={generateRandomNumber} className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Number
          </Button>

          {randomNumber !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-6"
            >
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Random Number:</Label>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 my-3 p-4 bg-blue-50 dark:bg-gray-700/50 rounded-lg">
                {randomNumber}
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="w-4 h-4 mr-2" /> Copy Number
              </Button>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-md mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Effortless Random Number Generation</h2>
          <p>
            Our Random Number Generator provides a quick and easy way to produce random integers within a specified range. Whether you need a number for a game, a lottery, a statistical sample, or any other purpose, this tool is here to help.
          </p>
          <h3 className="text-xl font-semibold">How It Works:</h3>
          <ol className="list-disc list-inside space-y-1">
            <li><strong>Set Range:</strong> Enter the minimum and maximum values for your desired number range.</li>
            <li><strong>Generate:</strong> Click the "Generate Number" button.</li>
            <li><strong>Result:</strong> A random integer within your specified inclusive range will be displayed.</li>
            <li><strong>Copy (Optional):</strong> Use the copy button to quickly get the number for use elsewhere.</li>
          </ol>
          <p>
            The tool utilizes JavaScript's <code>Math.random()</code> function, which generates a pseudo-random floating-point number. This is then scaled and rounded to fit your defined range. For other random generation needs, try our <Link to="/random-pin-generator" className="text-blue-600 dark:text-blue-400 hover:underline">Random PIN Generator</Link> or the <Link to="/password-generator" className="text-blue-600 dark:text-blue-400 hover:underline">Password Generator</Link>.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default RandomNumberGenerator;