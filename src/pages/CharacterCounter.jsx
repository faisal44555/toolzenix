import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const CharacterCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    noSpaces: 0,
    letters: 0,
    numbers: 0,
    spaces: 0,
    specialChars: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (text) => {
    setStats({
      total: text.length,
      noSpaces: text.replace(/\s/g, "").length,
      letters: (text.match(/[a-zA-Z]/g) || []).length,
      numbers: (text.match(/[0-9]/g) || []).length,
      spaces: (text.match(/\s/g) || []).length,
      specialChars: (text.match(/[^a-zA-Z0-9\s]/g) || []).length,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
  };

  const handleClear = () => {
    setText("");
    toast({
      title: "Cleared!",
      description: "Text has been cleared.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Character Counter - Count Letters, Numbers & Special Characters | Toolzenix</title>
        <meta name="description" content="Count characters, letters, numbers, spaces, and special characters in your text instantly with our free online character counter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Character Counter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Count characters, letters, numbers, and special characters in your text.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between mt-4">
            <Button
              onClick={handleCopy}
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
              Clear Text
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Characters</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Characters (no spaces)</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.noSpaces}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Letters</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.letters}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Numbers</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.numbers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Spaces</h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.spaces}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Special Characters</h3>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{stats.specialChars}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Type or paste your text into the text area.</li>
          <li>The character statistics (total, no spaces, letters, numbers, spaces, special characters) will update automatically.</li>
          <li>Use the "Copy Text" button to copy your input.</li>
          <li>Use the "Clear Text" button to reset the input field.</li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterCounter;