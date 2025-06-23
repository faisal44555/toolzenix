import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileJson, Copy, Trash2, AlertTriangle, CheckCircle2, Settings2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JsonFormatter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');
  const [indentation, setIndentation] = useState('2'); // Default 2 spaces
  const { toast } = useToast();

  const handleFormat = (beautify = true) => {
    if (!jsonInput.trim()) {
      setError('Input is empty. Please paste some JSON data.');
      setFormattedJson('');
      return;
    }
    try {
      const parsedJson = JSON.parse(jsonInput);
      const indentSpaces = beautify ? parseInt(indentation) : 0;
      const result = JSON.stringify(parsedJson, null, beautify ? indentSpaces : undefined);
      setFormattedJson(result);
      setError('');
      toast({
        title: beautify ? 'JSON Formatted!' : 'JSON Minified!',
        description: beautify ? 'Your JSON data has been successfully beautified.' : 'Your JSON data has been successfully minified.',
        action: <CheckCircle2 className="text-green-500" />,
      });
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      setFormattedJson('');
      toast({
        title: 'Formatting Error',
        description: `Invalid JSON data. ${e.message}`,
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
      toast({ title: 'Copied to Clipboard!', description: `${type} JSON copied.` });
    } catch (err) {
      toast({ title: 'Copy Failed', description: `Could not copy ${type} JSON.`, variant: 'destructive' });
    }
  };

  const handleClear = (field) => {
    if (field === 'input') {
      setJsonInput('');
      if (!formattedJson) setError('');
    } else if (field === 'output') {
      setFormattedJson('');
      if (!jsonInput) setError('');
    } else {
      setJsonInput('');
      setFormattedJson('');
      setError('');
    }
  };

  return (
    <>
      <Helmet>
        <title>JSON Formatter & Beautifier | Toolzenix</title>
        <meta name="description" content="Free online JSON formatter, beautifier, validator, and minifier. Format your JSON data for readability or compress it for efficiency. Works entirely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/json-formatter" />
      </Helmet>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <FileJson className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            JSON Formatter & Beautifier
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Easily format, validate, beautify, or minify your JSON data.
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
                placeholder='Paste your JSON here... e.g., {"name": "Toolzenix", "version": 1.0}'
                className="h-64 sm:h-80 text-sm border-gray-300 dark:border-gray-600 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                aria-label="JSON Input"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="formattedJson" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Output</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(formattedJson, 'Output')} title="Copy Output" disabled={!formattedJson}>
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('output')} title="Clear Output" disabled={!formattedJson}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="formattedJson"
                value={formattedJson}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="h-64 sm:h-80 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
                aria-label="Formatted JSON Output"
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

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Settings2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <Label htmlFor="indentation" className="text-sm font-medium text-gray-700 dark:text-gray-300">Indentation:</Label>
              <Select value={indentation} onValueChange={setIndentation}>
                <SelectTrigger id="indentation" className="w-[100px] text-sm dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Spaces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="tab">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => handleFormat(true)} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Beautify JSON
              </Button>
              <Button onClick={() => handleFormat(false)} variant="outline" className="w-full sm:w-auto border-amber-500 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:text-amber-400 dark:border-amber-600 dark:hover:text-amber-300">
                Minify JSON
              </Button>
            </div>
          </div>
           <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => handleClear('all')} className="text-sm">
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About JSON Formatter & Beautifier</h2>
          <p>This tool helps you format, beautify, validate, and minify JSON (JavaScript Object Notation) data. JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.</p>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Features:</h3>
          <ul>
            <li><strong>Beautify/Format:</strong> Converts compact JSON into a human-readable format with consistent indentation (choose 2 spaces, 4 spaces, or tabs).</li>
            <li><strong>Validate:</strong> Checks if your JSON input is syntactically correct and reports errors if any.</li>
            <li><strong>Minify:</strong> Removes all unnecessary whitespace to create a compact version of your JSON, reducing file size.</li>
            <li><strong>Copy & Clear:</strong> Easily copy input or output to your clipboard, or clear the fields.</li>
            <li><strong>Client-Side Processing:</strong> All operations are performed directly in your browser. Your data is not sent to any server, ensuring privacy and speed.</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">How to Use:</h3>
          <ol>
            <li>Paste your JSON data into the "Input JSON" text area.</li>
            <li>Select your preferred indentation style (2 spaces, 4 spaces, or Tab) for beautification.</li>
            <li>Click the "Beautify JSON" button to format and validate the JSON. The beautified output will appear in the "Output" area.</li>
            <li>Alternatively, click "Minify JSON" to get a compact version without extra whitespace.</li>
            <li>If there are errors in your JSON, they will be displayed below the input/output areas.</li>
            <li>Use the copy buttons to copy the input or output to your clipboard.</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
};

export default JsonFormatter;