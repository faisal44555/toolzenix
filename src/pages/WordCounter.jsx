import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (text) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200);

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Word Counter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Count words, characters, sentences, and more in your text.
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
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Words</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.words}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Characters</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.characters}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Characters (no spaces)</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.charactersNoSpaces}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Sentences</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.sentences}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Paragraphs</h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.paragraphs}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Reading Time</h3>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{stats.readingTime} min</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WordCounter;