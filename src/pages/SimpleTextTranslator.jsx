import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Languages, ArrowRightLeft, Copy, Trash2, AlertCircle } from 'lucide-react';

const basicDictionary = {
  en: {
    hello: 'hola',
    goodbye: 'adiós',
    please: 'por favor',
    'thank you': 'gracias',
    yes: 'sí',
    no: 'no',
    friend: 'amigo',
    water: 'agua',
    food: 'comida',
    home: 'casa',
    cat: 'gato',
    dog: 'perro',
    love: 'amor',
    happy: 'feliz',
    world: 'mundo',
    sun: 'sol',
    moon: 'luna',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good night': 'buenas noches',
    'how are you': 'cómo estás',
    'i am fine': 'estoy bien',
    'what is your name': 'cómo te llamas',
    'my name is': 'me llamo',
  },
  es: {
    hola: 'hello',
    adiós: 'goodbye',
    'por favor': 'please',
    gracias: 'thank you',
    sí: 'yes',
    no: 'no',
    amigo: 'friend',
    agua: 'water',
    comida: 'food',
    casa: 'home',
    gato: 'cat',
    perro: 'dog',
    amor: 'love',
    feliz: 'happy',
    mundo: 'world',
    sol: 'sun',
    luna: 'moon',
    'buenos días': 'good morning',
    'buenas tardes': 'good afternoon',
    'buenas noches': 'good night',
    'cómo estás': 'how are you',
    'estoy bien': 'i am fine',
    'cómo te llamas': 'what is your name',
    'me llamo': 'my name is',
  },
};

const SimpleTextTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const { toast } = useToast();

  const translateText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      toast({ title: 'Input Empty', description: 'Please enter text to translate.', variant: 'destructive' });
      return;
    }
    if (sourceLang === targetLang) {
      setOutputText(inputText);
      toast({ title: 'Same Languages', description: 'Source and target languages are the same.', variant: 'default' });
      return;
    }

    const dictionary = basicDictionary[sourceLang];
    if (!dictionary) {
      setOutputText('Translation for this source language is not supported by this simple tool.');
      return;
    }

    // Attempt to translate whole phrases first, then individual words
    let textToTranslate = inputText.toLowerCase();
    let translatedWords = [];
    const words = textToTranslate.split(/(\s+|[,.!?])/); // Split by space and punctuation

    for (let i = 0; i < words.length; i++) {
        let currentWord = words[i];
        let foundPhrase = false;

        // Check for multi-word phrases (e.g., "good morning")
        for (let phraseLength = 3; phraseLength > 1; phraseLength--) {
            if (i + (phraseLength * 2 - 1) <= words.length) { // *2-1 to account for spaces/punctuation
                let phraseWords = [];
                for(let k=0; k<phraseLength; k++) {
                    phraseWords.push(words[i + k*2]); // only take words, skip separators
                }
                let currentPhrase = phraseWords.join(' ');
                if (dictionary[currentPhrase] && basicDictionary[targetLang][dictionary[currentPhrase]]) {
                    translatedWords.push(basicDictionary[targetLang][dictionary[currentPhrase]]);
                    i += (phraseLength * 2 - 2); // Adjust index
                    foundPhrase = true;
                    break;
                } else if (dictionary[currentPhrase]) { // Direct translation if target is the dictionary language
                     translatedWords.push(dictionary[currentPhrase]);
                     i += (phraseLength * 2 - 2);
                     foundPhrase = true;
                     break;
                }
            }
        }

        if (!foundPhrase) {
            if (dictionary[currentWord] && basicDictionary[targetLang][dictionary[currentWord]]) {
                translatedWords.push(basicDictionary[targetLang][dictionary[currentWord]]);
            } else if (dictionary[currentWord]) {
                 translatedWords.push(dictionary[currentWord]);
            } else if (/\s+|[,.!?]/.test(currentWord)) { // Keep punctuation and spaces
                translatedWords.push(currentWord);
            }
             else {
                translatedWords.push(currentWord); // Keep original word if not found
            }
        }
    }
    
    setOutputText(translatedWords.join(''));
    toast({ title: 'Translation Attempted', description: 'Basic translation complete. Check results.' });
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
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

  const clearText = () => {
    setInputText('');
    setOutputText('');
    toast({ title: 'Cleared!', description: 'Input and output cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Simple Text Translator (EN-ES Demo) | Toolzenix</title>
        <meta name="description" content="A very basic text translator for common English/Spanish words and phrases. Frontend-only demo." />
        <link rel="canonical" href="https://toolzenix.com/simple-text-translator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Languages className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Simple Text Translator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Basic translation for common words/phrases (English ↔ Spanish Demo).</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Spanish</SelectItem></SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={swapLanguages} aria-label="Swap languages"><ArrowRightLeft className="w-5 h-5 text-blue-500" /></Button>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Spanish</SelectItem></SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inputTextTrans" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text to Translate</Label>
              <Textarea id="inputTextTrans" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={`Enter text in ${sourceLang === 'en' ? 'English' : 'Spanish'}...`} className="min-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(inputText, 'Input')} className="mt-2" disabled={!inputText}><Copy size={14} className="mr-1"/>Copy Input</Button>
            </div>
            <div>
              <Label htmlFor="outputTextTrans" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Translated Text</Label>
              <Textarea id="outputTextTrans" value={outputText} readOnly placeholder={`Translation in ${targetLang === 'en' ? 'English' : 'Spanish'}...`} className="min-h-[150px] bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600" />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(outputText, 'Output')} className="mt-2" disabled={!outputText}><Copy size={14} className="mr-1"/>Copy Output</Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button onClick={translateText} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 text-base">Translate</Button>
            <Button onClick={clearText} variant="outline" className="w-full sm:w-auto"><Trash2 size={16} className="mr-1"/>Clear All</Button>
          </div>
          
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md">
            <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0" />
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                This is a very basic translator for common words and phrases only. It does not use advanced AI and is not suitable for complex sentences or nuanced translations.
                </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SimpleTextTranslator;