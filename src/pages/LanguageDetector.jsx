import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Globe, Search, Copy, Trash2 } from 'lucide-react';
import { franc, francAll } from 'franc'; // francAll for more detailed results

const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

const LanguageDetector = () => {
  const [inputText, setInputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [allDetections, setAllDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const detectLanguage = () => {
    if (!inputText.trim()) {
      toast({ title: 'Input Required', description: 'Please enter some text to detect its language.', variant: 'destructive' });
      setDetectedLanguage(null);
      setAllDetections([]);
      return;
    }
    setIsLoading(true);
    setDetectedLanguage(null);
    setAllDetections([]);

    setTimeout(() => {
      try {
        const mainLangCode = franc(inputText, { minLength: 3 });
        const allLangCodes = francAll(inputText, { minLength: 3,  whitelist: ['eng', 'spa', 'fra', 'deu', 'ita', 'por', 'rus', 'jpn', 'kor', 'cmn', 'hin', 'ara', 'tur', 'nld'] }); // Example whitelist

        if (mainLangCode && mainLangCode !== 'und') {
          setDetectedLanguage({
            code: mainLangCode,
            name: languageNames.of(mainLangCode) || mainLangCode.toUpperCase(),
          });
        } else {
          setDetectedLanguage({ code: 'und', name: 'Could not determine language' });
        }
        
        setAllDetections(
          allLangCodes
            .filter(([code, score]) => code !== 'und' && score > 0) // Filter out undetermined and low scores
            .slice(0, 5) // Show top 5
            .map(([code, score]) => ({
              code,
              name: languageNames.of(code) || code.toUpperCase(),
              score: (score * 100).toFixed(1), // Convert to percentage-like score
            }))
        );

        toast({ title: 'Language Detected!', description: mainLangCode && mainLangCode !== 'und' ? `Main language appears to be ${languageNames.of(mainLangCode) || mainLangCode.toUpperCase()}.` : 'Could not reliably determine the language.' });
      } catch (error) {
        console.error("Error detecting language:", error);
        toast({ title: 'Detection Error', description: 'An error occurred during language detection.', variant: 'destructive' });
        setDetectedLanguage({ code: 'err', name: 'Error in detection' });
      } finally {
        setIsLoading(false);
      }
    }, 300); // Simulate processing
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'Text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const clearText = () => {
    setInputText('');
    setDetectedLanguage(null);
    setAllDetections([]);
    toast({ title: 'Cleared!', description: 'Input and results cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Language Detector | Toolzenix</title>
        <meta name="description" content="Identify the language of any text snippet. Fast and accurate language detection powered by franc." />
        <link rel="canonical" href="https://toolzenix.com/language-detector" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Globe className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Language Detector</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Enter text to automatically identify its language.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div>
            <label htmlFor="langInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter Text</label>
            <Textarea id="langInput" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type or paste text here..." className="min-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            <div className="mt-2 flex justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(inputText)} disabled={!inputText}><Copy size={14} className="mr-1"/>Copy Input</Button>
              <Button variant="ghost" size="sm" onClick={clearText} disabled={!inputText && !detectedLanguage}><Trash2 size={14} className="mr-1"/>Clear</Button>
            </div>
          </div>
          <Button onClick={detectLanguage} disabled={isLoading || !inputText.trim()} className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 text-lg">
            {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Search size={22} className="mr-2" /></motion.div> : <Search size={22} className="mr-2" />}
            Detect Language
          </Button>
          {detectedLanguage && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Detection Result:</h3>
              <div className={`p-4 rounded-md ${detectedLanguage.code === 'und' || detectedLanguage.code === 'err' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}>
                <p className="text-2xl font-bold">{detectedLanguage.name}</p>
                {detectedLanguage.code !== 'und' && detectedLanguage.code !== 'err' && <p className="text-sm">Language Code: {detectedLanguage.code}</p>}
              </div>
              {allDetections.length > 1 && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-400 mb-1">Other possibilities (Score %):</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-0.5">
                    {allDetections.map(lang => (
                      <li key={lang.code}>{lang.name}: {lang.score}%</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default LanguageDetector;