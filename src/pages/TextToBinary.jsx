import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw, Binary, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TextToBinary = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const textToBinary = (text) => {
    return text.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  };

  useEffect(() => {
    setOutputText(textToBinary(inputText));
  }, [inputText]);

  const handleCopyInput = () => {
    navigator.clipboard.writeText(inputText);
    toast({
      title: "Copied!",
      description: "Input text copied to clipboard.",
    });
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Binary output copied to clipboard.",
    });
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    toast({
      title: "Cleared!",
      description: "Text areas have been cleared.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Text to Binary Converter - Encode Text to 0s and 1s | Toolzenix</title>
        <meta name="description" content="Convert plain text into binary code (0s and 1s) instantly. Easy-to-use online tool for encoding text to its binary representation." />
        <link rel="canonical" href="https://toolzenix.com/text-to-binary" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Text to Binary Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert your text into binary code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Input Text</h2>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <Button
                onClick={handleCopyInput}
                variant="outline"
                className="mt-4 text-gray-700 dark:text-gray-300"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                Copy Input
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Binary Output</h2>
              <textarea
                value={outputText}
                readOnly
                placeholder="Binary code will appear here..."
                className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono"
              />
              <Button
                onClick={handleCopyOutput}
                variant="outline"
                className="mt-4 text-gray-700 dark:text-gray-300"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                Copy Binary
              </Button>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={handleClear}
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding Text to Binary Conversion</h2>
          <p>
            This Text to Binary Converter translates standard text characters into their binary (base-2) representation. Each character in your input text is converted into an 8-bit binary code based on its ASCII or Unicode value. The binary codes for each character are typically separated by a space for readability.
          </p>
          <h3 className="text-xl font-semibold">How It Works:</h3>
          <ol className="list-disc list-inside space-y-1">
            <li><strong>Enter Text:</strong> Type or paste the text you wish to convert into the "Input Text" area.</li>
            <li><strong>Automatic Conversion:</strong> The tool instantly converts your text into binary code as you type.</li>
            <li><strong>View Output:</strong> The binary representation appears in the "Binary Output" area. Each character is shown as an 8-digit binary number (e.g., 'A' becomes '01000001').</li>
            <li><strong>Copy or Clear:</strong> Use the buttons to copy the input/output or clear the fields.</li>
          </ol>
          <p>
            Binary code is the fundamental language of computers. This tool can be useful for educational purposes, understanding data representation, or for specific encoding tasks. If you need to convert binary back to text, use our <Link to="/binary-to-text" className="text-blue-600 dark:text-blue-400 hover:underline">Binary to Text Converter</Link>.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default TextToBinary;