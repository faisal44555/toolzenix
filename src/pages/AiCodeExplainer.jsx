import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Code2, Lightbulb, Copy, Trash2 } from 'lucide-react';

// Basic rule-based explanation logic
const explainJsCode = (code) => {
  let explanations = [];

  // Function declarations
  if (/\bfunction\s+\w+\s*\(.*?\)\s*\{/.test(code)) {
    explanations.push("Declares a function: A block of reusable code.");
  }
  // Variable declarations
  if (/\b(let|const|var)\s+\w+/.test(code)) {
    explanations.push("Declares a variable: Used to store data.");
  }
  // If statements
  if (/\bif\s*\(.*?\)\s*\{/.test(code)) {
    explanations.push("Conditional statement (if): Executes code based on a condition.");
  }
  // For loops
  if (/\bfor\s*\(.*?\)\s*\{/.test(code)) {
    explanations.push("Loop (for): Repeats a block of code multiple times.");
  }
  // Console.log
  if (/\bconsole\.log\s*\(/.test(code)) {
    explanations.push("Outputs a message to the console, often for debugging.");
  }
  // Return statement
  if (/\breturn\b/.test(code)) {
    explanations.push("Return statement: Exits a function and optionally passes back a value.");
  }
  // Comments
  if (/\/\//.test(code) || /\/\*[\s\S]*?\*\//.test(code)) {
    explanations.push("Contains comments: Notes for developers, ignored by the computer.");
  }

  if (explanations.length === 0 && code.trim().length > 0) {
    explanations.push("This appears to be a snippet of code. Specific explanation requires more context or advanced parsing.");
  } else if (explanations.length === 0) {
    explanations.push("No specific patterns recognized for a simple explanation.");
  }

  return explanations;
};


const AiCodeExplainer = () => {
  const [codeText, setCodeText] = useState('');
  const [explanation, setExplanation] = useState([]);
  const [language, setLanguage] = useState('javascript'); // For now, only JS
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setCodeText(e.target.value);
    setExplanation([]);
  };

  const explainCode = () => {
    if (!codeText.trim()) {
      toast({ title: 'Input Required', description: 'Please enter some code to explain.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setExplanation([]);

    setTimeout(() => {
      try {
        let explanations = [];
        if (language === 'javascript') {
          explanations = explainJsCode(codeText);
        } else {
          explanations = ["Explanation for this language is not yet supported by this basic tool."];
        }
        setExplanation(explanations);
        toast({ title: 'Code Explained!', description: 'Basic explanation generated.' });
      } catch (error) {
        console.error("Error explaining code:", error);
        toast({ title: 'Explanation Error', description: 'Could not explain the code.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };
  
  const copyToClipboard = (textArray) => {
    const text = textArray.join('\n');
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'Explanation copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy explanation.', variant: 'destructive' }));
  };

  const clearText = () => {
    setCodeText('');
    setExplanation([]);
    toast({ title: 'Text Cleared', description: 'Input and explanation have been cleared.'});
  };

  return (
    <>
      <Helmet>
        <title>AI Code Explainer | Toolzenix</title>
        <meta name="description" content="Get simple explanations for code snippets. Understand programming concepts more easily with AI assistance. (Basic)" />
        <link rel="canonical" href="https://toolzenix.com/ai-code-explainer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Code2 className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">AI Code Explainer (Basic)</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Get a simplified explanation of what a piece of code does.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1">
                <Label htmlFor="codeInputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Enter Code Snippet</Label>
                <Select value={language} onValueChange={setLanguage} disabled>
                    <SelectTrigger className="w-[150px] text-xs dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white">
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        {/* <SelectItem value="python" disabled>Python (Soon)</SelectItem> */}
                    </SelectContent>
                </Select>
            </div>
            <Textarea
              id="codeInputText"
              value={codeText}
              onChange={handleInputChange}
              placeholder="function greet(name) { console.log('Hello, ' + name); }"
              className="min-h-[150px] font-mono text-sm dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
              rows={7}
            />
            <div className="mt-2 flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(codeText.split('\n'))} disabled={!codeText} title="Copy code">
                    <Copy size={16} className="mr-1" /> Copy Code
                </Button>
                <Button variant="ghost" size="sm" onClick={clearText} disabled={!codeText && explanation.length === 0} title="Clear code and explanation">
                    <Trash2 size={16} className="mr-1" /> Clear
                </Button>
            </div>
          </div>

          <Button onClick={explainCode} disabled={isLoading || !codeText.trim()} className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white py-3 text-lg">
            {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Lightbulb size={22} className="mr-2" /></motion.div> : <Lightbulb size={22} className="mr-2" />}
            Explain Code
          </Button>

          {explanation.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Explanation:</h3>
              <ul className="list-disc list-inside space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md text-gray-700 dark:text-gray-300">
                {explanation.map((line, i) => (
                  <li key={i} className="text-sm">{line}</li>
                ))}
              </ul>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(explanation)} className="mt-2 dark:text-purple-300 dark:border-purple-500 dark:hover:bg-purple-500/10">
                <Copy size={16} className="mr-2" /> Copy Explanation
              </Button>
            </motion.div>
          )}
        </motion.div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Note: This tool provides very basic, pattern-based explanations for simple code. It does not understand complex logic or context.
        </p>
      </div>
    </>
  );
};

export default AiCodeExplainer;