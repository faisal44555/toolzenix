import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Type, RefreshCw, Settings, Pilcrow, List } from 'lucide-react';

const LOREM_IPSUM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsumGenerator = () => {
  const [outputType, setOutputType] = useState('paragraphs'); // paragraphs, words, sentences, listitems
  const [count, setCount] = useState(5);
  const [generatedText, setGeneratedText] = useState('');
  const { toast } = useToast();

  const generateText = () => {
    let result = '';
    const baseWords = LOREM_IPSUM_TEXT.split(' ');
    
    const getRandomSentence = (minWords = 5, maxWords = 15) => {
      const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      let sentenceWords = [];
      for (let i = 0; i < numWords; i++) {
        sentenceWords.push(baseWords[Math.floor(Math.random() * baseWords.length)]);
      }
      let sentence = sentenceWords.join(' ');
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      if (!sentence.endsWith('.') && !sentence.endsWith('?') && !sentence.endsWith('!')) {
        sentence += '.';
      }
      return sentence;
    };

    const getRandomParagraph = (minSentences = 3, maxSentences = 7) => {
      const numSentences = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
      let paragraphSentences = [];
      for (let i = 0; i < numSentences; i++) {
        paragraphSentences.push(getRandomSentence());
      }
      return paragraphSentences.join(' ');
    };

    if (outputType === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        result += getRandomParagraph() + (i < count - 1 ? '\n\n' : '');
      }
    } else if (outputType === 'sentences') {
      for (let i = 0; i < count; i++) {
        result += getRandomSentence() + (i < count - 1 ? ' ' : '');
      }
    } else if (outputType === 'words') {
      let wordsArray = [];
      for (let i = 0; i < count; i++) {
        wordsArray.push(baseWords[Math.floor(Math.random() * baseWords.length)]);
      }
      result = wordsArray.join(' ');
    } else if (outputType === 'listitems') {
      for (let i = 0; i < count; i++) {
        result += `- ${getRandomSentence(3, 8)}\n`;
      }
    }
    setGeneratedText(result);
  };

  useEffect(() => {
    generateText();
  }, [outputType, count]);

  const handleCopyToClipboard = () => {
    if (!generatedText) {
      toast({ title: 'Nothing to Copy', description: 'No text generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(generatedText)
      .then(() => toast({ title: 'Copied!', description: 'Lorem Ipsum text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy text.', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Lorem Ipsum Generator | Toolzenix</title>
        <meta name="description" content="Generate Lorem Ipsum placeholder text for your design mockups and layouts. Choose paragraphs, sentences, words, or list items." />
        <link rel="canonical" href="https://toolzenix.com/lorem-ipsum-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Lorem Ipsum Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Generate placeholder text for your design mockups and layouts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-blue-500" /> Options
            </h2>
            
            <div>
              <Label htmlFor="output-type" className="text-sm font-medium text-gray-700 dark:text-gray-300">Generate</Label>
              <Select value={outputType} onValueChange={setOutputType}>
                <SelectTrigger id="output-type" className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraphs"><Pilcrow className="inline-block w-4 h-4 mr-2" />Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="listitems"><List className="inline-block w-4 h-4 mr-2" />List Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="count" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of {outputType.replace('listitems', 'list items')}:
              </Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)))}
                className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            <Button onClick={generateText} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <Type className="w-6 h-6 mr-2 text-green-500" /> Generated Text
              </h2>
              <Button onClick={handleCopyToClipboard} variant="outline" size="sm" disabled={!generatedText}>
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
            </div>
            <Textarea
              value={generatedText}
              readOnly
              placeholder="Generated Lorem Ipsum text will appear here..."
              className="min-h-[300px] text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 dark:text-gray-200 focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600"
              aria-label="Generated Lorem Ipsum Text"
            />
          </motion.div>
        </div>

        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">What is Lorem Ipsum?</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Select what you want to generate: paragraphs, sentences, words, or list items.</li>
            <li>Specify the quantity you need.</li>
            <li>The placeholder text will be generated automatically. Click "Regenerate" for a new set.</li>
            <li>Click the "Copy" button to copy the generated text to your clipboard.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default LoremIpsumGenerator;