import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw, BarChart2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WordFrequencyAnalyzer = () => {
  const [text, setText] = useState("");
  const [wordFrequencies, setWordFrequencies] = useState([]);
  const [sortBy, setSortBy] = useState("frequency"); // 'frequency' or 'word'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const { toast } = useToast();

  useEffect(() => {
    if (!text.trim()) {
      setWordFrequencies([]);
      return;
    }

    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    const frequencies = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    let sortedFrequencies = Object.entries(frequencies).map(([word, count]) => ({ word, count }));

    if (sortBy === "frequency") {
      sortedFrequencies.sort((a, b) => sortOrder === "asc" ? a.count - b.count : b.count - a.count);
    } else { // sortBy === "word"
      sortedFrequencies.sort((a, b) => {
        if (a.word < b.word) return sortOrder === "asc" ? -1 : 1;
        if (a.word > b.word) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    
    setWordFrequencies(sortedFrequencies);
  }, [text, sortBy, sortOrder]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
  };

  const handleClear = () => {
    setText("");
    setWordFrequencies([]);
    toast({
      title: "Cleared!",
      description: "Text area has been cleared.",
    });
  };

  const toggleSortOrder = (column) => {
    if (sortBy === column) {
      setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Word Frequency Analyzer
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Analyze the frequency of each word in your text.
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
              Clear Text
            </Button>
          </div>
        </div>

        {wordFrequencies.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Word Frequencies</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th 
                      className="py-2 px-4 cursor-pointer text-gray-700 dark:text-gray-300"
                      onClick={() => toggleSortOrder("word")}
                    >
                      Word {sortBy === "word" && (sortOrder === "asc" ? "▲" : "▼")}
                    </th>
                    <th 
                      className="py-2 px-4 cursor-pointer text-gray-700 dark:text-gray-300"
                      onClick={() => toggleSortOrder("frequency")}
                    >
                      Frequency {sortBy === "frequency" && (sortOrder === "asc" ? "▲" : "▼")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wordFrequencies.map(({ word, count }, index) => (
                    <motion.tr 
                      key={index} 
                      className="border-b dark:border-gray-700 last:border-b-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <td className="py-2 px-4 text-gray-900 dark:text-white">{word}</td>
                      <td className="py-2 px-4 text-gray-900 dark:text-white">{count}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WordFrequencyAnalyzer;