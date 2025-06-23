import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Braces, FileCode, Copy, Trash2, AlertTriangle, CheckCircle2, Settings2, RefreshCw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import convert from 'xml-js';

const JsonToXml = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleConvert = () => {
    if (!jsonInput.trim()) {
      setError('Input JSON is empty. Please paste some JSON data.');
      setXmlOutput('');
      return;
    }
    try {
      const jsObject = JSON.parse(jsonInput);
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const result = convert.json2xml(jsObject, options);
      setXmlOutput(result);
      setError('');
      toast({
        title: 'JSON to XML Converted!',
        description: 'Your JSON data has been successfully converted to XML.',
        action: <CheckCircle2 className="text-green-500" />,
      });
    } catch (e) {
      setError(`Conversion Error: ${e.message}. Make sure your JSON is valid.`);
      setXmlOutput('');
      toast({
        title: 'Conversion Failed',
        description: `Could not convert JSON to XML. ${e.message}`,
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
      setJsonInput('');
      if (!xmlOutput) setError('');
    } else if (field === 'output') {
      setXmlOutput('');
       if (!jsonInput) setError('');
    } else {
      setJsonInput('');
      setXmlOutput('');
      setError('');
    }
  };

  return (
    <>
      <Helmet>
        <title>JSON to XML Converter | Toolzenix</title>
        <meta name="description" content="Free online tool to convert JSON data to XML format. Fast, secure, and client-side processing for your data conversion needs." />
        <link rel="canonical" href="https://toolzenix.com/json-to-xml" />
      </Helmet>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-3">
            <Braces className="w-12 h-12 text-teal-500" />
            <RefreshCw className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            <FileCode className="w-12 h-12 text-sky-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            JSON to XML Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Easily convert your JSON data structures into XML format.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="jsonInput" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Input JSON</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(jsonInput, 'Input')} title="Copy Input">
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('input')} title="Clear Input">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="jsonInput"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Paste your JSON here... e.g., {"root": {"item": "value"}}'
                className="h-64 sm:h-80 text-sm border-gray-300 dark:border-gray-600 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                aria-label="JSON Input"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="xmlOutput" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Output XML</Label>
                 <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(xmlOutput, 'Output')} title="Copy Output" disabled={!xmlOutput}>
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('output')} title="Clear Output" disabled={!xmlOutput}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="xmlOutput"
                value={xmlOutput}
                readOnly
                placeholder="Converted XML will appear here..."
                className="h-64 sm:h-80 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
                aria-label="XML Output"
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

          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button onClick={handleConvert} className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white py-3 px-8 text-base">
              <RefreshCw className="w-5 h-5 mr-2" /> Convert to XML
            </Button>
             <Button variant="outline" onClick={() => handleClear('all')} className="w-full sm:w-auto text-sm">
              <Trash2 className="w-4 h-4 mr-2" /> Clear All
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 prose prose-sm sm:prose-base dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About JSON to XML Converter</h2>
          <p>This tool allows you to convert data from JSON (JavaScript Object Notation) format to XML (Extensible Markup Language) format. Both are widely used for data interchange, but sometimes you need to transform data from one to the other.</p>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Features:</h3>
          <ul>
            <li><strong>Direct Conversion:</strong> Converts valid JSON structures into well-formed XML.</li>
            <li><strong>Client-Side Operation:</strong> The entire conversion process happens in your browser, ensuring your data remains private and secure. No data is uploaded to any server.</li>
            <li><strong>Error Handling:</strong> Provides feedback if the input JSON is invalid.</li>
            <li><strong>User-Friendly Interface:</strong> Simple input and output fields with copy and clear functionalities.</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">How to Use:</h3>
          <ol>
            <li>Paste your JSON data into the "Input JSON" text area.</li>
            <li>Click the "Convert to XML" button.</li>
            <li>The converted XML data will appear in the "Output XML" area.</li>
            <li>If your JSON is invalid, an error message will be displayed. Correct the JSON and try again.</li>
            <li>Use the copy buttons to copy the input JSON or output XML.</li>
          </ol>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Important Notes:</h3>
          <ul>
            <li>The conversion tries to maintain the structure of your data. However, JSON and XML have different structural capabilities (e.g., XML supports attributes, mixed content, which JSON doesn't directly map to). This converter uses a standard mapping approach.</li>
            <li>For complex JSON structures, review the output XML to ensure it meets your specific requirements.</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default JsonToXml;