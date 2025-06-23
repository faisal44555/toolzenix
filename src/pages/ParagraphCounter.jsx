import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ParagraphCounter = () => {
  const [text, setText] = useState("");
  const [paragraphCount, setParagraphCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
    setParagraphCount(paragraphs);
  }, [text]);

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
          Paragraph Counter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Count the number of paragraphs in your text.
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

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Paragraphs</h3>
          <p className="text-5xl font-bold text-yellow-500 dark:text-yellow-400">{paragraphCount}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ParagraphCounter;