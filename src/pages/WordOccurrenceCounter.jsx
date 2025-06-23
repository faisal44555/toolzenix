import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, RefreshCw, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WordOccurrenceCounter = () => {
  const [text, setText] = useState("");
  const [wordToFind, setWordToFind] = useState("");
  const [occurrences, setOccurrences] = useState(0);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!text.trim() || !wordToFind.trim()) {
      setOccurrences(0);
      return;
    }

    const flags = caseSensitive ? "g" : "gi";
    const regex = new RegExp(`\\b${wordToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, flags);
    const matches = text.match(regex);
    setOccurrences(matches ? matches.length : 0);
  }, [text, wordToFind, caseSensitive]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
  };

  const handleClear = () => {
    setText("");
    setWordToFind("");
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
          Word Occurrence Counter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Count how many times a specific word appears in your text.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input
              value={wordToFind}
              onChange={(e) => setWordToFind(e.target.value)}
              placeholder="Word to find..."
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="caseSensitive"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="caseSensitive" className="text-sm text-gray-700 dark:text-gray-300">
                Case Sensitive
              </label>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between mt-4">
            <Button
              onClick={handleCopyText}
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Copy Text
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
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Occurrences of "{wordToFind || '...'}"</h3>
          <p className="text-5xl font-bold text-blue-500 dark:text-blue-400">{occurrences}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default WordOccurrenceCounter;