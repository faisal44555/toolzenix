import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Trash2, Fingerprint, CheckCircle2 } from 'lucide-react';
import CryptoJS from 'crypto-js';

const Md5Generator = () => {
  const [inputText, setInputText] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const { toast } = useToast();

  const generateMd5 = () => {
    if (!inputText) {
      setMd5Hash('');
      toast({ title: 'Input Empty', description: 'Please enter text to generate MD5 hash.', variant: 'destructive' });
      return;
    }
    const hash = CryptoJS.MD5(inputText).toString();
    setMd5Hash(hash);
    toast({ title: 'MD5 Hash Generated!', action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = () => {
    if (!md5Hash) {
      toast({ title: 'Nothing to Copy', description: 'No hash generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(md5Hash)
      .then(() => toast({ title: 'Copied!', description: 'MD5 hash copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const handleClear = () => {
    setInputText('');
    setMd5Hash('');
    toast({ title: 'Cleared!', description: 'Input and hash cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>MD5 Hash Generator | Toolzenix</title>
        <meta name="description" content="Generate MD5 hashes from your text or string input. Fast, secure, and client-side MD5 hashing tool." />
        <link rel="canonical" href="https://toolzenix.com/md5-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Fingerprint className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            MD5 Hash Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Create MD5 hashes from text for integrity checks and other uses.
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

          <Button onClick={generateMd5} className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-6">
            Generate MD5 Hash
          </Button>

          {md5Hash && (
            <div className="mb-6">
              <Label htmlFor="md5-output" className="text-lg font-semibold text-gray-700 dark:text-gray-200">MD5 Hash Output</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  id="md5-output"
                  type="text"
                  value={md5Hash}
                  readOnly
                  className="text-md font-mono bg-gray-100 dark:bg-gray-700/50 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                />
                <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} title="Copy Hash">
                  <Copy className="w-5 h-5 text-purple-500" />
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
          <h2 className="text-2xl font-semibold">What is MD5?</h2>
          <p>
            MD5 (Message Digest Algorithm 5) is a widely used cryptographic hash function that produces a 128-bit (16-byte) hash value. MD5 hashes are commonly used to verify data integrity.
          </p>
          <p>
            <strong>Important Note:</strong> While MD5 is fast and widely implemented, it is considered cryptographically broken and unsuitable for security-critical applications like password hashing due to known collision vulnerabilities. It can still be useful for checksums to detect unintentional data corruption. For secure hashing, consider SHA-256 or stronger algorithms.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Enter the text you want to hash into the "Input Text" area.</li>
            <li>Click the "Generate MD5 Hash" button.</li>
            <li>The 32-character hexadecimal MD5 hash will appear in the output field.</li>
            <li>You can copy the hash or clear the fields.</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
};

export default Md5Generator;