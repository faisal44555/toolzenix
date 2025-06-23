import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Trash2, Smile, ArrowRightLeft, CheckCircle2 } from 'lucide-react';

const emojiMap = {
  // Greetings & Basic
  'hello': '👋', 'hi': '👋', 'hey': '👋', 'goodbye': '👋', 'bye': '👋',
  'yes': '✅', 'no': '❌', 'ok': '👌', 'thanks': '🙏', 'thank you': '🙏', 'please': '🥺',
  'love': '❤️', 'like': '👍', 'heart': '❤️', 'happy': '😊', 'sad': '😢', 'laugh': '😂', 'lol': '😂',
  'cry': '😭', 'angry': '😠', 'surprised': '😮', 'wow': '😮', 'cool': '😎',
  // People & Actions
  'me': '🧑', 'you': '👉', 'friend': '🧑‍🤝‍🧑', 'family': '👨‍👩‍👧‍👦', 'baby': '👶',
  'eat': '😋', 'drink': '🥤', 'sleep': '😴', 'work': '💼', 'study': '📚', 'think': '🤔',
  'run': '🏃', 'walk': '🚶', 'dance': '💃', 'sing': '🎤', 'play': '🎮',
  // Objects & Places
  'home': '🏠', 'house': '🏠', 'school': '🏫', 'workplace': '🏢', 'car': '🚗', 'bus': '🚌',
  'food': '🍕', 'pizza': '🍕', 'burger': '🍔', 'coffee': '☕', 'tea': '🍵',
  'money': '💰', 'cash': '💵', 'gift': '🎁', 'book': '📖', 'phone': '📱', 'computer': '💻',
  'music': '🎵', 'movie': '🎬', 'game': '🎲', 'sport': '⚽',
  // Time & Weather
  'today': '📅', 'tomorrow': '➡️📅', 'yesterday': '📅⬅️', 'time': '⏰', 'clock': '⏰',
  'sun': '☀️', 'moon': '🌙', 'rain': '🌧️', 'snow': '❄️', 'cloud': '☁️', 'fire': '🔥',
  // Animals
  'dog': '🐶', 'cat': '🐱', 'bird': '🐦', 'fish': '🐠', 'monkey': '🐵',
  // Common Phrases (simple mapping)
  'good morning': '☀️☕', 'good night': '😴🌙', 'how are you': '🤔❓', "i don't know": '🤷',
  'see you later': '👋➡️', 'what is your name': '📛❓', 'my name is': '📛➡️',
  // Add more mappings as needed
};

const EmojiTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();

  const translateToEmoji = () => {
    if (!inputText.trim()) {
      setOutputText('');
      toast({ title: 'Input Empty', description: 'Please enter text to translate.', variant: 'destructive' });
      return;
    }

    const words = inputText.toLowerCase().split(/\s+/);
    let translatedText = '';
    let currentPhrase = '';

    for (let i = 0; i < words.length; i++) {
      let foundMatch = false;
      // Check for multi-word phrases first (e.g., "good morning")
      for (let phraseLength = 3; phraseLength >= 1; phraseLength--) { // Check phrases up to 3 words
        if (i + phraseLength <= words.length) {
          currentPhrase = words.slice(i, i + phraseLength).join(' ');
          if (emojiMap[currentPhrase]) {
            translatedText += emojiMap[currentPhrase] + ' ';
            i += phraseLength - 1; // Skip words already part of the phrase
            foundMatch = true;
            break;
          }
        }
      }
      if (!foundMatch) {
         // If no phrase match, check single word
        if (emojiMap[words[i]]) {
            translatedText += emojiMap[words[i]] + ' ';
        } else {
            // If word not in map, keep original word but maybe add a generic emoji or nothing
            // For simplicity, let's just append the word if no emoji found.
            // Or, we can try to match parts of words or be more creative.
            // For now, if no direct match, we'll just append the original word.
            // This part can be enhanced.
            let originalWord = inputText.split(/\s+/)[i]; // Get original case word
            translatedText += originalWord + ' ';
        }
      }
    }
    
    setOutputText(translatedText.trim());
    toast({ title: 'Translated to Emoji!', action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = () => {
    if (!outputText) {
      toast({ title: 'Nothing to Copy', description: 'No translated text available.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(outputText)
      .then(() => toast({ title: 'Copied!', description: 'Emoji text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    toast({ title: 'Cleared!', description: 'Input and output cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>Emoji Translator | Toolzenix</title>
        <meta name="description" content="Translate your text into a fun string of emojis. Express yourself with a playful emoji version of your words." />
        <link rel="canonical" href="https://toolzenix.com/emoji-translator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Smile className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Emoji Translator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert your text into a fun string of emojis!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="grid md:grid-cols-1 gap-6 items-start">
            <div>
              <Label htmlFor="input-text" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Enter Text</Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="mt-2 min-h-[120px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            <div className="flex justify-center my-4">
                <Button onClick={translateToEmoji} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-base">
                    <ArrowRightLeft className="w-5 h-5 mr-2" /> Translate to Emoji
                </Button>
            </div>

            <div>
              <Label htmlFor="output-text" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Emoji Output</Label>
              <Textarea
                id="output-text"
                value={outputText}
                readOnly
                placeholder="😀👍❤️..."
                className="mt-2 min-h-[120px] text-xl bg-gray-100 dark:bg-gray-700/50 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Button onClick={handleCopyToClipboard} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600" disabled={!outputText}>
              <Copy className="w-4 h-4 mr-2" /> Copy Emojis
            </Button>
            <Button onClick={handleClear} variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
              <Trash2 className="w-4 h-4 mr-2" /> Clear All
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Speak in Emojis!</h2>
          <p>
            This fun Emoji Translator converts common English words and simple phrases into their corresponding emojis. It's a playful way to add some visual flair to your messages.
          </p>
          <p>
            <strong>Note:</strong> The translation is based on a predefined map of words to emojis and is intended for fun. It may not capture complex nuances or provide literal translations for all words.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Type or paste your text into the "Enter Text" area.</li>
            <li>Click the "Translate to Emoji" button.</li>
            <li>Your text, with recognized words replaced by emojis, will appear in the "Emoji Output" area.</li>
            <li>Copy the emoji string or clear the fields to start over.</li>
          </ol>
        </motion.div>
      </div>
    </>
  );
};

export default EmojiTranslator;