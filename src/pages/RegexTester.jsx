import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Terminal, CheckSquare, XSquare, Info, Copy } from 'lucide-react';

const RegexTester = () => {
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matchResult, setMatchResult] = useState(null); // Can be array of matches or boolean for test
  const [highlightedText, setHighlightedText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!regexPattern || !testString) {
      setMatchResult(null);
      setHighlightedText(testString);
      return;
    }

    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = [];
      let match;
      
      // For global search, iterate through matches
      if (regex.global) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.groups ? Object.entries(match.groups) : []
          });
        }
      } else { // For non-global, find first match
        match = testString.match(regex);
        if (match) {
           matches.push({
            text: match[0],
            index: match.index,
            groups: match.groups ? Object.entries(match.groups) : []
          });
        }
      }
      
      setMatchResult(matches.length > 0 ? matches : false);

      // Highlight matches
      let lastIndex = 0;
      let newHighlightedText = '';
      matches.forEach(m => {
        newHighlightedText += testString.substring(lastIndex, m.index);
        newHighlightedText += `<mark class='bg-yellow-300 dark:bg-yellow-500/70 px-0.5 rounded'>${m.text}</mark>`;
        lastIndex = m.index + m.text.length;
      });
      newHighlightedText += testString.substring(lastIndex);
      setHighlightedText(newHighlightedText);

    } catch (e) {
      setMatchResult({ error: e.message });
      setHighlightedText(testString);
      toast({ title: 'Invalid Regex', description: e.message, variant: 'destructive' });
    }
  }, [regexPattern, regexFlags, testString]);

  const handleCopy = (textToCopy) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: 'Text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Online Regex Tester & Debugger | Toolzenix</title>
        <meta name="description" content="Test your regular expressions against a sample text. Provides match highlighting, group extraction, and supports various regex flags." />
        <link rel="canonical" href="https://toolzenix.com/regex-tester" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Regex Tester
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Test your regular expressions online. Highlights matches and shows capture groups.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div>
              <Label htmlFor="regex-pattern" className="text-sm font-medium text-gray-700 dark:text-gray-300">Regular Expression</Label>
              <div className="flex items-center mt-1">
                <span className="text-gray-500 dark:text-gray-400 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">/</span>
                <Input
                  id="regex-pattern"
                  type="text"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  placeholder="your-pattern"
                  className="font-mono rounded-none border-x-0 focus:z-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <span className="text-gray-500 dark:text-gray-400 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md">/</span>
                 <Input
                  id="regex-flags"
                  type="text"
                  value={regexFlags}
                  onChange={(e) => setRegexFlags(e.target.value)}
                  placeholder="flags (e.g. gi)"
                  className="font-mono ml-2 w-24 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="test-string" className="text-sm font-medium text-gray-700 dark:text-gray-300">Test String</Label>
              <Textarea
                id="test-string"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter your text to test against the regex..."
                className="min-h-[200px] font-mono mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
             <div className="p-4 bg-blue-50 dark:bg-gray-700/30 rounded-md text-sm">
                <p className="font-semibold text-blue-700 dark:text-blue-300 flex items-center"><Info className="w-5 h-5 mr-2"/>Quick Cheatsheet:</p>
                <ul className="list-disc list-inside mt-1 text-blue-600 dark:text-blue-400 text-xs">
                    <li><code>.</code> - Any character (except newline)</li>
                    <li><code>\d</code> - Digit, <code>\w</code> - Word char, <code>\s</code> - Whitespace</li>
                    <li><code>*</code> - 0 or more, <code>+</code> - 1 or more, <code>?</code> - 0 or 1</li>
                    <li><code>[abc]</code> - a, b, or c</li>
                    <li><code>(group)</code> - Capturing group</li>
                    <li>Flags: <code>g</code> (global), <code>i</code> (case-insensitive), <code>m</code> (multiline)</li>
                </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Highlighted Matches</Label>
              <div 
                className="min-h-[150px] mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700/50 overflow-auto whitespace-pre-wrap break-all font-mono text-sm dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: highlightedText || '<span class="text-gray-400 dark:text-gray-500">No text or no matches...</span>' }}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Match Information</Label>
              <div className="mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700/50 min-h-[100px] overflow-auto text-sm dark:text-gray-200">
                {matchResult === null && <p className="text-gray-400 dark:text-gray-500">Enter regex and text to see results.</p>}
                {matchResult === false && <p className="text-red-500 dark:text-red-400 flex items-center"><XSquare className="w-4 h-4 mr-2"/>No match found.</p>}
                {matchResult?.error && <p className="text-red-500 dark:text-red-400">{matchResult.error}</p>}
                {Array.isArray(matchResult) && matchResult.length > 0 && (
                  <>
                    <p className="text-green-600 dark:text-green-400 flex items-center"><CheckSquare className="w-4 h-4 mr-2"/>{matchResult.length} match(es) found:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {matchResult.map((m, i) => (
                        <li key={i} className="font-mono">
                          Match {i+1}: <code className="bg-yellow-200 dark:bg-yellow-600/50 px-1 rounded text-black dark:text-white">{m.text}</code> at index {m.index}
                          {m.groups && m.groups.length > 0 && (
                            <ul className="list-inside list-[circle] ml-4 text-xs">
                              {m.groups.map(([key, value], gIdx) => (
                                <li key={gIdx}>{isNaN(parseInt(key)) ? `${key}: ` : `Group ${key}: `}<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">{value}</code></li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            {Array.isArray(matchResult) && matchResult.length > 0 && (
                <Button onClick={() => handleCopy(matchResult.map(m => m.text).join('\n'))} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" /> Copy All Matched Text
                </Button>
            )}
          </motion.div>
        </div>

        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">About Regular Expressions (Regex)</h2>
          <p>
            A regular expression is a sequence of characters that specifies a search pattern in text. Regex is used to find, replace, and validate strings. This tool allows you to test your patterns against sample text in real-time.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Enter your regular expression pattern in the "Regular Expression" field (without the leading/trailing slashes).</li>
            <li>Enter any flags (e.g., <code>g</code> for global, <code>i</code> for case-insensitive, <code>m</code> for multiline) in the "Flags" field.</li>
            <li>Type or paste the text you want to test against in the "Test String" field.</li>
            <li>Matches will be highlighted in the text area below.</li>
            <li>Detailed match information, including capture groups, will be displayed in the "Match Information" box.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default RegexTester;