import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Copy, Trash2, MessageSquare as BotMessageSquare, Lock, Unlock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import CryptoJS from 'crypto-js';

const SecureTextEncryptDecrypt = () => {
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
  const { toast } = useToast();

  const handleProcess = () => {
    if (!inputText) {
      toast({ title: 'Input Empty', description: 'Please enter text to process.', variant: 'destructive' });
      return;
    }
    if (!password) {
      toast({ title: 'Password Missing', description: 'Please enter a passphrase.', variant: 'destructive' });
      return;
    }

    try {
      if (mode === 'encrypt') {
        const ciphertext = CryptoJS.AES.encrypt(inputText, password).toString();
        setOutputText(ciphertext);
        toast({ title: 'Text Encrypted!', action: <CheckCircle2 className="text-green-500" /> });
      } else {
        const bytes = CryptoJS.AES.decrypt(inputText, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText) {
            throw new Error("Decryption failed. Check passphrase or input text.");
        }
        setOutputText(originalText);
        toast({ title: 'Text Decrypted!', action: <CheckCircle2 className="text-green-500" /> });
      }
    } catch (e) {
      setOutputText('');
      toast({ title: 'Processing Error', description: e.message || 'Failed. Ensure correct passphrase for decryption.', variant: 'destructive', action: <AlertTriangle className="text-red-500" /> });
    }
  };

  const handleCopyToClipboard = (textToCopy, type) => {
    if (!textToCopy) {
      toast({ title: 'Nothing to Copy', description: `No ${type} text available.`, variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: `${type} text copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const handleClear = () => {
    setInputText('');
    // setPassword(''); // Optionally clear password too
    setOutputText('');
    toast({ title: 'Cleared!', description: 'Fields cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Text Encryption & Decryption (AES) | Toolzenix</title>
        <meta name="description" content="Securely encrypt and decrypt text messages using AES encryption with a passphrase. All operations are performed client-side." />
        <link rel="canonical" href="https://toolzenix.com/secure-text-encrypt-decrypt" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <BotMessageSquare className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Text Encryption / Decryption
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Secure your messages with AES encryption using a passphrase.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <Label htmlFor="mode-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">Operation</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger id="mode-select" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="encrypt"><Lock className="inline-block w-4 h-4 mr-2" />Encrypt Text</SelectItem>
                <SelectItem value="decrypt"><Unlock className="inline-block w-4 h-4 mr-2" />Decrypt Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <Label htmlFor="input-text" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {mode === 'encrypt' ? 'Text to Encrypt' : 'Ciphertext to Decrypt'}
            </Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encrypt' ? 'Enter your secret message...' : 'Paste encrypted text here...'}
              className="mt-2 min-h-[150px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password-input" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Passphrase</Label>
            <Input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong passphrase"
              className="mt-2 text-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Choose a strong, memorable passphrase. This is crucial for security.
            </p>
          </div>

          <Button onClick={handleProcess} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black mb-6">
            {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
          </Button>

          {outputText && (
            <div className="mb-6">
              <Label htmlFor="output-text" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {mode === 'encrypt' ? 'Encrypted Output (Ciphertext)' : 'Decrypted Output (Plaintext)'}
              </Label>
              <div className="flex items-center space-x-2 mt-2">
                <Textarea
                  id="output-text"
                  value={outputText}
                  readOnly
                  className="min-h-[100px] text-sm bg-gray-100 dark:bg-gray-700/50 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                />
                <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(outputText, mode === 'encrypt' ? 'Encrypted' : 'Decrypted')} title="Copy Output">
                  <Copy className="w-5 h-5 text-yellow-500" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button onClick={handleClear} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" /> Clear Fields
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">About AES Text Encryption</h2>
          <p>
            This tool uses AES (Advanced Encryption Standard) to encrypt and decrypt your text. AES is a symmetric encryption algorithm, meaning the same key (derived from your passphrase) is used for both encryption and decryption.
          </p>
          <p>
            <strong>Security Note:</strong> All encryption and decryption operations are performed locally in your browser. Your text and passphrase are never sent to any server. The security of your encrypted message relies heavily on the strength and secrecy of your passphrase.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Select "Encrypt Text" or "Decrypt Text" mode.</li>
            <li>Enter the text you want to process in the input area.</li>
            <li>Enter a strong passphrase. Remember this passphrase, as it's required for decryption.</li>
            <li>Click the "Encrypt Text" or "Decrypt Text" button.</li>
            <li>The output will appear below. You can copy it or clear the fields.</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
};

export default SecureTextEncryptDecrypt;