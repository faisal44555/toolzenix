import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, KeyRound, Settings, ShieldCheck } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { toast } = useToast();

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool === '') {
      toast({
        title: 'No Character Types Selected',
        description: 'Please select at least one character type.',
        variant: 'destructive',
      });
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopyToClipboard = () => {
    if (!password) {
      toast({ title: 'Nothing to Copy', description: 'No password generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(password)
      .then(() => toast({ title: 'Copied!', description: 'Password copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Strong Password Generator | Toolzenix</title>
        <meta name="description" content="Generate strong, secure, and random passwords with customizable options for length and character types (uppercase, lowercase, numbers, symbols)." />
        <link rel="canonical" href="https://toolzenix.com/password-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <KeyRound className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Password Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Create strong, secure, and random passwords in seconds.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <Label htmlFor="generated-password" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Generated Password</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="generated-password"
                type="text"
                value={password}
                readOnly
                className="text-xl font-mono bg-gray-100 dark:bg-gray-700/50 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                placeholder="Your secure password..."
              />
              <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} title="Copy Password">
                <Copy className="w-6 h-6 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={generatePassword} title="Regenerate Password">
                <RefreshCw className="w-6 h-6 text-green-500" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-500" /> Password Options
            </h3>
            <div>
              <Label htmlFor="password-length" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password Length: {length}
              </Label>
              <Slider
                id="password-length"
                min={8}
                max={64}
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="include-uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                <Label htmlFor="include-uppercase" className="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase (A-Z)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                <Label htmlFor="include-lowercase" className="text-sm font-medium text-gray-700 dark:text-gray-300">Lowercase (a-z)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                <Label htmlFor="include-numbers" className="text-sm font-medium text-gray-700 dark:text-gray-300">Numbers (0-9)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                <Label htmlFor="include-symbols" className="text-sm font-medium text-gray-700 dark:text-gray-300">Symbols (!@#...)</Label>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold flex items-center"><ShieldCheck className="w-7 h-7 mr-2 text-green-500"/> Why Use a Strong Password?</h2>
          <p>
            Strong passwords are your first line of defense against unauthorized access to your accounts and personal information. A good password should be:
          </p>
          <ul>
            <li><strong>Long:</strong> At least 12-16 characters. The longer, the better.</li>
            <li><strong>Complex:</strong> A mix of uppercase letters, lowercase letters, numbers, and symbols.</li>
            <li><strong>Unique:</strong> Different for each of your accounts.</li>
            <li><strong>Random:</strong> Avoid using easily guessable information like birthdays, names, or common words.</li>
          </ul>
          <p>This tool helps you create passwords that meet these criteria, significantly enhancing your online security.</p>
        </motion.div>
      </div>
    </>
  );
};

export default PasswordGenerator;