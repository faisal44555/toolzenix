import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link2, Copy, Trash2, ArrowRightLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UrlEncoderDecoder = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionMode, setConversionMode] = useState('encode'); // 'encode' or 'decode'
  const [componentMode, setComponentMode] = useState('full'); // 'full' or 'component' for encodeURI / encodeURIComponent
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleConvert = () => {
    if (!inputText.trim()) {
      setError('Input is empty. Please enter some text or URL.');
      setOutputText('');
      return;
    }
    setError('');
    try {
      if (conversionMode === 'encode') {
        const encoded = componentMode === 'full' ? encodeURI(inputText) : encodeURIComponent(inputText);
        setOutputText(encoded);
        toast({
          title: 'URL Encoded!',
          description: `Text successfully URL encoded (${componentMode} mode).`,
          action: <CheckCircle2 className="text-green-500" />,
        });
      } else {
        const decoded = componentMode === 'full' ? decodeURI(inputText) : decodeURIComponent(inputText);
        setOutputText(decoded);
        toast({
          title: 'URL Decoded!',
          description: `Text successfully URL decoded (${componentMode} mode).`,
          action: <CheckCircle2 className="text-green-500" />,
        });
      }
    } catch (e) {
      const errorMessage = `Error during URL ${conversionMode}. Invalid input or malformed URI sequence.`;
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
    if (field === 'input') setInputText('');
    else if (field === 'output') setOutputText('');
    else {
      setInputText('');
      setOutputText('');
    }
    if (!inputText && !outputText) setError('');
  };

  const switchModes = () => {
    setConversionMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInputText(outputText); // Swap content
    setOutputText(inputText);
    setError('');
  };

  return (
    <>
      <Helmet>
        <title>URL Encoder & Decoder | Toolzenix</title>
        <meta name="description" content="Free online URL encoder and decoder. Convert URLs and text for safe use in query strings and web addresses. Supports full URL and component encoding/decoding." />
        <link rel="canonical" href="https://toolzenix.com/url-encoder-decoder" />
      </Helmet>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Link2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            URL Encoder & Decoder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Encode or decode URLs and text for web-safe transmission.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="conversionMode" className="text-md font-medium text-gray-700 dark:text-gray-300">Operation:</Label>
              <Select value={conversionMode} onValueChange={setConversionMode}>
                <SelectTrigger id="conversionMode" className="w-full dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Encode URL/Text</SelectItem>
                  <SelectItem value="decode">Decode URL/Text</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="componentMode" className="text-md font-medium text-gray-700 dark:text-gray-300">Encoding Type:</Label>
              <Select value={componentMode} onValueChange={setComponentMode} disabled={conversionMode === 'decode' && componentMode === 'component'}>
                <SelectTrigger id="componentMode" className="w-full dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full URL (encodeURI / decodeURI)</SelectItem>
                  <SelectItem value="component">URL Component (encodeURIComponent / decodeURIComponent)</SelectItem>
                </SelectContent>
              </Select>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Use "URL Component" for query parameters. "Full URL" for entire URLs.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 items-center gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="inputText" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Input</Label>
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
                placeholder={conversionMode === 'encode' ? 'Enter URL or text to encode... e.g., https://toolzenix.com/?query=example text' : 'Enter encoded URL or text to decode...'}
                className="h-48 sm:h-56 text-sm border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                aria-label="Input for URL encoding/decoding"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 my-2">
              <Button onClick={handleConvert} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white py-3 px-6 text-base">
                {conversionMode === 'encode' ? 'Encode' : 'Decode'}
                <ArrowRightLeft className="w-5 h-5 ml-2 hidden sm:inline" />
              </Button>
              <Button onClick={switchModes} variant="outline" className="w-full sm:w-auto" title="Switch Input/Output & Mode">
                 <ArrowRightLeft className="w-5 h-5 mr-2 sm:mr-0" /> <span className="sm:hidden">Switch Mode & Content</span>
              </Button>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="outputText" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Output</Label>
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
                placeholder={conversionMode === 'encode' ? 'Encoded URL/text will appear here...' : 'Decoded URL/text will appear here...'}
                className="h-48 sm:h-56 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-white"
                aria-label="Output of URL encoding/decoding"
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About URL Encoder & Decoder</h2>
          <p>URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI) under certain circumstances. This tool allows you to encode and decode strings or full URLs to ensure they are safely transmitted and interpreted by web servers and browsers.</p>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Features:</h3>
          <ul>
            <li><strong>Encode:</strong> Converts unsafe characters in a string or URL into their percent-encoded equivalents (e.g., space becomes %20).</li>
            <li><strong>Decode:</strong> Converts percent-encoded characters back to their original representation.</li>
            <li><strong>Two Modes:</strong>
                <ul>
                    <li><strong>Full URL (encodeURI/decodeURI):</strong> Use this for encoding or decoding an entire URL. It assumes the input is a complete URI and will not encode characters that have special meaning in a URI (like :, /, ?, &, =, #).</li>
                    <li><strong>URL Component (encodeURIComponent/decodeURIComponent):</strong> Use this for encoding or decoding a segment of a URI, such as a query string parameter value. This mode will encode more characters, including those with special meaning in URIs.</li>
                </ul>
            </li>
            <li><strong>Client-Side Operation:</strong> All processing is done in your browser. Your data is not sent to any server.</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">How to Use:</h3>
          <ol>
            <li>Select the operation: "Encode" or "Decode".</li>
            <li>Select the "Encoding Type": "Full URL" or "URL Component". Choose "URL Component" if you are encoding/decoding a part of a URL, like a query parameter.</li>
            <li>Paste your URL or text into the "Input" area.</li>
            <li>Click the "Encode" or "Decode" button.</li>
            <li>The result will appear in the "Output" area.</li>
            <li>Use the copy and clear buttons as needed. The switch button swaps content and mode.</li>
          </ol>
          <p>For example, if you want to pass the string "hello world" as a query parameter, you should use "URL Component" encoding, which would result in "hello%20world". If you are encoding a full URL that might contain spaces or special characters in its path, you might use "Full URL" encoding.</p>
        </motion.div>
      </div>
    </>
  );
};

export default UrlEncoderDecoder;