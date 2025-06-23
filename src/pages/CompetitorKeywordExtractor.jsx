import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { SearchCode, Copy, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

// Basic stop words list, can be expanded
const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were", "will", "with",
  "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves",
  "she", "her", "hers", "herself", "him", "his", "himself", "they", "them", "their", "theirs", "themselves",
  "what", "which", "who", "whom", "this", "those", "am", "been", "being", "have", "had", "having", "do", "does", "did", "doing",
  "but", "if", "or", "because", "until", "while", "nor", "not", "so", "than", "too", "very", "can", "just", "don", "should", "now",
  "p", "br", "div", "span", "img", "alt", "href", "class", "id", "src", "http", "https", "www", "com", "org", "net", "html", "body", "head", "title", "meta", "script", "style"
]);

const CompetitorKeywordExtractor = () => {
  const [textContent, setTextContent] = useState('');
  const [extractedKeywords, setExtractedKeywords] = useState([]);
  const [minFrequency, setMinFrequency] = useState(2);
  const [maxKeywords, setMaxKeywords] = useState(20);
  const { toast } = useToast();

  const extractKeywords = () => {
    if (!textContent.trim()) {
      toast({ title: "No Content", description: "Please paste some text content to analyze.", variant: "destructive" });
      return;
    }

    // Basic text cleaning: remove HTML tags (simple regex, not foolproof), punctuation, convert to lowercase
    const cleanedText = textContent
      .replace(/<[^>]+>/g, ' ') // Remove HTML tags
      .replace(/[^\w\s'-]|_/g, " ") // Remove punctuation except apostrophes and hyphens within words
      .replace(/\s-\s/g, " ") // Remove standalone hyphens
      .toLowerCase();

    const words = cleanedText.split(/\s+/);
    const wordFrequencies = {};

    words.forEach(word => {
      const trimmedWord = word.replace(/^['-]|['-]$/g, ""); // Trim leading/trailing apostrophes/hyphens
      if (trimmedWord.length > 2 && !stopWords.has(trimmedWord) && isNaN(trimmedWord)) { // Ignore short words, stop words, and numbers
        wordFrequencies[trimmedWord] = (wordFrequencies[trimmedWord] || 0) + 1;
      }
    });

    const sortedKeywords = Object.entries(wordFrequencies)
      .filter(([_, count]) => count >= minFrequency)
      .sort(([, a], [, b]) => b - a) // Sort by frequency descending
      .slice(0, maxKeywords)
      .map(([word, count]) => ({ word, count }));

    setExtractedKeywords(sortedKeywords);
    if (sortedKeywords.length > 0) {
      toast({ title: "Keywords Extracted!", description: `${sortedKeywords.length} keywords found.`, action: <CheckCircle2 className="text-green-500" /> });
    } else {
      toast({ title: "No Significant Keywords", description: "Try adjusting frequency or adding more content.", variant: "default" });
    }
  };

  const handleCopyToClipboard = () => {
    const keywordsText = extractedKeywords.map(kw => kw.word).join(', ');
    if (!keywordsText) {
      toast({ title: "Nothing to Copy", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(keywordsText)
      .then(() => toast({ title: "Copied!", description: "Keywords copied to clipboard." }))
      .catch(() => toast({ title: "Copy Failed", variant: "destructive" }));
  };

  const handleClear = () => {
    setTextContent('');
    setExtractedKeywords([]);
    toast({ title: 'Cleared!', description: 'Input and results cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Competitor Keyword Extractor | Toolzenix Marketing Tools</title>
        <meta name="description" content="Extract potential keywords from competitor website content or any text. Paste text to analyze keyword frequency." />
        <link rel="canonical" href="https://toolzenix.com/competitor-keyword-extractor" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <SearchCode className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Competitor Keyword Extractor
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Paste text content (e.g., from a competitor's page) to identify frequently used terms.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="text-content-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Paste Text Content Here
            </Label>
            <Textarea
              id="text-content-input"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste the full text content from a webpage or document..."
              className="mt-2 min-h-[200px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="min-frequency" className="text-sm font-medium text-gray-700 dark:text-gray-300">Min. Frequency</Label>
              <Input
                id="min-frequency"
                type="number"
                value={minFrequency}
                onChange={(e) => setMinFrequency(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="max-keywords" className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Keywords</Label>
              <Input
                id="max-keywords"
                type="number"
                value={maxKeywords}
                onChange={(e) => setMaxKeywords(Math.max(5, parseInt(e.target.value) || 5))}
                className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={extractKeywords} className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-lg py-3">
              Extract Keywords
            </Button>
            <Button onClick={handleClear} variant="outline" className="flex-1 text-lg py-3 border-gray-300 dark:border-gray-500 dark:text-gray-300">
              <Trash2 className="w-4 h-4 mr-2" /> Clear
            </Button>
          </div>

          {extractedKeywords.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Extracted Keywords:</h2>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} className="text-green-600 dark:text-green-400">
                  <Copy className="w-4 h-4 mr-1.5" /> Copy List
                </Button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                {extractedKeywords.map(({ word, count }) => (
                  <div key={word} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md flex justify-between items-center text-sm">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{word}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full">Count: {count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How This Tool Works</h2>
          <p>
            This tool performs a basic keyword extraction by analyzing the frequency of words in the text you provide. It attempts to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Remove common HTML tags and punctuation.</li>
            <li>Convert all text to lowercase.</li>
            <li>Filter out common "stop words" (like "the", "is", "and") and very short words.</li>
            <li>Count the occurrences of remaining words.</li>
            <li>Display the most frequent words based on your settings.</li>
          </ul>
          <p>
            <strong>Important:</strong> This is a simplified client-side extractor. It does not understand context, semantics, or perform advanced Natural Language Processing (NLP) like sophisticated SEO tools. It's best used for a quick overview of prominent terms in a given text. For in-depth competitor analysis, dedicated SEO software is recommended.
          </p>
          <p className="text-xs">
            <strong>Privacy Note:</strong> All processing happens in your browser. The text content you paste is not sent to any server.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default CompetitorKeywordExtractor;