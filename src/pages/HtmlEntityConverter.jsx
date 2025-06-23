import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Trash2, ArrowRightLeft, Code } from 'lucide-react';

const HtmlEntityConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();

  const encodeEntities = (text) => {
    const element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
  };

  const decodeEntities = (text) => {
    const element = document.createElement('textarea');
    element.innerHTML = text;
    return element.value;
  };

  const handleConvert = (action) => {
    if (!inputText.trim()) {
      toast({ title: 'Input Empty', description: 'Please enter text to convert.', variant: 'destructive' });
      return;
    }
    try {
      if (action === 'encode') {
        setOutputText(encodeEntities(inputText));
        toast({ title: 'Encoded!', description: 'Text successfully encoded to HTML entities.' });
      } else {
        setOutputText(decodeEntities(inputText));
        toast({ title: 'Decoded!', description: 'HTML entities successfully decoded to text.' });
      }
    } catch (e) {
      toast({ title: 'Conversion Error', description: `Failed to convert: ${e.message}`, variant: 'destructive' });
    }
  };

  const handleCopy = (textToCopy, type) => {
    if (!textToCopy) {
      toast({ title: 'Nothing to Copy', description: `The ${type} field is empty.`, variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: `${type} text copied.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const handleClear = (field) => {
    if (field === 'input') setInputText('');
    else if (field === 'output') setOutputText('');
    else {
      setInputText('');
      setOutputText('');
    }
  };

  return (
    <>
      <Helmet>
        <title>HTML Entity Encoder & Decoder | Toolzenix</title>
        <meta name="description" content="Encode text to HTML entities or decode HTML entities back to text. Useful for displaying special characters in HTML." />
        <link rel="canonical" href="https://toolzenix.com/html-entity-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            HTML Entity Encoder/Decoder
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert text to HTML entities and vice-versa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Label htmlFor="inputText" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Input Text / Entities</Label>
            <Textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text or HTML entities here..."
              className="min-h-[250px] text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleCopy(inputText, 'Input')} variant="outline" size="sm" className="flex-1"><Copy className="w-4 h-4 mr-2" />Copy</Button>
              <Button onClick={() => handleClear('input')} variant="destructive" size="sm" className="flex-1"><Trash2 className="w-4 h-4 mr-2" />Clear</Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Label htmlFor="outputText" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Output</Label>
            <Textarea
              id="outputText"
              value={outputText}
              readOnly
              placeholder="Converted text or entities will appear here..."
              className="min-h-[250px] text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-gray-200"
            />
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleCopy(outputText, 'Output')} variant="outline" size="sm" className="flex-1" disabled={!outputText}><Copy className="w-4 h-4 mr-2" />Copy</Button>
              <Button onClick={() => handleClear('output')} variant="destructive" size="sm" className="flex-1" disabled={!outputText}><Trash2 className="w-4 h-4 mr-2" />Clear</Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button onClick={() => handleConvert('encode')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            <Code className="w-5 h-5 mr-2" /> Encode to Entities
          </Button>
          <Button onClick={() => handleConvert('decode')} size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
            <ArrowRightLeft className="w-5 h-5 mr-2" /> Decode from Entities
          </Button>
          <Button onClick={() => handleClear('all')} variant="outline" size="lg" className="w-full sm:w-auto">
             <Trash2 className="w-5 h-5 mr-2" /> Clear All
          </Button>
        </motion.div>

        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">About HTML Entities</h2>
          <p>
            HTML entities are used to display reserved characters in HTML (like &lt;, &gt;, &amp;), or characters that are not easily typed on a standard keyboard. Encoding converts these characters into their entity equivalents (e.g., '&lt;' becomes '&amp;lt;'). Decoding converts entities back to their original characters.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Enter your text or HTML entities into the "Input" area.</li>
            <li>Click "Encode to Entities" to convert plain text characters to their HTML entity representations.</li>
            <li>Click "Decode from Entities" to convert HTML entities back into their original characters.</li>
            <li>The result will appear in the "Output" area. Use the copy and clear buttons as needed.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default HtmlEntityConverter;