import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, CheckCircle, AlertCircle, Lightbulb, MessageSquare } from 'lucide-react';

const commonSpamTriggerWords = [
  'free', 'win', 'winner', 'cash', 'money', 'urgent', 'limited time', 'offer', 'guarantee', 'now', 'act now',
  'click here', 'subscribe', 'buy', 'order', 'earn', 'income', 'credit', 'loan', 'debt', 'investment',
  'miracle', 'amazing', 'risk-free', 'no cost', '$$$', '!!!', 'congratulations', 'selected', 'prize'
];

const EmailSubjectLineTester = () => {
  const [subjectLine, setSubjectLine] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast();

  const testSubjectLine = () => {
    if (!subjectLine.trim()) {
      toast({ title: 'Input Empty', description: 'Please enter an email subject line.', variant: 'destructive' });
      setAnalysis(null);
      return;
    }

    const length = subjectLine.length;
    const words = subjectLine.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    let suggestions = [];
    let score = 100; // Start with a perfect score

    // Length check
    if (length < 20) {
      suggestions.push({ type: 'info', text: 'Consider making it slightly longer for more context (ideal: 40-60 characters).' });
      score -= 5;
    } else if (length > 70) {
      suggestions.push({ type: 'warning', text: 'Subject is quite long. It might get truncated in some email clients (ideal: 40-60 characters).' });
      score -= 10;
    } else if (length >= 40 && length <= 60) {
        suggestions.push({ type: 'success', text: 'Good length! Concise and informative.' });
    }


    // Word count check
    if (wordCount < 3) {
      suggestions.push({ type: 'info', text: 'Very few words. Ensure it conveys enough meaning.' });
      score -= 5;
    } else if (wordCount > 10) {
      suggestions.push({ type: 'warning', text: 'Many words. Try to be more concise.' });
      score -= 5;
    }

    // Spam trigger words
    const foundSpamWords = [];
    words.forEach(word => {
      if (commonSpamTriggerWords.includes(word.toLowerCase().replace(/[^\w]/gi, ''))) {
        foundSpamWords.push(word);
      }
    });
    if (foundSpamWords.length > 0) {
      suggestions.push({ type: 'danger', text: `Potential spam trigger words found: ${foundSpamWords.join(', ')}. These can hurt deliverability.` });
      score -= foundSpamWords.length * 10;
    }

    // All caps
    const uppercaseWords = words.filter(word => word.length > 2 && word === word.toUpperCase());
    if (uppercaseWords.length > 0) {
      suggestions.push({ type: 'danger', text: `Avoid using all caps: ${uppercaseWords.join(', ')}. It can look like shouting.` });
      score -= uppercaseWords.length * 5;
    }
    
    // Excessive punctuation
    if (subjectLine.match(/[!?.]{2,}/g)) {
        suggestions.push({ type: 'warning', text: 'Avoid excessive punctuation (e.g., !!, ???). It can look unprofessional.' });
        score -= 10;
    }
    
    // Numbers
    if (/\d/.test(subjectLine)) {
        suggestions.push({ type: 'info', text: 'Using numbers can sometimes increase open rates (e.g., "5 tips..."). Use thoughtfully.' });
    }
    
    // Emojis (simple check for presence)
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    if (emojiRegex.test(subjectLine)) {
        suggestions.push({ type: 'info', text: 'Emojis can make your subject stand out, but use them sparingly and ensure they render correctly.' });
    } else {
        suggestions.push({ type: 'info', text: 'Consider adding a relevant emoji to grab attention, if appropriate for your audience.' });
    }

    // Personalization (placeholder check)
    if (/\[name\]|{name}|%name%/i.test(subjectLine)) {
        suggestions.push({ type: 'success', text: 'Personalization (like [Name]) can improve engagement. Ensure it works correctly!' });
    }


    setAnalysis({
      length,
      wordCount,
      score: Math.max(0, score), // Ensure score doesn't go below 0
      suggestions
    });
    toast({ title: 'Analysis Complete!', description: 'Subject line tested.', action: <CheckCircle className="text-green-500" /> });
  };

  const getSuggestionIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />;
      case 'info': return <Lightbulb className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />;
      case 'danger': return <AlertCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Email Subject Line Tester | Toolzenix</title>
        <meta name="description" content="Test your email subject lines for effectiveness. Get suggestions on length, spam words, capitalization, and more to improve open rates." />
        <link rel="canonical" href="https://toolzenix.com/email-subject-line-tester" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Mail className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Email Subject Line Tester
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Improve your email open rates by testing your subject lines.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="subject-line-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">Enter Email Subject Line</Label>
            <Input
              id="subject-line-input"
              value={subjectLine}
              onChange={(e) => setSubjectLine(e.target.value)}
              placeholder="e.g., Big News! Your Weekly Update is Here 🎉"
              className="mt-2 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <Button onClick={testSubjectLine} className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white text-lg py-3">
            Test Subject Line
          </Button>

          {analysis && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-2">Analysis Results</h2>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold" style={{color: analysis.score > 75 ? '#22c55e' : analysis.score > 50 ? '#f59e0b' : '#ef4444'}}>
                    {analysis.score}/100
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Overall Score</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Length:</strong> {analysis.length} characters</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Word Count:</strong> {analysis.wordCount} words</p>
                
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 pt-2">Suggestions:</h3>
                {analysis.suggestions.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className={`flex items-start text-sm p-2 rounded-md ${
                        suggestion.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        suggestion.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        suggestion.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                        suggestion.type === 'danger' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300'
                      }`}>
                        {getSuggestionIcon(suggestion.type)}
                        <span>{suggestion.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-green-600 dark:text-green-400">Looks good! No immediate issues found.</p>}
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
          <h2 className="text-2xl font-semibold">Tips for Effective Subject Lines</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Keep it concise:</strong> Aim for 40-60 characters. Mobile devices often truncate longer subjects.</li>
            <li><strong>Be clear and specific:</strong> Tell recipients what the email is about.</li>
            <li><strong>Create urgency (carefully):</strong> Phrases like "Limited time" can work but use sparingly.</li>
            <li><strong>Personalize:</strong> Using the recipient's name can increase open rates.</li>
            <li><strong>Use emojis wisely:</strong> They can help stand out but ensure they are relevant and don't overdo it.</li>
            <li><strong>Avoid spam triggers:</strong> Words like "free," "win," excessive punctuation, or ALL CAPS can land your email in spam.</li>
            <li><strong>A/B test:</strong> The best way to know what works is to test different subject lines with your audience.</li>
          </ul>
          <p>This tool provides basic suggestions. Effectiveness can vary based on your audience and email content.</p>
        </motion.div>
      </div>
    </>
  );
};

export default EmailSubjectLineTester;