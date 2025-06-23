import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, Copy, Trash2 } from 'lucide-react';

// Grade 1 Braille (English) - Simplified mapping
const brailleMap = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵',
  '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑', '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓',
  '9': '⠼⠊', '0': '⠼⠚',
  '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', "'": '⠄', '-': '⠤',
  ' ': '⠀' // Braille space
};
// Capitalization indicator: ⠠ (not fully implemented for simplicity)
// Number indicator: ⠼ (partially implemented)

const BrailleTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [brailleOutput, setBrailleOutput] = useState('');
  const { toast } = useToast();

  const translateToBraille = () => {
    if (!inputText.trim()) {
      setBrailleOutput('');
      toast({ title: 'Input Empty', description: 'Please enter text to translate.', variant: 'destructive' });
      return;
    }

    let result = '';
    for (const char of inputText.toLowerCase()) { // Simple: convert to lowercase first
      result += brailleMap[char] || ''; // If char not in map, add nothing (or could add a placeholder)
    }
    setBrailleOutput(result);
    toast({ title: 'Translated to Braille!', description: 'Visual Braille representation generated.' });
  };

  const copyToClipboard = (text, type) => {
    if (!text) {
      toast({ title: 'Nothing to Copy', description: `No ${type} text available.`, variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: `${type} text copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const clearFields = () => {
    setInputText('');
    setBrailleOutput('');
    toast({ title: 'Cleared!', description: 'Input and output fields cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Braille Translator (Visual) | Toolzenix</title>
        <meta name="description" content="Convert text into a visual representation of Braille characters. Useful for learning or displaying Braille visually." />
        <link rel="canonical" href="https://toolzenix.com/braille-translator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Eye className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Braille Translator (Visual)</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Convert text to a visual representation of Braille dots.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div>
            <Label htmlFor="inputTextBraille" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter Text</Label>
            <Textarea id="inputTextBraille" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type or paste text here..." className="min-h-[120px] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <Button onClick={translateToBraille} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-base">Translate to Braille</Button>
          <div>
            <Label htmlFor="outputTextBraille" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visual Braille Output</Label>
            <Textarea id="outputTextBraille" value={brailleOutput} readOnly placeholder=" 브라유 텍스트가 여기에 나타납니다..." className="min-h-[120px] bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600 text-2xl tracking-wider" />
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => copyToClipboard(brailleOutput, 'Braille text')} disabled={!brailleOutput}><Copy size={16} className="mr-1"/>Copy Braille</Button>
            <Button variant="ghost" onClick={clearFields} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"><Trash2 size={16} className="mr-1"/>Clear</Button>
          </div>
           <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Note: This tool provides a visual representation of Grade 1 Braille (English, simplified). It is not a substitute for certified Braille materials or tactile Braille.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default BrailleTranslator;