import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Smile, Frown, Meh, Search, Copy, Trash2 } from 'lucide-react';
import nlp from 'compromise';


const AiSentimentAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setSentimentResult(null);
  };

  const analyzeSentiment = () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some text to analyze its sentiment.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSentimentResult(null);

    setTimeout(() => {
      try {
        const doc = nlp(inputText);
        
        if (!doc.sentiment) {
          console.error("Sentiment plugin not loaded on compromise object.");
          toast({
            title: 'Error',
            description: 'Sentiment analysis functionality is not available. Please check console.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        
        const sentiment = doc.sentiment(); 
        
        let overallSentiment = 'Neutral';
        let IconComponent = Meh;
        let colorClass = 'text-gray-500 dark:text-gray-400';

        if (sentiment.score > 0.3) { 
          overallSentiment = 'Positive';
          IconComponent = Smile;
          colorClass = 'text-green-500 dark:text-green-400';
        } else if (sentiment.score < -0.3) {
          overallSentiment = 'Negative';
          IconComponent = Frown;
          colorClass = 'text-red-500 dark:text-red-400';
        }
        
        setSentimentResult({
          overall: overallSentiment,
          score: sentiment.score.toFixed(2),
          comparative: sentiment.comparative.toFixed(2),
          positiveWords: sentiment.positive && sentiment.positive.length > 0 ? sentiment.positive.join(', ') : 'None',
          negativeWords: sentiment.negative && sentiment.negative.length > 0 ? sentiment.negative.join(', ') : 'None',
          Icon: IconComponent,
          color: colorClass,
        });

        toast({
          title: 'Sentiment Analyzed!',
          description: `The overall sentiment appears to be ${overallSentiment.toLowerCase()}.`,
        });

      } catch (error) {
        console.error("Error during sentiment analysis:", error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred during sentiment analysis.',
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
    setSentimentResult(null);
    toast({ title: 'Text Cleared', description: 'Input and results have been cleared.'});
  };

  return (
    <>
      <Helmet>
        <title>AI Sentiment Analyzer | Toolzenix</title>
        <meta name="description" content="Analyze the sentiment of your text. Determine if it's positive, negative, or neutral with our AI-powered tool." />
        <link rel="canonical" href="https://toolzenix.com/ai-sentiment-analyzer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Smile className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            AI Sentiment Analyzer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Understand the emotional tone behind text data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <label htmlFor="sentimentInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter Text to Analyze
            </label>
            <Textarea
              id="sentimentInput"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste your text here to find out its sentiment..."
              className="min-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={6}
            />
            <div className="mt-2 flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(inputText)} disabled={!inputText} title="Copy input text">
                    <Copy size={16} className="mr-1" /> Copy Input
                </Button>
                <Button variant="ghost" size="sm" onClick={clearText} disabled={!inputText && !sentimentResult} title="Clear input and results">
                    <Trash2 size={16} className="mr-1" /> Clear
                </Button>
            </div>
          </div>

          <Button
            onClick={analyzeSentiment}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white py-3 text-lg flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Search size={22} className="mr-2" />
              </motion.div>
            ) : (
              <Search size={22} className="mr-2" />
            )}
            Analyze Sentiment
          </Button>

          {sentimentResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Sentiment Analysis:</h3>
              <div className={`flex items-center justify-center p-6 rounded-lg bg-opacity-10 ${
                sentimentResult.overall === 'Positive' ? 'bg-green-100 dark:bg-green-900/30' :
                sentimentResult.overall === 'Negative' ? 'bg-red-100 dark:bg-red-900/30' :
                'bg-gray-100 dark:bg-gray-700/30'
              }`}>
                <sentimentResult.Icon size={48} className={`${sentimentResult.color} mr-4`} />
                <div>
                  <p className={`text-3xl font-bold ${sentimentResult.color}`}>{sentimentResult.overall}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Score: {sentimentResult.score} (Comparative: {sentimentResult.comparative})</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Positive Words:</p>
                    <p className="text-gray-600 dark:text-gray-400 break-words">{sentimentResult.positiveWords}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Negative Words:</p>
                    <p className="text-gray-600 dark:text-gray-400 break-words">{sentimentResult.negativeWords}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Sentiment analysis is subjective and context-dependent. This tool provides a general indication.
        </p>
      </div>
    </>
  );
};

export default AiSentimentAnalyzer;