import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ShieldCheck, Copy, Trash2, ArrowRightLeft, AlertTriangle, CheckCircle2, Settings2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Base64Converter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionMode, setConversionMode] = useState('encode'); // 'encode' or 'decode'
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleConvert = () => {
    if (!inputText.trim()) {
      setError('Input is empty. Please enter some text.');
      setOutputText('');
      return;
    }
    setError('');
    try {
      if (conversionMode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(inputText))); // Handle UTF-8
        setOutputText(encoded);
        toast({
          title: 'Encoded to Base64!',
          description: 'Text successfully encoded.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      } else {
        const decoded = decodeURIComponent(escape(atob(inputText))); // Handle UTF-8
        setOutputText(decoded);
        toast({
          title: 'Decoded from Base64!',
          description: 'Text successfully decoded.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      }
    } catch (e) {
      const errorMessage = conversionMode === 'decode' ? 'Invalid Base64 string or character encoding issue.' : 'Error during encoding.';
      setError(`Conversion Error: ${errorMessage} ${e.message}`);
      setOutputText('');
      toast({
        title: 'Conversion Failed',
        description: errorMessage,
        variant: 'destructive',
        action: <AlertTriangle className="text-red-500" />,
      });
    }
  };

  const handleCopy = async (textToCopy, type) => {
    if (!textToCopy) {
      toast({ title: 'Nothing to Copy', description: `The ${type} field is empty.`, variant: 'destructive' });
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({ title: 'Copied to Clipboard!', description: `${type} content copied.` });
    } catch (err) {
      toast({ title: 'Copy Failed', description: `Could not copy ${type} content.`, variant: 'destructive' });
    }
  };
  
  const handleClear = (field) => {
    if (field === 'input') {
      setInputText('');
      if(!outputText) setError('');
    } else if (field === 'output') {
      setOutputText('');
      if(!inputText) setError('');
    } else {
      setInputText('');
      setOutputText('');
      setError('');
    }
  };

  const switchModes = () => {
    setConversionMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInputText(outputText);
    setOutputText(inputText); // Swap content
    setError('');
  };


  return (
    <>
      <Helmet>
        <title>Base64 Encode & Decode Tool | Toolzenix</title>
        <meta name="description" content="Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 strings back to text. Supports UTF-8. Fast, secure, and client-side." />
        <link rel="canonical" href="https://toolzenix.com/base64-converter" />
      </Helmet>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <ShieldCheck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Base64 Encode & Decode
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Easily convert text to Base64 and vice-versa. UTF-8 compatible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Label htmlFor="conversionMode" className="text-md font-medium text-gray-700 dark:text-gray-300">Operation:</Label>
            <Select value={conversionMode} onValueChange={setConversionMode}>
              <SelectTrigger id="conversionMode" className="w-full sm:w-[200px] dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="encode">Encode to Base64</SelectItem>
                <SelectItem value="decode">Decode from Base64</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 items-center gap-6">
            {/* Input Area */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="inputText" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {conversionMode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                </Label>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(inputText, 'Input')} title="Copy Input">
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('input')} title="Clear Input">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={conversionMode === 'encode' ? 'Enter text here...' : 'Enter Base64 string here...'}
                className="h-48 sm:h-56 text-sm border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                aria-label={conversionMode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
              />
            </div>

            {/* Action Buttons - Centered for all screens */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 my-2">
              <Button onClick={handleConvert} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-base">
                {conversionMode === 'encode' ? 'Encode' : 'Decode'}
                <ArrowRightLeft className="w-5 h-5 ml-2 hidden sm:inline" />
              </Button>
              <Button onClick={switchModes} variant="outline" className="w-full sm:w-auto" title="Switch Input/Output & Mode">
                <ArrowRightLeft className="w-5 h-5 mr-2 sm:mr-0" /> <span className="sm:hidden">Switch Mode & Content</span>
              </Button>
            </div>
            
            {/* Output Area */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="outputText" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {conversionMode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                </Label>
                 <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(outputText, 'Output')} title="Copy Output" disabled={!outputText}>
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('output')} title="Clear Output" disabled={!outputText}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="outputText"
                value={outputText}
                readOnly
                placeholder={conversionMode === 'encode' ? 'Base64 encoded text will appear here...' : 'Decoded text will appear here...'}
                className="h-48 sm:h-56 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
                aria-label={conversionMode === 'encode' ? 'Base64 output' : 'Decoded text'}
              />
            </div>
          </div>


          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md flex items-center text-sm"
            >
              <AlertTriangle className="w-5 h-5 mr-2 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => handleClear('all')} className="text-sm">
              <Trash2 className="w-4 h-4 mr-2" /> Clear All Fields
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 prose prose-sm sm:prose-base dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About Base64 Encode & Decode</h2>
          <p>Base64 is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. This tool allows you to easily encode plain text into Base64 and decode Base64 strings back into their original text form.</p>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Features:</h3>
          <ul>
            <li><strong>Encode:</strong> Converts standard text (UTF-8 compatible) into a Base64 string.</li>
            <li><strong>Decode:</strong> Converts a valid Base64 string back into its original text form (UTF-8 compatible).</li>
            <li><strong>UTF-8 Support:</strong> Correctly handles various characters and symbols by using UTF-8 encoding before Base64 operations.</li>
            <li><strong>Client-Side:</strong> All encoding and decoding happens directly in your browser. Your data is safe and never sent to a server.</li>
            <li><strong>Quick Actions:</strong> Copy results to clipboard, clear fields, and switch between encode/decode modes easily.</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">How to Use:</h3>
          <ol>
            <li>Select the operation: "Encode to Base64" or "Decode from Base64".</li>
            <li>Paste your text or Base64 string into the appropriate input area.</li>
            <li>Click the "Encode" or "Decode" button.</li>
            <li>The result will appear in the output area.</li>
            <li>Use the copy and clear buttons as needed. The switch button swaps content and mode.</li>
          </ol>
          <p>Base64 encoding is commonly used to transmit data that might otherwise be misinterpreted by systems not designed to handle binary data, such as in email attachments or embedding binary data in XML or JSON.</p>
        </motion.div>
      </div>
    </>
  );
};

export default Base64Converter;