import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, Pin, Settings, CheckCircle2 } from 'lucide-react';

const RandomPinGenerator = () => {
  const [pin, setPin] = useState('');
  const [length, setLength] = useState(4);
  const { toast } = useToast();

  const generatePin = () => {
    if (length < 1 || length > 16) { // Basic validation
      toast({
        title: 'Invalid Length',
        description: 'PIN length must be between 1 and 16.',
        variant: 'destructive',
      });
      setPin('');
      return;
    }

    let newPin = '';
    for (let i = 0; i < length; i++) {
      newPin += Math.floor(Math.random() * 10).toString();
    }
    setPin(newPin);
    toast({ title: 'New PIN Generated!', action: <CheckCircle2 className="text-green-500" /> });
  };

  useEffect(() => {
    generatePin();
  }, [length]);

  const handleCopyToClipboard = () => {
    if (!pin) {
      toast({ title: 'Nothing to Copy', description: 'No PIN generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(pin)
      .then(() => toast({ title: 'Copied!', description: 'PIN copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Random PIN Generator | Toolzenix</title>
        <meta name="description" content="Instantly generate secure random numeric PINs of customizable length (1-16 digits). Ideal for cards, forms, and temporary access codes." />
        <link rel="canonical" href="https://toolzenix.com/random-pin-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Pin className="w-16 h-16 text-teal-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Random PIN Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Instantly create secure numeric PINs for forms, cards, and more.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-8">
            <Label htmlFor="generated-pin" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Generated PIN</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="generated-pin"
                type="text"
                value={pin}
                readOnly
                className="text-3xl tracking-[0.2em] font-mono text-center bg-gray-100 dark:bg-gray-700/50 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                placeholder="----"
              />
              <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} title="Copy PIN">
                <Copy className="w-6 h-6 text-teal-500" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-500" /> PIN Options
            </h3>
            <div>
              <Label htmlFor="pin-length" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                PIN Length: {length} digits
              </Label>
              <Slider
                id="pin-length"
                min={1}
                max={16}
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                className="mt-2"
              />
            </div>
            
            <Button onClick={generatePin} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
              <RefreshCw className="w-5 h-5 mr-2" /> Regenerate PIN
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-md mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">About Random PINs</h2>
          <p>
            A Personal Identification Number (PIN) is a numeric passcode used to authenticate a user to a system. This tool generates random numeric PINs of a specified length.
          </p>
          <p>
            Randomly generated PINs are generally more secure than user-chosen PINs, which might be based on easily guessable numbers like birth dates or simple sequences.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Adjust the "PIN Length" slider to your desired number of digits (1-16).</li>
            <li>A random PIN will be generated automatically and displayed.</li>
            <li>Click the "Regenerate PIN" button to get a new PIN.</li>
            <li>Click the copy icon to copy the generated PIN to your clipboard.</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
};

export default RandomPinGenerator;