import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Type, FileText, Trash2, BarChartBig } from 'lucide-react';

const CharacterByteCounter = () => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [byteCount, setByteCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    setCharCount(text.length);
    setByteCount(new TextEncoder().encode(text).length);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setLineCount(text ? text.split('\n').length : 0);
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleClearText = () => {
    setText('');
    toast({ title: 'Cleared!', description: 'Text area cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Character, Word & Byte Counter | Toolzenix</title>
        <meta name="description" content="Count characters, words, lines, and UTF-8 bytes in your text. Useful for text analysis, SMS limits, and data size estimation." />
        <link rel="canonical" href="https://toolzenix.com/character-byte-counter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Character, Word & Byte Counter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Analyze your text by counting characters, words, lines, and UTF-8 bytes.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <Label htmlFor="text-input" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Enter Your Text</Label>
          <Textarea
            id="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
            className="min-h-[250px] text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleClearText} variant="destructive" size="sm" disabled={!text}>
              <Trash2 className="w-4 h-4 mr-2" /> Clear Text
            </Button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{charCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Characters</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{wordCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Words</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{lineCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lines</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{byteCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">UTF-8 Bytes</p>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 prose dark:prose-invert max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">Understanding the Counts</h2>
          <ul>
            <li><strong>Characters:</strong> Total number of individual characters, including spaces and punctuation.</li>
            <li><strong>Words:</strong> Total number of words, typically separated by spaces or punctuation.</li>
            <li><strong>Lines:</strong> Total number of lines, separated by newline characters.</li>
            <li><strong>UTF-8 Bytes:</strong> The size of the text in bytes when encoded using UTF-8. This is important for data storage and transmission, as different characters can take up different numbers of bytes (e.g., 'a' is 1 byte, '€' is 3 bytes in UTF-8).</li>
          </ul>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Type or paste your text into the text area.</li>
            <li>The counts for characters, words, lines, and UTF-8 bytes will update automatically as you type.</li>
            <li>Click "Clear Text" to empty the text area and reset the counts.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default CharacterByteCounter;