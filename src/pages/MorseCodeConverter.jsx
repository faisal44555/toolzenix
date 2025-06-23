import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { RadioTower, ArrowRightLeft, Copy, Trash2 } from 'lucide-react';

const MORSE_CODE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.',
  '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.-',
  ' ': '/' // Word separator
};

const REVERSE_MORSE_CODE_MAP = Object.fromEntries(Object.entries(MORSE_CODE_MAP).map(([key, value]) => [value, key]));

const MorseCodeConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionMode, setConversionMode] = useState('textToMorse'); // 'textToMorse' or 'morseToText'
  const { toast } = useToast();

  const convert = () => {
    if (!inputText.trim()) {
      setOutputText('');
      toast({ title: 'Input Empty', description: 'Please enter text or Morse code.', variant: 'destructive' });
      return;
    }

    if (conversionMode === 'textToMorse') {
      const result = inputText.toUpperCase().split('').map(char => MORSE_CODE_MAP[char] || '').join(' ');
      setOutputText(result.trim());
    } else { // morseToText
      const morseChars = inputText.trim().split(' ');
      const result = morseChars.map(morseChar => REVERSE_MORSE_CODE_MAP[morseChar] || (morseChar === '/' ? ' ' : '?')).join(''); // '?' for unknown
      setOutputText(result);
    }
    toast({ title: 'Conversion Complete!', description: `Converted to ${conversionMode === 'textToMorse' ? 'Morse code' : 'text'}.` });
  };
  
  const swapModes = () => {
    setConversionMode(prev => prev === 'textToMorse' ? 'morseToText' : 'textToMorse');
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyToClipboard = (text, type) => {
    if (!text) {
      toast({ title: 'Nothing to Copy', description: `No ${type} available.`, variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: `${type} copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const clearFields = () => {
    setInputText('');
    setOutputText('');
    toast({ title: 'Cleared!', description: 'Input and output fields cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Morse Code Converter | Toolzenix</title>
        <meta name="description" content="Convert text to Morse code and decode Morse code back to text. Easy-to-use online Morse code translator." />
        <link rel="canonical" href="https://toolzenix.com/morse-code-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <RadioTower className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Morse Code Converter</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Translate text to Morse code and vice-versa.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inputTextMorse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {conversionMode === 'textToMorse' ? 'Enter Text' : 'Enter Morse Code (use spaces between letters, / for space between words)'}
              </Label>
              <Textarea id="inputTextMorse" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={conversionMode === 'textToMorse' ? 'Hello World' : '.... . .-.. .-.. --- / .-- --- .-. .-.. -..'} className="min-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(inputText, 'Input')} className="mt-2" disabled={!inputText}><Copy size={14} className="mr-1"/>Copy Input</Button>
            </div>
            <div>
              <Label htmlFor="outputTextMorse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {conversionMode === 'textToMorse' ? 'Morse Code Output' : 'Text Output'}
              </Label>
              <Textarea id="outputTextMorse" value={outputText} readOnly placeholder={conversionMode === 'textToMorse' ? '.... . .-.. .-.. --- / .-- --- .-. .-.. -..' : 'Hello World'} className="min-h-[150px] bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600 font-mono" />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(outputText, 'Output')} className="mt-2" disabled={!outputText}><Copy size={14} className="mr-1"/>Copy Output</Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button onClick={convert} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white py-3 text-base">Convert</Button>
            <Button onClick={swapModes} variant="outline" className="w-full sm:w-auto"><ArrowRightLeft size={16} className="mr-1"/>Swap</Button>
            <Button onClick={clearFields} variant="outline" className="w-full sm:w-auto"><Trash2 size={16} className="mr-1"/>Clear</Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MorseCodeConverter;