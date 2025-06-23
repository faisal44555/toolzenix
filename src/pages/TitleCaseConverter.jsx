import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw, Heading1 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TitleCaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  useEffect(() => {
    setOutputText(toTitleCase(inputText));
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Title Case Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your text to title case (capitalize the first letter of each word).
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Input</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Output (Title Case)</h2>
            <textarea
              value={outputText}
              readOnly
              placeholder="Title case text will appear here..."
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
    </div>
  );
};

export default TitleCaseConverter;