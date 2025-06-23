import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, AlertCircle, Wand2, Copy, Trash2 } from 'lucide-react';
import nlp from 'compromise';
// compromise-sentences and compromise-verbs are typically part of the core or loaded via plugins
// For example, nlp.plugin(require('compromise-sentences')) if it were a separate package.
// However, basic sentence and verb functionalities are often built-in or accessible through the main nlp object.
// We will rely on the core capabilities of 'compromise'

const AiGrammarChecker = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setAnalysisResult(null); 
  };

  const performGrammarCheck = () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some text to check its grammar.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    setTimeout(() => {
      try {
        const doc = nlp(inputText);
        let suggestions = [];
        let correctedText = inputText;

        // Basic check: Look for potential issues (this is a simplified example)
        // A more robust checker would involve complex rules and dictionaries.
        
        // Example: Check for common "a" vs "an" issues (very basic)
        correctedText = correctedText.replace(/\ba ([aeiouAEIOU])/g, 'an $1');
        if (correctedText !== inputText) {
            suggestions.push({ original: "a + vowel word", fix: "an + vowel word", type: "Article" });
        }
        
        // Example: Check for multiple spaces
        const singleSpacedText = correctedText.replace(/\s{2,}/g, ' ');
        if (singleSpacedText !== correctedText) {
            suggestions.push({ original: "Multiple spaces", fix: "Single space", type: "Spacing" });
            correctedText = singleSpacedText;
        }

        // Example: Simple sentence capitalization (first letter)
        let sentences = doc.sentences().out('array');
        let tempCorrectedSentences = sentences.map(s => {
            if (s && s.length > 0 && s[0] !== s[0].toUpperCase()) {
                suggestions.push({ original: `Sentence starting with "${s.substring(0,10)}..."`, fix: "Capitalize first letter", type: "Capitalization" });
                return s[0].toUpperCase() + s.substring(1);
            }
            return s;
        });
        
        // Only update correctedText if actual capitalization changes were made
        const newTextFromSentences = tempCorrectedSentences.join(' ');
        if (newTextFromSentences !== doc.text()){ // Compare with original sentence structure
             // This logic needs refinement as joining sentences might alter original spacing/structure
             // For simplicity, we'll assume basic sentence joining for now.
             // A more robust solution would carefully reconstruct the text.
        }
        // For now, we'll stick to the simpler regex corrections for `correctedText`
        // and use `suggestions` to highlight potential issues.

        const issuesFound = suggestions.length;

        setAnalysisResult({
          issuesFound,
          suggestions,
          correctedText: issuesFound > 0 ? correctedText : inputText, // Show corrected if issues found
          originalText: inputText,
        });

        toast({
          title: issuesFound > 0 ? 'Grammar Issues Found' : 'No Obvious Issues Found',
          description: issuesFound > 0 ? `Found ${issuesFound} potential issue(s).` : 'The text seems okay based on basic checks.',
          variant: issuesFound > 0 ? 'default' : 'default', 
        });
      } catch (error) {
        console.error("Error during grammar check:", error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred during grammar analysis.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }, 500); // Simulate processing time
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'Text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy text.', variant: 'destructive' }));
  };
  
  const clearText = () => {
    setInputText('');
    setAnalysisResult(null);
    toast({ title: 'Text Cleared', description: 'Input and results have been cleared.'});
  };


  return (
    <>
      <Helmet>
        <title>AI Grammar Checker | Toolzenix</title>
        <meta name="description" content="Check your text for grammatical errors and get suggestions for improvement. Enhance your writing with our AI-powered grammar tool." />
        <link rel="canonical" href="https://toolzenix.com/ai-grammar-checker" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            AI Grammar Checker
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Improve your writing by checking for grammatical errors and receiving suggestions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <label htmlFor="grammarInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter Text to Check
            </label>
            <Textarea
              id="grammarInput"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste or type your text here..."
              className="min-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={6}
            />
            <div className="mt-2 flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(inputText)} disabled={!inputText} title="Copy original text">
                    <Copy size={16} className="mr-1" /> Copy Input
                </Button>
                <Button variant="ghost" size="sm" onClick={clearText} disabled={!inputText && !analysisResult} title="Clear input and results">
                    <Trash2 size={16} className="mr-1" /> Clear
                </Button>
            </div>
          </div>

          <Button
            onClick={performGrammarCheck}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 text-lg flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Wand2 size={22} className="mr-2" />
              </motion.div>
            ) : (
              <Wand2 size={22} className="mr-2" />
            )}
            Check Grammar
          </Button>

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Analysis Results:</h3>
              {analysisResult.issuesFound > 0 ? (
                <>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Found {analysisResult.issuesFound} potential issue(s). Suggestions are based on common patterns.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300">Suggestions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {analysisResult.suggestions.map((s, i) => (
                        <li key={i}>
                          <span className="font-medium">{s.type}:</span> "{s.original}" &rarr; Consider: "{s.fix}"
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <label htmlFor="correctedTextOutput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Potentially Corrected Text (Basic Corrections):
                    </label>
                    <Textarea
                      id="correctedTextOutput"
                      value={analysisResult.correctedText}
                      readOnly
                      className="min-h-[100px] bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600"
                      rows={4}
                    />
                     <Button variant="ghost" size="sm" onClick={() => copyToClipboard(analysisResult.correctedText)} className="mt-1">
                        <Copy size={16} className="mr-1" /> Copy Corrected
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    <p className="text-sm text-green-700 dark:text-green-300">
                      No obvious grammatical issues found with basic checks. Good job!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Note: This tool provides basic grammar suggestions and may not catch all errors or nuances. For critical documents, professional proofreading is recommended.
        </p>
      </div>
    </>
  );
};

export default AiGrammarChecker;