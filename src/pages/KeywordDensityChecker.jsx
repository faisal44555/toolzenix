import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { BarChart3, Search, AlertTriangle, CheckCircle2, Percent } from 'lucide-react';

const KeywordDensityChecker = () => {
  const [textContent, setTextContent] = useState('');
  const [minWordLength, setMinWordLength] = useState(3);
  const [topNKeywords, setTopNKeywords] = useState(10);
  const [densityResults, setDensityResults] = useState(null);
  const { toast } = useToast();

  const commonStopWords = new Set([
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were", "will", "with", "i", "you", "your", "me", "my", "we", "our", "us", "they", "them", "their", "this", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"
  ]);

  const calculateDensity = () => {
    if (!textContent.trim()) {
      toast({ title: 'Input Empty', description: 'Please enter some text to analyze.', variant: 'destructive', action: <AlertTriangle /> });
      setDensityResults(null);
      return;
    }

    const words = textContent
      .toLowerCase()
      .replace(/[^\w\s'-]|(?<!\w)-(?!\w)|(?<!\w)'(?!\w)/g, "") // Remove punctuation, keep hyphens/apostrophes within words
      .split(/\s+/)
      .filter(word => word.length >= minWordLength && !commonStopWords.has(word));
    
    const totalWords = words.length;
    if (totalWords === 0) {
      toast({ title: 'No Keywords Found', description: `No words meeting the criteria (min length ${minWordLength}, not a stop word).`, variant: 'default' });
      setDensityResults({ totalWords: 0, keywordCounts: [], oneWord: [], twoWords: [], threeWords: [] });
      return;
    }

    const keywordCounts = {};
    words.forEach(word => {
      keywordCounts[word] = (keywordCounts[word] || 0) + 1;
    });

    const sortedKeywords = Object.entries(keywordCounts)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: ((count / totalWords) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count);

    // N-grams (simple implementation)
    const getNgrams = (n) => {
      const ngrams = {};
      const cleanWordsForNgram = textContent.toLowerCase().replace(/[^\w\s'-]/g, "").split(/\s+/).filter(word => word.length > 0);
      if (cleanWordsForNgram.length < n) return [];
      for (let i = 0; i <= cleanWordsForNgram.length - n; i++) {
        const ngram = cleanWordsForNgram.slice(i, i + n).join(' ');
        // Filter out ngrams composed entirely of stop words or very short words
        const ngramWords = ngram.split(' ');
        if (ngramWords.every(w => commonStopWords.has(w) || w.length < 2) && ngramWords.length > 1) continue;

        ngrams[ngram] = (ngrams[ngram] || 0) + 1;
      }
      return Object.entries(ngrams)
        .map(([phrase, count]) => ({ phrase, count, density: ((count / (totalWords - (n-1)*Object.keys(ngrams).length)) * 100).toFixed(2) })) // Approximate density
        .sort((a, b) => b.count - a.count)
        .slice(0, topNKeywords);
    };
    
    setDensityResults({
      totalWords,
      keywordCounts: sortedKeywords.slice(0, topNKeywords),
      oneWord: sortedKeywords.slice(0, topNKeywords),
      twoWords: getNgrams(2),
      threeWords: getNgrams(3),
    });
    toast({ title: 'Analysis Complete!', description: 'Keyword density calculated.', action: <CheckCircle2 className="text-green-500" /> });
  };

  return (
    <>
      <Helmet>
        <title>Keyword Density Checker | Toolzenix</title>
        <meta name="description" content="Analyze the keyword density of your text content. Identify most frequent keywords and phrases (1-word, 2-word, 3-word) to optimize for SEO." />
        <link rel="canonical" href="https://toolzenix.com/keyword-density-checker" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <BarChart3 className="w-16 h-16 text-sky-500 dark:text-sky-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Keyword Density Checker
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Analyze your text to find keyword frequencies and optimize for SEO.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="text-content" className="text-lg font-medium text-gray-700 dark:text-gray-300">Paste Your Text Content</Label>
            <Textarea
              id="text-content"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Enter your article, blog post, or any text here..."
              className="mt-2 min-h-[250px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="min-word-length" className="text-sm font-medium text-gray-700 dark:text-gray-300">Min. Word Length</Label>
              <Input type="number" id="min-word-length" value={minWordLength} onChange={(e) => setMinWordLength(Math.max(1, parseInt(e.target.value) || 1))} className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label htmlFor="top-n-keywords" className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Top N Keywords/Phrases</Label>
              <Input type="number" id="top-n-keywords" value={topNKeywords} onChange={(e) => setTopNKeywords(Math.max(1, parseInt(e.target.value) || 1))} className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          </div>

          <Button onClick={calculateDensity} className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white text-lg py-3">
            <Percent className="w-5 h-5 mr-2" /> Calculate Density
          </Button>

          {densityResults && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Density Analysis</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Total words analyzed (after filtering): {densityResults.totalWords}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['oneWord', 'twoWords', 'threeWords'].map((type) => (
                  <div key={type} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 capitalize">
                      {type === 'oneWord' ? '1-Word Keywords' : type === 'twoWords' ? '2-Word Phrases' : '3-Word Phrases'}
                    </h3>
                    {densityResults[type] && densityResults[type].length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {densityResults[type].map((item, index) => (
                          <li key={index} className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                            <span className="truncate max-w-[60%]">{item.keyword || item.phrase}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">({item.count} | {item.density}%)</span>
                          </li>
                        ))}
                      </ul>
                    ) : <p className="text-sm text-gray-500 dark:text-gray-400">No {type.replace('Words', '-word phrases').replace('one', '1')} found.</p>}
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
          className="mt-12 prose dark:prose-invert max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding Keyword Density</h2>
          <p>
            Keyword density refers to the percentage of times a keyword or phrase appears in a piece of text compared to the total number of words. It's one of many factors search engines might consider when determining a page's relevance to a search query.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>This tool helps you identify the most frequently used terms in your content.</li>
            <li>It analyzes single keywords as well as 2-word and 3-word phrases.</li>
            <li>Common "stop words" (like "the", "a", "is") are excluded from single keyword analysis to provide more meaningful results.</li>
            <li>Adjust "Min. Word Length" to filter out very short words from single keyword counts.</li>
          </ul>
          <p><strong>Note:</strong> While keyword density can be a useful metric, focus on creating high-quality, natural-sounding content for your audience. Avoid "keyword stuffing" (overusing keywords), which can harm your SEO.</p>
        </motion.div>
      </div>
    </>
  );
};

export default KeywordDensityChecker;