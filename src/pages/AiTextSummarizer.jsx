import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { BookText, Zap, Copy, Trash2, Percent } from 'lucide-react';
import nlp from 'compromise';
// compromise-sentences is typically part of the core or loaded via plugins.
// We will rely on the core capabilities of 'compromise' for sentence detection.

const AiTextSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState(30); // Percentage
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setSummary(''); 
  };

  const summarizeText = () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some text to summarize.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary('');

    setTimeout(() => {
      try {
        const doc = nlp(inputText);
        let sentences = doc.sentences().out('array');
        
        if (sentences.length === 0) {
          setSummary("No sentences found to summarize.");
          setIsLoading(false);
          return;
        }

        // Simple summarization: pick top N sentences based on length or keywords (very basic)
        // A more advanced approach would use TF-IDF, sentence scoring, etc.
        // For this example, we'll sort by length and pick a percentage.
        sentences.sort((a, b) => b.length - a.length); 
        
        const numSentencesToPick = Math.max(1, Math.ceil(sentences.length * (summaryLength / 100)));
        const topSentences = sentences.slice(0, numSentencesToPick);

        // Try to maintain original order for readability
        const originalOrderSentences = nlp(inputText).sentences().out('array');
        const finalSummarySentences = originalOrderSentences.filter(s => topSentences.includes(s));
        
        setSummary(finalSummarySentences.join(' ').trim() || "Could not generate a summary with the current settings.");
        
        toast({
          title: 'Summary Generated!',
          description: `Summary created with approximately ${summaryLength}% of original sentences.`,
        });

      } catch (error) {
        console.error("Error during summarization:", error);
        setSummary('Failed to generate summary due to an error.');
        toast({
          title: 'Error',
          description: 'An unexpected error occurred during summarization.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }, 500); 
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'Text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy text.', variant: 'destructive' }));
  };

  const clearText = () => {
    setInputText('');
    setSummary('');
    toast({ title: 'Text Cleared', description: 'Input and summary have been cleared.'});
  };

  return (
    <>
      <Helmet>
        <title>AI Text Summarizer | Toolzenix</title>
        <meta name="description" content="Summarize long texts into concise versions using AI. Get the gist of articles, papers, or documents quickly." />
        <link rel="canonical" href="https://toolzenix.com/ai-text-summarizer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <BookText className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            AI Text Summarizer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Condense long texts into shorter, easy-to-read summaries.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <label htmlFor="inputTextSummarizer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter Text to Summarize
            </label>
            <Textarea
              id="inputTextSummarizer"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste your long text, article, or document here..."
              className="min-h-[200px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={8}
            />
             <div className="mt-2 flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(inputText)} disabled={!inputText} title="Copy original text">
                    <Copy size={16} className="mr-1" /> Copy Input
                </Button>
                <Button variant="ghost" size="sm" onClick={clearText} disabled={!inputText && !summary} title="Clear input and summary">
                    <Trash2 size={16} className="mr-1" /> Clear
                </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summaryLengthSlider" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <Percent size={16} className="mr-2 text-indigo-500"/> Summary Length: {summaryLength}%
            </Label>
            <Slider
              id="summaryLengthSlider"
              min={10}
              max={70}
              step={5}
              value={[summaryLength]}
              onValueChange={(value) => setSummaryLength(value[0])}
              className="w-full"
              aria-label="Summary length percentage"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Adjust the desired length of the summary (percentage of original sentences).</p>
          </div>

          <Button
            onClick={summarizeText}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 text-lg flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Zap size={22} className="mr-2" />
              </motion.div>
            ) : (
              <Zap size={22} className="mr-2" />
            )}
            Summarize Text
          </Button>

          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Generated Summary:</h3>
              <Textarea
                value={summary}
                readOnly
                className="min-h-[150px] bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600"
                rows={6}
              />
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(summary)} className="mt-1">
                <Copy size={16} className="mr-1" /> Copy Summary
              </Button>
            </motion.div>
          )}
        </motion.div>
         <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Note: This AI summarizer provides a basic overview. Complex topics may require more nuanced summarization.
        </p>
      </div>
    </>
  );
};

export default AiTextSummarizer;