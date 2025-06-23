import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Edit, CheckCircle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

// Simple lists for analysis, can be expanded
const powerWords = new Set(['amazing', 'secret', 'ultimate', 'proven', 'guaranteed', 'easy', 'free', 'new', 'discover', 'unlock', 'instantly', 'powerful', 'effective', 'best', 'top', 'essential', 'critical', 'must-have']);
const emotionalWords = new Set(['happy', 'sad', 'fear', 'joy', 'love', 'hate', 'surprise', 'trust', 'anger', 'excitement', 'hope', 'inspiration', 'success']);
// Common words that might make headlines less impactful or too generic
const commonFillerWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'it', 'this', 'that', 'some', 'very', 'just', 'so', 'and', 'or', 'but', 'get', 'make', 'how']);


const HeadlineAnalyzer = () => {
  const [headline, setHeadline] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast();

  const analyzeHeadline = () => {
    if (!headline.trim()) {
      toast({ title: "No Headline", description: "Please enter a headline to analyze.", variant: "destructive" });
      setAnalysis(null);
      return;
    }

    const words = headline.toLowerCase().match(/\b(\w+)\b/g) || [];
    const wordCount = words.length;
    const charCount = headline.length;

    let score = 50; // Base score
    let suggestions = [];

    // Word Count Analysis
    if (wordCount < 5) {
      score -= 10;
      suggestions.push({ type: 'warning', text: "Too short. Aim for 5-12 words for better engagement." });
    } else if (wordCount > 12) {
      score -= (wordCount - 12) * 2; // Penalize longer headlines more
      suggestions.push({ type: 'warning', text: "A bit long. Shorter headlines (5-12 words) often perform better." });
    } else {
      score += 15;
      suggestions.push({ type: 'success', text: "Good length! (5-12 words is often effective)." });
    }
    
    // Character Count Analysis (common for SEO title tags)
    if (charCount > 60) {
        score -= Math.min(10, (charCount - 60) / 2); // Max 10 point deduction
        suggestions.push({ type: 'info', text: `Character count (${charCount}) is over 60. It might get truncated in search results.` });
    } else if (charCount < 30) {
        score -= 5;
        suggestions.push({ type: 'info', text: `Character count (${charCount}) is under 30. You could add more detail.` });
    } else {
        score += 5;
    }


    // Power Word Analysis
    const foundPowerWords = words.filter(word => powerWords.has(word));
    if (foundPowerWords.length > 0) {
      score += Math.min(20, foundPowerWords.length * 5); // Max 20 points for power words
      suggestions.push({ type: 'success', text: `Includes power words: ${foundPowerWords.join(', ')}.` });
    } else {
      suggestions.push({ type: 'info', text: "Consider adding power words (e.g., 'secret', 'ultimate', 'proven') to increase impact." });
    }

    // Emotional Word Analysis
    const foundEmotionalWords = words.filter(word => emotionalWords.has(word));
    if (foundEmotionalWords.length > 0) {
      score += Math.min(15, foundEmotionalWords.length * 4);
      suggestions.push({ type: 'success', text: `Includes emotional words: ${foundEmotionalWords.join(', ')}.` });
    } else {
      suggestions.push({ type: 'info', text: "Adding emotional words (e.g., 'happy', 'fear', 'excitement') can boost connection." });
    }
    
    // Numbers in headline
    if (/\d/.test(headline)) {
        score += 10;
        suggestions.push({ type: 'success', text: "Includes a number, which can attract attention (e.g., 'Top 5...')." });
    }

    // Check for too many common/filler words
    const commonCount = words.filter(word => commonFillerWords.has(word)).length;
    if (commonCount / wordCount > 0.4 && wordCount > 3) { // If more than 40% are common words
        score -= 5;
        suggestions.push({ type: 'warning', text: "Contains a high ratio of common/filler words. Try to be more specific and impactful." });
    }


    score = Math.max(0, Math.min(100, Math.round(score))); // Ensure score is between 0 and 100

    setAnalysis({
      score,
      wordCount,
      charCount,
      suggestions,
    });
    toast({ title: "Analysis Complete!", description: `Headline score: ${score}/100`, action: <CheckCircle2 className="text-green-500" /> });
  };

  const getScoreColor = (s) => {
    if (s >= 70) return 'bg-green-500';
    if (s >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getSuggestionIcon = (type) => {
    if (type === 'success') return <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />;
    if (type === 'warning') return <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />;
    if (type === 'info') return <Info className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />;
    return null;
  };


  return (
    <>
      <Helmet>
        <title>Headline Analyzer | Toolzenix Marketing Tools</title>
        <meta name="description" content="Analyze your headlines for clickability, readability, and SEO effectiveness. Get a score and suggestions to improve your titles." />
        <link rel="canonical" href="https://toolzenix.com/headline-analyzer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Edit className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Headline Analyzer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Craft more compelling headlines. Get a score and actionable feedback.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="headline-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Enter Your Headline
            </Label>
            <Input
              id="headline-input"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g., The Ultimate Guide to Amazing SEO"
              className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <Button onClick={analyzeHeadline} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-3">
            Analyze Headline
          </Button>

          {analysis && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Analysis Results:</h2>
              <div className="text-center mb-6">
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Score</Label>
                <div className="text-5xl font-bold my-2" style={{color: getScoreColor(analysis.score).replace('bg-','text-')}}>{analysis.score}/100</div>
                <Progress value={analysis.score} className={`w-full h-3 ${getScoreColor(analysis.score)}`} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Word Count</Label>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white">{analysis.wordCount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Character Count</Label>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white">{analysis.charCount}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Suggestions:</h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-md text-sm">
                    {getSuggestionIcon(suggestion.type)}
                    <span className="text-gray-700 dark:text-gray-300">{suggestion.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How to Interpret Your Score</h2>
          <p>
            This Headline Analyzer provides a score based on several factors known to influence click-through rates and readability:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Length:</strong> Optimal word and character counts.</li>
            <li><strong>Word Choice:</strong> Use of power words and emotional triggers.</li>
            <li><strong>Clarity:</strong> Avoidance of excessive common/filler words.</li>
            <li><strong>Structure:</strong> Presence of numbers or listicle formats (if applicable).</li>
          </ul>
          <p>
            A higher score generally indicates a stronger headline. Use the suggestions to refine your title for better impact. Remember, this is a guide; context and audience always matter.
          </p>
          <p className="text-xs">This tool provides a basic analysis. For deep insights, consider professional copywriting advice or A/B testing.</p>
        </motion.div>
      </div>
    </>
  );
};

export default HeadlineAnalyzer;