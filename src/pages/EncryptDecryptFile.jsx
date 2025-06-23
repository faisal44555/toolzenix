import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { FileKey, UploadCloud, AlertCircle, Download, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { saveAs } from 'file-saver';

const EncryptDecryptFile = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('encrypt');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    event.target.value = null;
  };

  const processFile = useCallback(async () => {
    if (!file) {
      toast({ title: 'No File Selected', description: 'Please select a file to process.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }
    if (!password) {
      toast({ title: 'No Password', description: 'Please enter a password for encryption/decryption.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    setIsProcessing(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileData = e.target.result;
      try {
        let processedData;
        let outputFileName = file.name;

        if (mode === 'encrypt') {
          const wordArray = CryptoJS.lib.WordArray.create(fileData);
          const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
          processedData = new Blob([encrypted], { type: 'text/plain' });
          outputFileName = `${file.name}.enc`;
          toast({ title: 'Encryption Successful!', description: 'File encrypted and ready for download.' });
        } else {
            const encryptedText = await file.text();
            const decrypted = CryptoJS.AES.decrypt(encryptedText, password);
            const typedArray = new Uint8Array(decrypted.words.length * 4);
            for (let i = 0; i < decrypted.words.length; i++) {
                typedArray[i*4]   = (decrypted.words[i] >> 24) & 0xff;
                typedArray[i*4+1] = (decrypted.words[i] >> 16) & 0xff;
                typedArray[i*4+2] = (decrypted.words[i] >>  8) & 0xff;
                typedArray[i*4+3] =  decrypted.words[i]        & 0xff;
            }
            const actualLength = decrypted.sigBytes;
            processedData = new Blob([typedArray.slice(0, actualLength)], { type: 'application/octet-stream' });
            
            if (outputFileName.endsWith('.enc')) {
                outputFileName = outputFileName.substring(0, outputFileName.length - 4);
            } else {
                outputFileName = `decrypted_${outputFileName}`;
            }
            toast({ title: 'Decryption Successful!', description: 'File decrypted and ready for download.' });
        }
        saveAs(processedData, outputFileName);
        setFile(null);
        setPassword('');
      } catch (error) {
        console.error(`${mode} error:`, error);
        toast({ title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Failed`, description: 'An error occurred. Check password or file type.', variant: 'destructive', action: <AlertCircle/> });
      } finally {
        setIsProcessing(false);
      }
    };
    
    if (mode === 'encrypt') {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }

  }, [file, password, mode, toast]);

  return (
    <>
      <Helmet>
        <title>Encrypt/Decrypt File Tool | Toolzenix</title>
        <meta name="description" content="Securely encrypt or decrypt files directly in your browser using AES encryption. Your files remain private and are not uploaded." />
        <link rel="canonical" href="https://toolzenix.com/encrypt-decrypt-file" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <FileKey className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Encrypt/Decrypt File</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Secure your files with AES encryption, or decrypt them, client-side.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Mode:</Label>
            <RadioGroup value={mode} onValueChange={setMode} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="encrypt" id="mode-encrypt" className="text-red-600 border-red-300 dark:text-red-400 dark:border-red-500"/>
                <Label htmlFor="mode-encrypt" className="text-gray-700 dark:text-gray-300 flex items-center"><Lock size={16} className="mr-1"/>Encrypt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decrypt" id="mode-decrypt" className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-500"/>
                <Label htmlFor="mode-decrypt" className="text-gray-700 dark:text-gray-300 flex items-center"><Unlock size={16} className="mr-1"/>Decrypt</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="file-upload-crypt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select File:
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="file-upload-crypt"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-red-600 dark:text-red-400 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                  >
                    <span>Upload a file</span>
                    <Input id="file-upload-crypt" name="file-upload-crypt" type="file" className="sr-only" onChange={handleFileChange} />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">{mode === 'decrypt' ? 'Encrypted .enc file or text' : 'Any file type'}</p>
              </div>
            </div>
          </div>

          {file && (
            <p className="text-sm text-gray-700 dark:text-gray-300">Selected: <span className="font-medium">{file.name}</span></p>
          )}

          <div>
            <Label htmlFor="password-crypt" className="text-gray-700 dark:text-gray-300">Password</Label>
            <div className="relative mt-1">
                <Input 
                id="password-crypt" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600 pr-10" 
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
            </div>
          </div>
          
          <Button 
            onClick={processFile} 
            disabled={isProcessing || !file || !password}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                ></motion.div>
                Processing...
              </>
            ) : (
              <>
                {mode === 'encrypt' ? <Lock className="mr-2 h-5 w-5" /> : <Unlock className="mr-2 h-5 w-5" />}
                {mode.charAt(0).toUpperCase() + mode.slice(1)} File
              </>
            )}
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How File Encryption/Decryption Works</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Select whether you want to Encrypt or Decrypt a file.</li>
            <li>Upload the file you want to process.
                <ul className="list-disc list-inside ml-4">
                    <li>For encryption, you can upload any file type.</li>
                    <li>For decryption, upload a file previously encrypted by this tool (typically a .enc text file containing Base64 data).</li>
                </ul>
            </li>
            <li>Enter a strong password. This password is crucial for both encrypting and decrypting the file. <strong>Remember this password, as it cannot be recovered if lost.</strong></li>
            <li>Click "Encrypt File" or "Decrypt File".</li>
            <li>The processed file will be downloaded to your device. Encrypted files will typically have a ".enc" extension.</li>
          </ol>
          <p>This tool uses AES (Advanced Encryption Standard) for encryption. All operations are performed locally in your browser using JavaScript (CryptoJS library). Your files and password are never uploaded to any server.</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>Security relies on the strength of your password and the inherent security of client-side AES. This provides good protection but be mindful of browser vulnerabilities or compromised devices.</p>
        </motion.div>
      </div>
    </>
  );
};

export default EncryptDecryptFile;