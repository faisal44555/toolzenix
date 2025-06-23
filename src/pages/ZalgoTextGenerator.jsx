import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Wand2, Copy, Trash2 } from 'lucide-react';

const ZalgoTextGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [intensity, setIntensity] = useState(5); // 1 to 10
  const { toast } = useToast();

  const zalgoChars = {
    up: Array.from({length: 20}, (_, i) => String.fromCharCode(0x0300 + i)), // Combining Diacritical Marks
    down: Array.from({length: 20}, (_, i) => String.fromCharCode(0x0316 + i)),
    mid: Array.from({length: 10}, (_, i) => String.fromCharCode(0x0334 + i)),
  };

  const generateZalgo = () => {
    if (!inputText.trim()) {
      setOutputText('');
      toast({ title: 'Input Empty', description: 'Please enter text to Zalgofy.', variant: 'destructive' });
      return;
    }

    let zalgoText = '';
    for (const char of inputText) {
      zalgoText += char;
      // Up
      for (let i = 0; i < intensity * 0.5 + Math.random() * intensity; i++) {
        zalgoText += zalgoChars.up[Math.floor(Math.random() * zalgoChars.up.length)];
      }
      // Mid
      for (let i = 0; i < intensity * 0.2 + Math.random() * intensity * 0.5; i++) {
        zalgoText += zalgoChars.mid[Math.floor(Math.random() * zalgoChars.mid.length)];
      }
      // Down
      for (let i = 0; i < intensity * 0.5 + Math.random() * intensity; i++) {
        zalgoText += zalgoChars.down[Math.floor(Math.random() * zalgoChars.down.length)];
      }
    }
    setOutputText(zalgoText);
    toast({ title: 'Zalgofied!', description: 'Your text has been transformed.' });
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
    setOutputText('');
    toast({ title: 'Cleared!', description: 'Input and output fields cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Zalgo Text Generator | Toolzenix</title>
        <meta name="description" content="Create creepy, glitchy, or 'cursed' Zalgo text with this online generator. Adjust intensity for different effects." />
        <link rel="canonical" href="https://toolzenix.com/zalgo-text-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Wand2 className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Zalgo Text Generator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">C̴r̸e̵a̶t̴e̶ ̵c̕r̴e̴e̶p̶y̴ ̶Z̶a̶l̴g̶o̸ ̶t̴e̶x̴t̵.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div>
            <Label htmlFor="inputTextZalgo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter Text</Label>
            <Textarea id="inputTextZalgo" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type or paste text here..." className="min-h-[120px] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="intensitySlider" className="text-sm font-medium text-gray-700 dark:text-gray-300">Intensity: {intensity}</Label>
            <Slider id="intensitySlider" min={1} max={10} step={1} value={[intensity]} onValueChange={(value) => setIntensity(value[0])} className="w-full" />
          </div>
          <Button onClick={generateZalgo} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-base">Zalgofy!</Button>
          <div>
            <Label htmlFor="outputTextZalgo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zalgo Text</Label>
            <Textarea id="outputTextZalgo" value={outputText} readOnly placeholder="Z̸a̶l̴g̶o̵ ̶t̴e̶x̴t̵ ̶w̴i̶l̶l̴ ̶a̶p̴p̴e̶a̴r̴ ̶h̴e̴r̴e̴" className="min-h-[120px] bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600 overflow-x-auto" />
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => copyToClipboard(outputText, 'Zalgo text')} disabled={!outputText}><Copy size={16} className="mr-1"/>Copy Zalgo Text</Button>
            <Button variant="ghost" onClick={clearFields} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"><Trash2 size={16} className="mr-1"/>Clear</Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ZalgoTextGenerator;