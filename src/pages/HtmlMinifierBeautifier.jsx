import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileCode2, Copy, Trash2, AlertTriangle, CheckCircle2, Settings2, Wand2, Minimize2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { html_beautify as htmlBeautify, css_beautify as cssBeautify, js_beautify as jsBeautify } from 'js-beautify';

const HtmlMinifierBeautifier = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [processedHtml, setProcessedHtml] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Basic HTML Minifier - more advanced minification would require a more robust library or server-side processing
  const minifyHtml = (htmlString) => {
    let minified = htmlString
      .replace(/\n\s*\n/g, '\n') // remove multiple blank lines
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .replace(/>\s+</g, '><') // remove whitespace between tags
      .replace(/\s+/g, ' ') // collapse multiple whitespaces
      .trim();
    return minified;
  };

  const handleProcess = (action) => {
    if (!htmlInput.trim()) {
      setError('Input HTML is empty.');
      setProcessedHtml('');
      return;
    }
    try {
      let result;
      if (action === 'beautify') {
        result = htmlBeautify(htmlInput, {
          indent_size: 2,
          space_in_empty_paren: true,
          preserve_newlines: true,
          max_preserve_newlines: 2,
        });
        toast({
          title: 'HTML Beautified!',
          description: 'HTML code has been successfully formatted.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      } else { // minify
        result = minifyHtml(htmlInput);
        toast({
          title: 'HTML Minified!',
          description: 'HTML code has been successfully minified.',
          action: <CheckCircle2 className="text-green-500" />,
        });
      }
      setProcessedHtml(result);
      setError('');
    } catch (e) {
      setError(`Processing Error: ${e.message}`);
      setProcessedHtml('');
      toast({
        title: 'Processing Failed',
        description: `Could not process HTML. ${e.message}`,
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
      toast({ title: 'Copied to Clipboard!', description: `${type} HTML copied.` });
    } catch (err) {
      toast({ title: 'Copy Failed', description: `Could not copy ${type} HTML.`, variant: 'destructive' });
    }
  };

  const handleClear = (field) => {
    if (field === 'input') setHtmlInput('');
    else if (field === 'output') setProcessedHtml('');
    else {
      setHtmlInput('');
      setProcessedHtml('');
    }
    if (!htmlInput && !processedHtml) setError('');
  };

  return (
    <>
      <Helmet>
        <title>HTML Minifier & Beautifier | Toolzenix</title>
        <meta name="description" content="Free online HTML minifier and beautifier. Clean up, format, or compress your HTML code for readability or performance. Works entirely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/html-minifier-beautifier" />
      </Helmet>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <FileCode2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            HTML Minifier & Beautifier
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Easily format, beautify, or minify your HTML code.
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
                <Label htmlFor="htmlInput" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Input HTML</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(htmlInput, 'Input')} title="Copy Input">
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('input')} title="Clear Input">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="htmlInput"
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder='Paste your HTML code here...'
                className="h-64 sm:h-80 text-sm font-mono border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                aria-label="HTML Input"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="processedHtml" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Output HTML</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(processedHtml, 'Output')} title="Copy Output" disabled={!processedHtml}>
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleClear('output')} title="Clear Output" disabled={!processedHtml}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="processedHtml"
                value={processedHtml}
                readOnly
                placeholder="Processed HTML will appear here..."
                className="h-64 sm:h-80 text-sm font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
                aria-label="Processed HTML Output"
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

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
            <Button onClick={() => handleProcess('beautify')} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white">
              <Wand2 className="w-5 h-5 mr-2" /> Beautify HTML
            </Button>
            <Button onClick={() => handleProcess('minify')} variant="outline" className="w-full sm:w-auto border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:text-green-400 dark:border-green-600 dark:hover:text-green-300">
              <Minimize2 className="w-5 h-5 mr-2" /> Minify HTML
            </Button>
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About HTML Minifier & Beautifier</h2>
          <p>This tool helps you to either beautify (format for readability) or minify (compress for size) your HTML code. Clean and well-formatted HTML is easier to read and maintain, while minified HTML can improve website loading times.</p>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Features:</h3>
          <ul>
            <li><strong>Beautify:</strong> Indents your HTML code properly, making it structured and easy to follow. Uses standard indentation options.</li>
            <li><strong>Minify:</strong> Removes unnecessary whitespace, comments, and line breaks from your HTML code to reduce its file size. (Note: This is a basic minifier; for complex optimization, dedicated build tools might be better).</li>
            <li><strong>Client-Side Processing:</strong> All operations are performed directly in your browser. Your HTML code is not sent to any server.</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">How to Use:</h3>
          <ol>
            <li>Paste your HTML code into the "Input HTML" text area.</li>
            <li>Click the "Beautify HTML" button to format the code or "Minify HTML" to compress it.</li>
            <li>The processed HTML will appear in the "Output HTML" area.</li>
            <li>Use the copy and clear buttons as needed.</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
};

export default HtmlMinifierBeautifier;