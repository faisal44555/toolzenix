import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileCode, Braces, Copy, Trash2, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import convert from 'xml-js';

const XmlToJson = () => {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleConvert = () => {
    if (!xmlInput.trim()) {
      setError('Input XML is empty. Please paste some XML data.');
      setJsonOutput('');
      return;
    }
    try {
      const options = { compact: true, ignoreComment: true, spaces: 4, nativeType: true, alwaysArray: false };
      const result = convert.xml2json(xmlInput, options);
      const parsedJson = JSON.parse(result); // To ensure it's valid JSON before pretty printing
      setJsonOutput(JSON.stringify(parsedJson, null, 4)); // Pretty print the output
      setError('');
      toast({
        title: 'XML to JSON Converted!',
        description: 'Your XML data has been successfully converted to JSON.',
        action: <CheckCircle2 className="text-green-500" />,
      });
    } catch (e) {
      setError(`Conversion Error: ${e.message}. Make sure your XML is valid and well-formed.`);
      setJsonOutput('');
      toast({
        title: 'Conversion Failed',
        description: `Could not convert XML to JSON. ${e.message}`,
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
      setXmlInput('');
      if (!jsonOutput) setError('');
    } else if (field === 'output') {
      setJsonOutput('');
      if (!xmlInput) setError('');
    } else {
      setXmlInput('');
      setJsonOutput('');
      setError('');
    }
  };

  return (
    <>
      <Helmet>
        <title>XML to JSON Converter | Toolzenix</title>
        <meta name="description" content="Free online tool to convert XML data to JSON format. Fast, secure, and client-side processing for your data transformation." />
        <link rel="canonical" href="https://toolzenix.com/xml-to-json" />
      </Helmet>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-3">
            <FileCode className="w-12 h-12 text-sky-500" />
            <RefreshCw className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            <Braces className="w-12 h-12 text-teal-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            XML to JSON Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Transform your XML data structures into easy-to-use JSON format.
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
                <Label htmlFor="xmlInput" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Input XML</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(xmlInput, 'Input')} title="Copy Input">
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('input')} title="Clear Input">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="xmlInput"
                value={xmlInput}
                onChange={(e) => setXmlInput(e.target.value)}
                placeholder='Paste your XML here... e.g., <root><item>value</item></root>'
                className="h-64 sm:h-80 text-sm border-gray-300 dark:border-gray-600 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white"
                aria-label="XML Input"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="jsonOutput" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Output JSON</Label>
                 <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(jsonOutput, 'Output')} title="Copy Output" disabled={!jsonOutput}>
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('output')} title="Clear Output" disabled={!jsonOutput}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="jsonOutput"
                value={jsonOutput}
                readOnly
                placeholder="Converted JSON will appear here..."
                className="h-64 sm:h-80 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
                aria-label="JSON Output"
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
            <Button onClick={handleConvert} className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-teal-600 hover:from-sky-600 hover:to-teal-700 text-white py-3 px-8 text-base">
              <RefreshCw className="w-5 h-5 mr-2" /> Convert to JSON
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About XML to JSON Converter</h2>
          <p>This tool facilitates the conversion of data from XML (Extensible Markup Language) format to JSON (JavaScript Object Notation) format. While XML is powerful for document markup, JSON is often preferred for web APIs and modern applications due to its simplicity and ease of parsing.</p>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Features:</h3>
          <ul>
            <li><strong>Accurate Conversion:</strong> Transforms well-formed XML into a structured JSON object.</li>
            <li><strong>Client-Side Processing:</strong> All conversion logic runs in your browser, ensuring your data remains private and is processed quickly.</li>
            <li><strong>Error Indication:</strong> If the input XML is malformed, the tool will provide an error message.</li>
            <li><strong>Pretty-Printed Output:</strong> The resulting JSON is automatically formatted with indentation for better readability.</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">How to Use:</h3>
          <ol>
            <li>Paste your XML data into the "Input XML" text area.</li>
            <li>Click the "Convert to JSON" button.</li>
            <li>The converted and formatted JSON data will appear in the "Output JSON" area.</li>
            <li>If your XML is not well-formed, an error message will guide you.</li>
            <li>Use the copy buttons to easily grab the input XML or output JSON.</li>
          </ol>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Conversion Considerations:</h3>
          <ul>
            <li>XML attributes are typically converted to properties, often prefixed (e.g., `_attributes`).</li>
            <li>Text content within elements becomes property values.</li>
            <li>Repeated elements with the same name under a parent may be converted into an array in JSON.</li>
            <li>The converter aims for a sensible default mapping. For highly specific XML structures, you might need to adjust the resulting JSON or use more specialized conversion libraries if the default doesn't fit your exact use case.</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default XmlToJson;