import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const FindAndReplace = () => {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [occurrences, setOccurrences] = useState(0);
  const { toast } = useToast();

  const handleReplace = () => {
    if (!findText) {
      toast({
        title: "Error",
        description: "Please enter text to find.",
        variant: "destructive",
      });
      return;
    }

    const regex = new RegExp(findText, "g");
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    const replaced = text.replace(regex, replaceText);
    
    setOutputText(replaced);
    setOccurrences(count);
    
    toast({
      title: "Replaced!",
      description: `Found and replaced ${count} occurrence${count !== 1 ? 's' : ''}.`,
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
    setText("");
    setFindText("");
    setReplaceText("");
    setOutputText("");
    setOccurrences(0);
    toast({
      title: "Cleared!",
      description: "All fields have been cleared.",
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
          Find and Replace
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Search and replace text in your content.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Input
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Text to find..."
              className="w-full"
            />
            <Input
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replace with..."
              className="w-full"
            />
            <Button
              onClick={handleReplace}
              className="w-full"
            >
              <Search className="w-4 h-4 mr-2" />
              Find and Replace
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Found Occurrences: <span className="text-blue-500">{occurrences}</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Input</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Output</h2>
            <textarea
              value={outputText}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleCopyOutput}
            variant="outline"
            className="text-gray-700 dark:text-gray-300"
          >
            <Clipboard className="w-4 h-4 mr-2" />
            Copy Output
          </Button>
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

export default FindAndReplace;