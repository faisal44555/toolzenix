import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tags, Search, Copy, Trash2 } from 'lucide-react';
import nlp from 'compromise';
// compromise-topics is useful for more advanced keyword/topic extraction
// For now, we'll use core noun/adjective extraction.

const AiKeywordExtractor = () => {
  const [inputText, setInputText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [keywordCount, setKeywordCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setKeywords([]);
  };

  const extractKeywords = () => {
    if (!inputText.trim()) {
      toast({ title: 'Input Required', description: 'Please enter some text to extract keywords from.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setKeywords([]);

    setTimeout(() => {
      try {
        const doc = nlp(inputText);
        // Extract nouns and adjectives as potential keywords
        let potentialKeywords = doc.nouns().out('terms').map(t => t.normal);
        potentialKeywords = potentialKeywords.concat(doc.adjectives().out('terms').map(t => t.normal));
        
        // Simple frequency count
        const counts = {};
        potentialKeywords.forEach(kw => {
          if (kw.length > 2) { // Ignore very short words
            counts[kw] = (counts[kw] || 0) + 1;
          }
        });
        
        const sortedKeywords = Object.entries(counts)
          .sort(([,a],[,b]) => b-a)
          .map(([word]) => word);

        setKeywords(sortedKeywords.slice(0, keywordCount));
        toast({ title: 'Keywords Extracted!', description: `Found ${sortedKeywords.slice(0, keywordCount).length} keywords.` });
      } catch (error) {
        console.error("Error extracting keywords:", error);
        toast({ title: 'Extraction Error', description: 'Could not extract keywords.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };
  
  const copyToClipboard = (textArray) => {
    const text = textArray.join(', ');
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'Keywords copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy keywords.', variant: 'destructive' }));
  };

  const clearText = () => {
    setInputText('');
    setKeywords([]);
    toast({ title: 'Text Cleared', description: 'Input and keywords have been cleared.'});
  };

  return (
    <>
      <Helmet>
        <title>AI Keyword Extractor | Toolzenix</title>
        <meta name="description" content="Extract the most relevant keywords and topics from your text using AI. Useful for SEO and content analysis." />
        <link rel="canonical" href="https://toolzenix.com/ai-keyword-extractor" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Tags className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">AI Keyword Extractor</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Identify the main topics and keywords in your text content.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div>
            <Label htmlFor="keywordInputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter Text</Label>
            <Textarea
              id="keywordInputText"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste your article, blog post, or any text here..."
              className="min-h-[200px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={8}
            />
            <div className="mt-2 flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(inputText.split(/\s+/).filter(Boolean))} disabled={!inputText} title="Copy input text">
                    <Copy size={16} className="mr-1" /> Copy Input
                </Button>
                <Button variant="ghost" size="sm" onClick={clearText} disabled={!inputText && keywords.length === 0} title="Clear input and keywords">
                    <Trash2 size={16} className="mr-1" /> Clear
                </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywordCountSlider" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Keywords to Extract: {keywordCount}
            </Label>
            <Slider
              id="keywordCountSlider"
              min={5}
              max={30}
              step={1}
              value={[keywordCount]}
              onValueChange={(value) => setKeywordCount(value[0])}
              className="w-full"
            />
          </div>

          <Button onClick={extractKeywords} disabled={isLoading || !inputText.trim()} className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white py-3 text-lg">
            {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Search size={22} className="mr-2" /></motion.div> : <Search size={22} className="mr-2" />}
            Extract Keywords
          </Button>

          {keywords.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Extracted Keywords:</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw, i) => (
                  <span key={i} className="bg-teal-100 text-teal-800 dark:bg-teal-700 dark:text-teal-100 px-3 py-1.5 text-sm rounded-full shadow-sm">
                    {kw}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(keywords)} className="mt-2 dark:text-teal-300 dark:border-teal-500 dark:hover:bg-teal-500/10">
                <Copy size={16} className="mr-2" /> Copy Keywords
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AiKeywordExtractor;