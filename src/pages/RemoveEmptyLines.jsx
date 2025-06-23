import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw, Link as LinkIcon, Rows } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const RemoveEmptyLines = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setOutputText(inputText.split('\n').filter(line => line.trim() !== '').join('\n'));
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
      description: "Output text copied to clipboard.",
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
        <title>Remove Empty Lines from Text Online | Toolzenix</title>
        <meta name="description" content="Easily remove all blank or empty lines from your text content. Paste your text and get a cleaned-up version instantly. Useful for code, data, and documents." />
        <link rel="canonical" href="https://toolzenix.com/remove-empty-lines" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Remove Empty Lines
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Clean up your text by removing blank lines.
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
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center"><Rows className="w-6 h-6 mr-2 text-blue-500"/>Input Text</h2>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text with empty lines here..."
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
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center"><Rows className="w-6 h-6 mr-2 text-green-500"/>Cleaned Output</h2>
              <textarea
                value={outputText}
                readOnly
                placeholder="Clean text will appear here..."
                className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <Button
                onClick={handleCopyOutput}
                variant="outline"
                className="mt-4 text-gray-700 dark:text-gray-300"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                Copy Output
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
          <h2 className="text-2xl font-semibold">Efficiently Clean Your Text</h2>
          <p>
            The "Remove Empty Lines" tool is designed to help you quickly tidy up text by eliminating all lines that are blank or contain only whitespace. This can be incredibly useful when working with data copied from various sources, cleaning up code, or preparing text for publication or analysis.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol className="list-disc list-inside space-y-1">
            <li><strong>Paste Text:</strong> Copy your text from its source and paste it into the "Input Text" area.</li>
            <li><strong>Automatic Cleaning:</strong> The tool automatically processes the text and removes any empty lines.</li>
            <li><strong>View Output:</strong> The cleaned text, free of empty lines, will appear in the "Cleaned Output" area.</li>
            <li><strong>Copy or Clear:</strong> Use the provided buttons to copy the input or output, or to clear both text areas for a new task.</li>
          </ol>
          <p>
            This utility is particularly handy for developers working with log files, writers editing manuscripts, or anyone dealing with large blocks of text that need formatting. For similar text manipulation, you might also find our <Link to="/remove-duplicate-lines" className="text-blue-600 dark:text-blue-400 hover:underline">Remove Duplicate Lines</Link> tool or the <Link to="/remove-extra-spaces" className="text-blue-600 dark:text-blue-400 hover:underline">Remove Extra Spaces</Link> tool helpful.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default RemoveEmptyLines;