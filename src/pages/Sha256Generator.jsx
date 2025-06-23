import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Trash2, LockKeyhole, CheckCircle2 } from 'lucide-react';
import CryptoJS from 'crypto-js';

const Sha256Generator = () => {
  const [inputText, setInputText] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');
  const { toast } = useToast();

  const generateSha256 = () => {
    if (!inputText) {
      setSha256Hash('');
      toast({ title: 'Input Empty', description: 'Please enter text to generate SHA256 hash.', variant: 'destructive' });
      return;
    }
    const hash = CryptoJS.SHA256(inputText).toString(CryptoJS.enc.Hex);
    setSha256Hash(hash);
    toast({ title: 'SHA256 Hash Generated!', action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = () => {
    if (!sha256Hash) {
      toast({ title: 'Nothing to Copy', description: 'No hash generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(sha256Hash)
      .then(() => toast({ title: 'Copied!', description: 'SHA256 hash copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const handleClear = () => {
    setInputText('');
    setSha256Hash('');
    toast({ title: 'Cleared!', description: 'Input and hash cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>SHA256 Hash Generator | Toolzenix</title>
        <meta name="description" content="Generate SHA256 hashes from your text or string input. A secure and widely used cryptographic hashing algorithm." />
        <link rel="canonical" href="https://toolzenix.com/sha256-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <LockKeyhole className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            SHA256 Hash Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Create secure SHA256 hashes from text.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <Label htmlFor="input-text" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Input Text</Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to hash..."
              className="mt-2 min-h-[150px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <Button onClick={generateSha256} className="w-full bg-red-600 hover:bg-red-700 text-white mb-6">
            Generate SHA256 Hash
          </Button>

          {sha256Hash && (
            <div className="mb-6">
              <Label htmlFor="sha256-output" className="text-lg font-semibold text-gray-700 dark:text-gray-200">SHA256 Hash Output</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  id="sha256-output"
                  type="text"
                  value={sha256Hash}
                  readOnly
                  className="text-md font-mono bg-gray-100 dark:bg-gray-700/50 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                />
                <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} title="Copy Hash">
                  <Copy className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button onClick={handleClear} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" /> Clear
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">What is SHA256?</h2>
          <p>
            SHA256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (32-byte) hash value, typically represented as a 64-character hexadecimal string. It is part of the SHA-2 family of algorithms, designed by the NSA.
          </p>
          <p>
            SHA256 is widely used in various security applications and protocols, including SSL/TLS, PGP, SSH, IPsec, and for verifying data integrity and digital signatures. It is considered secure against known cryptographic attacks.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Enter the text you want to hash into the "Input Text" area.</li>
            <li>Click the "Generate SHA256 Hash" button.</li>
            <li>The 64-character hexadecimal SHA256 hash will appear in the output field.</li>
            <li>You can copy the hash or clear the fields.</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
};

export default Sha256Generator;