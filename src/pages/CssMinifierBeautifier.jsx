import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileCode, Copy, Trash2, AlertTriangle, CheckCircle2, Wand2, Minimize2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { css_beautify as cssBeautify } from 'js-beautify';

const CssMinifierBeautifier = () => {
  const [cssInput, setCssInput] = useState('');
  const [processedCss, setProcessedCss] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const minifyCss = (cssString) => {
    let minified = cssString
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') 
      .replace(/\s*([\{\};:,])\s*/g, '$1') 
      .replace(/\s\s+/g, ' ') 
      .replace(/;\s*}/g, '}') 
      .trim();
    return minified;
  };

  const handleProcess = (action) => {
    if (!cssInput.trim()) {
      setError('Input CSS is empty.');
      setProcessedCss('');
      toast({
        title: 'Input Missing',
        description: 'Please enter some CSS code to process.',
        variant: 'destructive',
      });
      return;
    }
    try {
      let result;
      if (action === 'beautify') {
        result = cssBeautify(cssInput, {
          indent_size: 2,
          indent_char: ' ',
          selector_separator_newline: true,
          end_with_newline: true,
        });
        toast({
          title: 'CSS Beautified!',
          description: 'CSS code has been successfully formatted.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      } else { 
        result = minifyCss(cssInput);
        toast({
          title: 'CSS Minified!',
          description: 'CSS code has been successfully minified.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      }
      setProcessedCss(result);
      setError('');
    } catch (e) {
      setError(`Processing Error: ${e.message}`);
      setProcessedCss('');
      toast({
        title: 'Processing Failed',
        description: `Could not process CSS. ${e.message}`,
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
      toast({ title: 'Copied to Clipboard!', description: `${type} CSS copied.` });
    } catch (err) {
      toast({ title: 'Copy Failed', description: `Could not copy ${type} CSS.`, variant: 'destructive' });
    }
  };

  const handleClear = (field) => {
    if (field === 'input') {
      setCssInput('');
      if(!processedCss) setError('');
    } else if (field === 'output') {
      setProcessedCss('');
      if(!cssInput) setError('');
    } else {
      setCssInput('');
      setProcessedCss('');
      setError('');
    }
  };

  return (
    <>
      <Helmet>
        <title>CSS Minifier & Beautifier | Toolzenix</title>
        <meta name="description" content="Online CSS minifier and beautifier. Optimize your CSS for production or format it for readability. Works entirely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/css-minifier-beautifier" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            CSS Minifier & Beautifier
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Minify your CSS for production or beautify it for readability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <Label htmlFor="cssInput" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Input CSS</Label>
            <Textarea
              id="cssInput"
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              placeholder="Paste your CSS code here..."
              className="min-h-[300px] text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              aria-label="CSS Input"
            />
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleCopy(cssInput, 'Input')} variant="outline" size="sm" className="flex-1">
                <Copy className="w-4 h-4 mr-2" /> Copy Input
              </Button>
              <Button onClick={() => handleClear('input')} variant="destructive" size="sm" className="flex-1">
                <Trash2 className="w-4 h-4 mr-2" /> Clear Input
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <Label htmlFor="processedCss" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Output CSS</Label>
            <Textarea
              id="processedCss"
              value={processedCss}
              readOnly
              placeholder="Processed CSS will appear here..."
              className="min-h-[300px] text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Processed CSS Output"
            />
            <div className="mt-4 flex space-x-2">
               <Button onClick={() => handleCopy(processedCss, 'Output')} variant="outline" size="sm" className="flex-1" disabled={!processedCss}>
                <Copy className="w-4 h-4 mr-2" /> Copy Output
              </Button>
              <Button onClick={() => handleClear('output')} variant="destructive" size="sm" className="flex-1" disabled={!processedCss}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear Output
              </Button>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md flex items-center"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button onClick={() => handleProcess('beautify')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            <Wand2 className="w-5 h-5 mr-2" /> Beautify CSS
          </Button>
          <Button onClick={() => handleProcess('minify')} size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
            <Minimize2 className="w-5 h-5 mr-2" /> Minify CSS
          </Button>
          <Button onClick={() => handleClear('all')} variant="outline" size="lg" className="w-full sm:w-auto">
            <Trash2 className="w-5 h-5 mr-2" /> Clear All
          </Button>
        </motion.div>
        
        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">About the CSS Minifier & Beautifier</h2>
          <p>
            This tool helps you manage your CSS code by either minifying it or beautifying it.
          </p>
          <ul>
            <li><strong>Beautify CSS:</strong> Formats your CSS code to make it more readable with proper indentation and line breaks. This is useful during development for easier debugging and understanding.</li>
            <li><strong>Minify CSS:</strong> Removes unnecessary characters from your CSS code like comments, whitespace, and newlines without affecting its functionality. This reduces the file size, leading to faster load times for your web pages.</li>
          </ul>
          <p>
            All processing is done directly in your browser, ensuring your code remains private and secure. No data is uploaded to any server.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Paste your CSS code into the "Input CSS" text area.</li>
            <li>Click "Beautify CSS" to format the code or "Minify CSS" to compress it.</li>
            <li>The processed CSS will appear in the "Output CSS" text area.</li>
            <li>Use the "Copy" buttons to copy the input or output text to your clipboard.</li>
            <li>Use the "Clear" buttons to clear specific fields or "Clear All" to reset everything.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default CssMinifierBeautifier;