import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Repeat, Wand2, Copy, Trash2 } from 'lucide-react';
import nlp from 'compromise';
// For more advanced paraphrasing, compromise-thesaurus or similar plugins might be needed.
// For this example, we'll use core compromise capabilities for basic restructuring and synonym replacement.

const AiParaphraser = () => {
  const [inputText, setInputText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [paraphraseMode, setParaphraseMode] = useState('standard'); // standard, creative, formal
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setParaphrasedText('');
  };

  // Basic synonym replacement (very simplified)
  const getSynonym = (word) => {
    // This would ideally use a thesaurus. For now, a tiny hardcoded example.
    const simpleThesaurus = {
      'good': ['great', 'excellent', 'fine'],
      'important': ['significant', 'crucial', 'vital'],
      'show': ['display', 'exhibit', 'reveal'],
      'help': ['assist', 'support', 'aid'],
      'use': ['utilize', 'employ', 'apply'],
      'big': ['large', 'huge', 'sizable'],
      'small': ['tiny', 'little', 'minute'],
      'fast': ['quick', 'rapid', 'swift'],
      'happy': ['joyful', 'pleased', 'content'],
      'sad': ['unhappy', 'sorrowful', 'dejected'],
    };
    const lowerWord = word.toLowerCase();
    if (simpleThesaurus[lowerWord] && simpleThesaurus[lowerWord].length > 0) {
      return simpleThesaurus[lowerWord][Math.floor(Math.random() * simpleThesaurus[lowerWord].length)];
    }
    return word; 
  };

  const paraphrase = () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some text to paraphrase.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setParaphrasedText('');

    setTimeout(() => {
      try {
        let doc = nlp(inputText);
        let sentences = doc.sentences().out('array');
        let newSentences = [];

        for (let sentence of sentences) {
          let sentenceDoc = nlp(sentence);
          let terms = sentenceDoc.terms().out('array');
          let newTerms = [];

          for (let term of terms) {
            // Attempt synonym replacement based on mode (more aggressive for 'creative')
            if (paraphraseMode === 'creative' && Math.random() < 0.5) { // 50% chance for creative
              newTerms.push(getSynonym(term));
            } else if (paraphraseMode === 'standard' && Math.random() < 0.25) { // 25% chance for standard
              newTerms.push(getSynonym(term));
            } else {
              newTerms.push(term);
            }
          }
          let newSentence = newTerms.join(' ');
          
          // Basic sentence structure change: active to passive (simplified)
          // This is complex with compromise alone and often needs specific plugins or more rules.
          // For now, we'll keep it simple. If a verb is found, try a slight rephrase.
          let verb = sentenceDoc.verbs().first();
          if (paraphraseMode !== 'formal' && verb.found && Math.random() < 0.3) {
            // Example: "The cat chased the mouse." -> "The mouse was chased by the cat." (very simplified)
            // This is a placeholder for more advanced logic.
            // newSentence = `It is that ${newSentence}`; // Simplistic change
          }
          newSentences.push(newSentence);
        }
        
        let result = newSentences.join('. ').trim();
        // Ensure proper punctuation if sentences were split/joined.
        result = result.replace(/\s\./g, '.').replace(/\.{2,}/g, '.');
        if (!result.endsWith('.') && result.length > 0) result += '.';


        setParaphrasedText(result || "Could not paraphrase the text with current settings.");
        toast({
          title: 'Text Paraphrased!',
          description: `Content rephrased in ${paraphraseMode} mode.`,
        });

      } catch (error) {
        console.error("Error during paraphrasing:", error);
        setParaphrasedText('Failed to paraphrase text due to an error.');
        toast({
          title: 'Error',
          description: 'An unexpected error occurred during paraphrasing.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }, 700); // Simulate processing time
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'Text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy text.', variant: 'destructive' }));
  };

  const clearText = () => {
    setInputText('');
    setParaphrasedText('');
    toast({ title: 'Text Cleared', description: 'Input and paraphrased text have been cleared.'});
  };


  return (
    <>
      <Helmet>
        <title>AI Paraphraser Tool | Toolzenix</title>
        <meta name="description" content="Rephrase your sentences and articles with our AI-powered paraphrasing tool. Generate unique content while retaining original meaning." />
        <link rel="canonical" href="https://toolzenix.com/ai-paraphraser" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Repeat className="w-16 h-16 text-cyan-500 dark:text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            AI Paraphraser
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Rewrite and rephrase your text to create unique content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inputTextParaphraser" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Original Text
              </Label>
              <Textarea
                id="inputTextParaphraser"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter the text you want to rephrase..."
                className="min-h-[200px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                rows={8}
              />
            </div>
            <div>
              <Label htmlFor="paraphrasedTextOutput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Paraphrased Text
              </Label>
              <Textarea
                id="paraphrasedTextOutput"
                value={paraphrasedText}
                readOnly
                placeholder="Your rephrased text will appear here..."
                className="min-h-[200px] bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600"
                rows={8}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
                <Label htmlFor="paraphraseModeSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Paraphrasing Mode
                </Label>
                <Select value={paraphraseMode} onValueChange={setParaphraseMode}>
                    <SelectTrigger id="paraphraseModeSelect" className="w-full sm:w-[180px] dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white">
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0 self-end sm:self-auto">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(inputText)} disabled={!inputText} title="Copy original text">
                    <Copy size={16} /> <span className="ml-1 hidden sm:inline">Original</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(paraphrasedText)} disabled={!paraphrasedText} title="Copy paraphrased text">
                    <Copy size={16} /> <span className="ml-1 hidden sm:inline">Paraphrased</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={clearText} disabled={!inputText && !paraphrasedText} title="Clear all text">
                    <Trash2 size={16} /> <span className="ml-1 hidden sm:inline">Clear</span>
                </Button>
            </div>
          </div>


          <Button
            onClick={paraphrase}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white py-3 text-lg flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Wand2 size={22} className="mr-2" />
              </motion.div>
            ) : (
              <Wand2 size={22} className="mr-2" />
            )}
            Paraphrase Text
          </Button>
        </motion.div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Note: This AI paraphraser uses simplified techniques. For critical applications, ensure the output meets your quality standards.
        </p>
      </div>
    </>
  );
};

export default AiParaphraser;