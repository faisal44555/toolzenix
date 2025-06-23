import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw, Binary } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const BinaryToText = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const binaryToText = (binary) => {
    try {
      const cleanBinary = binary.replace(/[^01\s]/g, "");
      return cleanBinary.split(/\s+/).filter(bin => bin.length > 0).map(bin => {
        if (bin.length !== 8 && bin.length !== 0) {
          throw new Error("Invalid binary format: Each binary group must be 8 bits long.");
        }
        return String.fromCharCode(parseInt(bin, 2));
      }).join("");
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    setOutputText(binaryToText(inputText));
  }, [inputText]);

  const handleCopyInput = () => {
    navigator.clipboard.writeText(inputText);
    toast({
      title: "Copied!",
      description: "Binary input copied to clipboard.",
    });
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Text output copied to clipboard.",
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
      <Helmet>
        <title>Binary to Text Converter | Toolzenix</title>
        <meta name="description" content="Convert binary code (8-bit groups) back into readable text with our free online Binary to Text converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Binary className="w-10 h-10 mr-3 text-violet-500" /> Binary to Text Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert binary code back into readable text.
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Binary Input</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter binary code (8 bits separated by spaces)..."
              className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
            />
            <Button
              onClick={handleCopyInput}
              variant="outline"
              className="mt-4 text-gray-700 dark:text-gray-300"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Copy Binary
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Text Output</h2>
            <textarea
              value={outputText}
              readOnly
              placeholder="Converted text will appear here..."
              className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <Button
              onClick={handleCopyOutput}
              variant="outline"
              className="mt-4 text-gray-700 dark:text-gray-300"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Copy Text
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

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Enter or paste your binary code into the "Binary Input" area.</li>
          <li>Ensure binary groups are 8 bits long and separated by spaces (e.g., 01001000 01100101 01101100 01101100 01101111).</li>
          <li>The converted text will automatically appear in the "Text Output" area.</li>
          <li>Use the "Copy" buttons to copy input or output, and "Clear All" to reset.</li>
        </ul>
      </div>
    </div>
  );
};

export default BinaryToText;