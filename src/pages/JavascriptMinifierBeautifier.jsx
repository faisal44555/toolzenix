import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Code, Copy, Trash2, AlertTriangle, CheckCircle2, Wand2, Minimize2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { js_beautify as jsBeautify } from 'js-beautify';
import { minify as terserMinify } from 'terser';

const JavascriptMinifierBeautifier = () => {
  const [jsInput, setJsInput] = useState('');
  const [processedJs, setProcessedJs] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleProcess = async (action) => {
    if (!jsInput.trim()) {
      setError('Input JavaScript is empty.');
      setProcessedJs('');
      toast({
        title: 'Input Missing',
        description: 'Please enter some JavaScript code to process.',
        variant: 'destructive',
      });
      return;
    }
    try {
      let result;
      if (action === 'beautify') {
        result = jsBeautify(jsInput, {
          indent_size: 2,
          space_in_empty_paren: true,
        });
        toast({
          title: 'JavaScript Beautified!',
          description: 'JavaScript code has been successfully formatted.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      } else { // minify
        const terserResult = await terserMinify(jsInput, {
          mangle: true, // Mangle variable names
          compress: {
            drop_console: true, // Remove console.log statements
          },
        });
        if (terserResult.error) {
          throw new Error(terserResult.error.message || 'Terser minification failed');
        }
        result = terserResult.code;
        toast({
          title: 'JavaScript Minified!',
          description: 'JavaScript code has been successfully minified.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      }
      setProcessedJs(result);
      setError('');
    } catch (e) {
      setError(`Processing Error: ${e.message}`);
      setProcessedJs('');
      toast({
        title: 'Processing Failed',
        description: `Could not process JavaScript. ${e.message}`,
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
      toast({ title: 'Copied to Clipboard!', description: `${type} JavaScript copied.` });
    } catch (err) {
      toast({ title: 'Copy Failed', description: `Could not copy ${type} JavaScript.`, variant: 'destructive' });
    }
  };

  const handleClear = (field) => {
    if (field === 'input') setJsInput('');
    else if (field === 'output') setProcessedJs('');
    else {
      setJsInput('');
      setProcessedJs('');
      setError('');
    }
  };

  return (
    <>
      <Helmet>
        <title>JavaScript Minifier & Beautifier | Toolzenix</title>
        <meta name="description" content="Online JavaScript minifier and beautifier. Optimize your JS for production or format it for readability. Works entirely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/javascript-minifier-beautifier" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            JavaScript Minifier & Beautifier
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Minify your JavaScript for production or beautify it for easier debugging.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <Label htmlFor="jsInput" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Input JavaScript</Label>
            <Textarea
              id="jsInput"
              value={jsInput}
              onChange={(e) => setJsInput(e.target.value)}
              placeholder="Paste your JavaScript code here..."
              className="min-h-[300px] text-sm font-mono border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="JavaScript Input"
            />
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleCopy(jsInput, 'Input')} variant="outline" size="sm" className="flex-1">
                <Copy className="w-4 h-4 mr-2" /> Copy Input
              </Button>
              <Button onClick={() => handleClear('input')} variant="destructive" size="sm" className="flex-1">
                <Trash2 className="w-4 h-4 mr-2" /> Clear Input
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <Label htmlFor="processedJs" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Output JavaScript</Label>
            <Textarea
              id="processedJs"
              value={processedJs}
              readOnly
              placeholder="Processed JavaScript will appear here..."
              className="min-h-[300px] text-sm font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-gray-200 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Processed JavaScript Output"
            />
            <div className="mt-4 flex space-x-2">
               <Button onClick={() => handleCopy(processedJs, 'Output')} variant="outline" size="sm" className="flex-1" disabled={!processedJs}>
                <Copy className="w-4 h-4 mr-2" /> Copy Output
              </Button>
              <Button onClick={() => handleClear('output')} variant="destructive" size="sm" className="flex-1" disabled={!processedJs}>
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
          <Button onClick={() => handleProcess('beautify')} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black w-full sm:w-auto">
            <Wand2 className="w-5 h-5 mr-2" /> Beautify JS
          </Button>
          <Button onClick={() => handleProcess('minify')} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto">
            <Minimize2 className="w-5 h-5 mr-2" /> Minify JS
          </Button>
          <Button onClick={() => handleClear('all')} variant="outline" size="lg" className="w-full sm:w-auto">
            <Trash2 className="w-5 h-5 mr-2" /> Clear All
          </Button>
        </motion.div>
        
        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">About the JavaScript Minifier & Beautifier</h2>
          <p>
            This tool allows you to either minify or beautify your JavaScript code, all within your browser.
          </p>
          <ul>
            <li><strong>Beautify JS:</strong> Formats JavaScript code with proper indentation and spacing, making it easier to read, understand, and debug.</li>
            <li><strong>Minify JS:</strong> Removes unnecessary characters (like whitespace, comments, and shortening variable names) from your JavaScript code. This significantly reduces file size, leading to faster script loading and execution on web pages.</li>
          </ul>
          <p>
            The minification process uses Terser, a powerful JavaScript parser, mangler, and compressor toolkit. Beautification uses js-beautify. Your code's privacy is ensured as no data is sent to any server.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Paste your JavaScript code into the "Input JavaScript" text area.</li>
            <li>Click "Beautify JS" to format the code or "Minify JS" to compress it.</li>
            <li>The processed JavaScript will appear in the "Output JavaScript" text area.</li>
            <li>Use the "Copy" and "Clear" buttons as needed for input and output.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default JavascriptMinifierBeautifier;